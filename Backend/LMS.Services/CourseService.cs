using AutoMapper;
using Domain.Contracts.Repositories;
using Domain.Models.Entities;
using Domain.Models.Exceptions;
using LMS.Shared.DTOs.CourseDtos;
using LMS.Shared.DTOs.StudentDtos;
using Service.Contracts;

namespace LMS.Services;

public class CourseService(IMapper mapper, IUnitOfWork uow, ICurrentUserService currentUser) : ICourseService
{
    public async Task<IEnumerable<CourseDto>> GetUserCoursesAsync()
    {
        var userId = currentUser.UserId ?? throw new UnauthorizedException();

        var courses = await uow.Courses.GetUserCoursesAsync(userId);

        if (currentUser.IsStudent && courses.Count == 0)
            throw new ConflictException("Student doesn't belong to any course");

        return mapper.Map<IEnumerable<CourseDto>>(courses);
    }

    public async Task<CourseDto> GetCourseWithModulesAsync(Guid courseId)
    {
        var userId = currentUser.UserId
            ?? throw new UnauthorizedException();
        if (!await uow.Courses.UserHasAccessToCourse(userId, courseId))
            throw new UnauthorizedException();

        var course = await uow.Courses.GetCourseByIdAsync(courseId, includeModules: true)
            ?? throw new NotFoundException("Course not found");

        return mapper.Map<CourseDto>(course);
    }

    public async Task<IEnumerable<StudentDto>> GetCourseParticipantsAsync(Guid courseId)
    {
        var userId = currentUser.UserId ?? throw new UnauthorizedException();
        if (!await uow.Courses.UserHasAccessToCourse(userId, courseId))
            throw new UnauthorizedException();

        var course = await uow.Courses.GetCourseByIdAsync(courseId, includeUsers: true)
            ?? throw new NotFoundException("Course not found");

        return mapper.Map<IEnumerable<StudentDto>>(course.Users);
    }
}
