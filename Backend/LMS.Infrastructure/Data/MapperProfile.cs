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
        CreateMap<UserRegistrationDto, ApplicationUser>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email));
        CreateMap<Course, CourseDto>();
        CreateMap<CourseModule, CourseModuleDto>().ForMember(dest => dest.CourseName, opt => opt.MapFrom(src => src.Course.Name)); ;
        CreateMap<ApplicationUser, UserDto>()
            .ForMember(dest => dest.Roles, opt => opt.MapFrom(src => src.UserRoles.Select(ur => ur.Role.Name)));
        CreateMap<Activity, ActivityDto>();
        CreateMap<ActivityType, ActivityTypeDto>();
        CreateMap<CreateCourseDto, Course>();
        CreateMap<ActivityTypeDto, ActivityType>();
        CreateMap<CreateActivityDto, Activity>();
        CreateMap<CreateModuleDto, CourseModule>();
        CreateMap<UpdateCourseDto, Course>();
        CreateMap<UpdateModuleDto, CourseModule>();
        CreateMap<UserUpdateDto, ApplicationUser>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email)); ;
        CreateMap<UpdateActivityDto, Activity>();
    }
}
