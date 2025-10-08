using AutoMapper;
using Domain.Contracts.Repositories;
using Domain.Models.Entities;
using Domain.Models.Exceptions;
using LMS.Shared.DTOs.CourseDtos;
using LMS.Shared.DTOs.UserDtos;
using Microsoft.AspNetCore.Identity;
using Service.Contracts;

namespace LMS.Services;

public class CourseService(IMapper mapper, IUnitOfWork uow, UserManager<ApplicationUser> userManager, ICurrentUserService currentUser) : ICourseService
{
    public async Task<IEnumerable<CourseDto>> GetAllCoursesAsync()
    {
        var courses = await uow.Courses.GetCoursesAsync();

        return mapper.Map<IEnumerable<CourseDto>>(courses);
    }

    public async Task<IEnumerable<CourseDto>> GetUserCoursesAsync()
    {
        var userId = GetUserId();
        var courses = await uow.Courses.GetUserCoursesAsync(userId);

        return mapper.Map<IEnumerable<CourseDto>>(courses);
    }

    public async Task<CourseDto> GetUserCourseWithModulesAsync(Guid courseId)
    {
        var userId = GetUserId();
        var course = await uow.Courses.GetUserCourseWithModulesAsync(userId, courseId);
        if (course == null) throw new NotFoundException("Course not found or you don't have access");

        return mapper.Map<CourseDto>(course);
    }

    public async Task<CourseDto> GetCourseWithModulesAsync(Guid courseId)
    {
        var course = await uow.Courses.GetCourseWithModulesAsync(courseId);
        if (course == null) throw new NotFoundException("Course not found");

        return mapper.Map<CourseDto>(course);
    }

    public async Task<CourseDto> GetCourseWithParticipantsAsync(Guid courseId)
    {
        var course = await uow.Courses.GetCourseWithParticipantsAsync(courseId);
        if (course == null) throw new NotFoundException("Course not found");

        return mapper.Map<CourseDto>(course);
    }

    public async Task<IEnumerable<UserDto>> GetCourseParticipantsAsync(Guid courseId, string? role)
    {
        var userId = GetUserId();
        var participants = await uow.Courses.GetUserCourseParticipantsAsync(userId, courseId, role);

        return mapper.Map<IEnumerable<UserDto>>(participants);
    }

    public async Task<CourseDto> CreateAsync(CreateCourseDto dto)
    {
        var userId = GetUserId();

        await ValidateCourseAsync(dto.Name, dto.StartDate, dto.EndDate);

        var course = mapper.Map<Course>(dto);

        uow.Courses.Create(course);
        await uow.CompleteAsync();

        return mapper.Map<CourseDto>(course);
    }

    public async Task<CourseDto> UpdateAsync(Guid courseId, UpdateCourseDto dto)
    {
        var userId = GetUserId();

        var course = await uow.Courses.GetCourseWithModulesAsync(courseId);
        if (course == null)
            throw new NotFoundException("Course not found");

        await ValidateCourseAsync(dto.Name, dto.StartDate, dto.EndDate, courseId);

        mapper.Map(dto, course);

        uow.Courses.Update(course);
        await uow.CompleteAsync();

        return mapper.Map<CourseDto>(course);
    }

    public async Task DeleteAsync(Guid courseId)
    {
        var course = await uow.Courses.GetCourseWithModulesAsync(courseId);
        if (course == null)
            throw new NotFoundException("Course not found");

        uow.Courses.Delete(course);
        await uow.CompleteAsync();
    }

    public async Task DeleteParticipantAsync(Guid courseId, string participantId)
    {
        var course = await uow.Courses.GetCourseWithParticipantsAsync(courseId, true)
            ?? throw new NotFoundException("Course not found");

        var userInCourse = course.Users.FirstOrDefault(u => u.Id == participantId)
            ?? throw new NotFoundException("User not found");

        course.Users.Remove(userInCourse);
        await uow.CompleteAsync();
    }

    public async Task AddParticipantToCourseAsync(Guid courseId, CreateCourseParticipantDto dto)
    {
        var user = await userManager.FindByIdAsync(dto.ParticipantId)
            ?? throw new NotFoundException("User not found");

        var course = await uow.Courses.GetCourseWithParticipantsAsync(courseId, true)
            ?? throw new NotFoundException("Course not found");

        if (course.Users.Any(u => u.Id == dto.ParticipantId))
            throw new ConflictException("User already in the course");

        course.Users.Add(user);
        await uow.CompleteAsync();
    }


    private async Task ValidateCourseAsync(string name, DateTime startDate, DateTime endDate, Guid? existingCourseId = null)
    {
        if (endDate < startDate)
            throw new BadRequestException("End date cannot be earlier than start date");

        var exists = await uow.Courses.ExistsByNameAsync(name, existingCourseId);
        if (exists)
            throw new ConflictException($"A course with the name '{name}' already exists.");
    }

    private string GetUserId() =>
        currentUser.UserId ?? throw new UnauthorizedException();
}
