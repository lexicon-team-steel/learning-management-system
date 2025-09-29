using AutoMapper;
using Domain.Contracts.Repositories;
using Domain.Models.Entities;
using Domain.Models.Exceptions;
using LMS.Shared.DTOs.CourseDtos;
using LMS.Shared.DTOs.UserDtos;
using Service.Contracts;

namespace LMS.Services;

public class CourseService(IMapper mapper, IUnitOfWork uow, ICurrentUserService currentUser) : ICourseService
{
    public async Task<IEnumerable<CourseDto>> GetUserCoursesAsync()
    {
        var userId = GetUserId();
        var courses = await uow.Courses.GetUserCoursesAsync(userId);

        return mapper.Map<IEnumerable<CourseDto>>(courses);
    }

    public async Task<CourseDto> GetCourseWithModulesAsync(Guid courseId)
    {
        var userId = GetUserId();
        var course = await uow.Courses.GetUserCourseWithModulesAsync(userId, courseId);
        if (course == null) throw new NotFoundException("Course not found or you don’t have access");

        return mapper.Map<CourseDto>(course);
    }

    public async Task<IEnumerable<UserDto>> GetCourseParticipantsAsync(Guid courseId, string? role)
    {
        var userId = GetUserId();
        var participants = await uow.Courses.GetUserCourseParticipantsAsync(userId, courseId, role);

        return mapper.Map<IEnumerable<UserDto>>(participants);
    }

    private string GetUserId() =>
        currentUser.UserId ?? throw new UnauthorizedException();
}
