using AutoMapper;
using Domain.Models.Entities;
using LMS.Shared.DTOs.ActivityDtos;
using LMS.Shared.DTOs.AuthDtos;
using LMS.Shared.DTOs.CourseDtos;
using LMS.Shared.DTOs.CourseModuleDtos;
using LMS.Shared.DTOs.UserDtos;

namespace LMS.Infrastructure.Data;

public class MapperProfile : Profile
{
    public MapperProfile()
    {
        CreateMap<UserRegistrationDto, ApplicationUser>();
        CreateMap<Course, CourseDto>();
        CreateMap<CourseModule, CourseModuleDto>();
        CreateMap<ApplicationUser, UserDto>();
        CreateMap<Activity, ActivityDto>();
        CreateMap<ActivityType, ActivityTypeDto>();
    }
}
