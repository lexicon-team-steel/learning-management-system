using AutoMapper;
using Domain.Contracts.Repositories;
using Domain.Models.Entities;
using Domain.Models.Exceptions;
using LMS.Shared.DTOs.CourseDtos;
using LMS.Shared.DTOs.StudentDtos;
using Service.Contracts;

namespace LMS.Services;

public class CourseService(IMapper mapper, IUnitOfWork uow) : ICourseService
{

}
