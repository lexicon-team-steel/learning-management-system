using AutoMapper;
using Domain.Contracts.Repositories;
using Domain.Models.Exceptions;
using LMS.Shared.DTOs.CourseDtos;
using Service.Contracts;

namespace LMS.Services;

public class StudentService(IMapper mapper, IUnitOfWork uow) : IStudentService
{
    public async Task<CourseDto> GetCourseAsync(string userId)
    {
        var user = await uow.Students.GetStudentAsync(userId)
            ?? throw new NotFoundException("Student was not found");

        var course = user.Courses.FirstOrDefault()
            ?? throw new ConflictException("Student doesn't belong to any course");

        return mapper.Map<CourseDto>(course);
    }
}