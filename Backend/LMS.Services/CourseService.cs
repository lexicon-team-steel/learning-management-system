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
        var userId = currentUser.UserId ?? throw new UnauthorizedAccessException();
        // var user = await VerifyUserExistsAsync(userId);

        var courses = await uow.Courses.GetUserCoursesAsync(userId);

        if (currentUser.IsStudent && courses.Count == 0)
            throw new ConflictException("Student doesn't belong to any course");

        return mapper.Map<IEnumerable<CourseDto>>(courses);
    }

    // private Task<ApplicationUser?> VerifyUserExistsAsync(string studentId) =>
    //     uow.Students.GetUserAsync(studentId) ??
    //         throw new NotFoundException("Student was not found");
}
