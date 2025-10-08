using AutoMapper;
using Domain.Contracts.Repositories;
using Domain.Models.Entities;
using Domain.Models.Exceptions;
using LMS.Services.Extensions;
using LMS.Shared.Common;
using LMS.Shared.DTOs.UserDtos;
using LMS.Shared.Parameters;
using Microsoft.AspNetCore.Identity;
using Service.Contracts;

namespace LMS.Services;

public class UserService(IMapper mapper, IUnitOfWork uow, UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager) : IUserService
{
    public async Task<PagedResult<UserDto>> GetAllUsersAsync(UserQueryParameters userParams)
    {
        var users = await uow.Users.GetAllUsersAsync(userParams);
        return users.Map<ApplicationUser, UserDto>(mapper);
    }

    public async Task<IdentityResult> UpdateUserAsync(string id, UserUpdateDto updateDto)
    {
        if (id != updateDto.Id)
            throw new BadRequestException("Id in URL does not match Id in body");

        var user = await userManager.FindByIdAsync(id)
            ?? throw new NotFoundException("User not found");

        if (!await roleManager.RoleExistsAsync(updateDto.Role))
            throw new BadRequestException("Role is not permitted");

        mapper.Map(updateDto, user);

        var result = await userManager.UpdateAsync(user);
        if (!result.Succeeded) return result;

        var currentRoles = await userManager.GetRolesAsync(user);
        if (currentRoles.Any() && !currentRoles.Contains(updateDto.Role))
        {
            var removeResult = await userManager.RemoveFromRolesAsync(user, currentRoles);
            if (!removeResult.Succeeded) return removeResult;

            var addResult = await userManager.AddToRoleAsync(user, updateDto.Role);
            if (!addResult.Succeeded) return addResult;
        }

        if (!string.IsNullOrWhiteSpace(updateDto.Password))
        {
            var resetToken = await userManager.GeneratePasswordResetTokenAsync(user);
            var passwordResult = await userManager.ResetPasswordAsync(user, resetToken, updateDto.Password);
            if (!passwordResult.Succeeded) return passwordResult;
        }

        return result;
    }

    public async Task<IdentityResult> DeleteUserAsync(string id)
    {
        var user = await userManager.FindByIdAsync(id);
        if (user == null)
            throw new NotFoundException("User not found");

        var result = await userManager.DeleteAsync(user);
        return result;
    }
}
