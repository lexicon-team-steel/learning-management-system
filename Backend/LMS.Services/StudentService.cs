using AutoMapper;
using Domain.Contracts.Repositories;
using Domain.Models.Entities;
using Domain.Models.Exceptions;
using LMS.Shared.DTOs.CourseDtos;
using LMS.Shared.DTOs.StudentDtos;
using Service.Contracts;

namespace LMS.Services;

public class StudentService(IMapper mapper, IUnitOfWork uow) : IStudentService
{
    public Task<CourseDto> GetCourseAsync(string studentId) =>
        GetCourseInternalAsync(studentId);

    public Task<CourseDto> GetCourseWithModulesAsync(string studentId) =>
        GetCourseInternalAsync(studentId, includeModules: true);

    public async Task<IEnumerable<StudentDto>> GetClassmatesAsync(string studentId)
    {
        await VerifyUserExistsAsync(studentId);

        var students = await uow.Courses.GetCourseClassmatesAsync(studentId);

        if (students is null)
            throw new ConflictException("Student doesn't belong to any course");

        return mapper.Map<IEnumerable<StudentDto>>(students);
    }

    private async Task<CourseDto> GetCourseInternalAsync(string studentId, bool includeModules = false)
    {
        await VerifyUserExistsAsync(studentId);

        var course = includeModules
            ? await uow.Courses.GetCourseWithModulesAsync(studentId)
            : await uow.Courses.GetCourseAsync(studentId);

        if (course is null)
            throw new ConflictException("Student doesn't belong to any course");

        return mapper.Map<CourseDto>(course);
    }

    private async Task VerifyUserExistsAsync(string studentId)
    {
        if (await uow.Students.GetUserAsync(studentId) is null)
            throw new NotFoundException("Student was not found");
    }
}
