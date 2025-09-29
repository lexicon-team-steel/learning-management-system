using Domain.Models.Entities;
using LMS.Infrastructure.Data.Configurations;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Data
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : IdentityDbContext<ApplicationUser, ApplicationRole, string, IdentityUserClaim<string>, ApplicationUserRole, IdentityUserLogin<string>,
        IdentityRoleClaim<string>, IdentityUserToken<string>>(options)
    {
        public DbSet<Course> Courses { get; set; } = default!;
        public DbSet<CourseModule> CourseModules { get; set; } = default!;
        public DbSet<Activity> Activities { get; set; } = default!;
        public DbSet<ActivityType> ActivityTypes { get; set; } = default!;


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfiguration(new ApplicationUserConfigurations());
            builder.ApplyConfiguration(new ApplicationRoleConfigurations());
            builder.ApplyConfiguration(new ApplicationUserRoleConfigurations());
            builder.ApplyConfiguration(new CourseConfiguration());
            builder.ApplyConfiguration(new CourseModuleConfiguration());
            builder.ApplyConfiguration(new ActivityConfiguration());
            builder.ApplyConfiguration(new ActivityTypeConfiguration());
        }
    }
}
