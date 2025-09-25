using Domain.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LMS.Infrastructure.Data.Configurations;

public class ActivityConfiguration : IEntityTypeConfiguration<Activity>
{
    public void Configure(EntityTypeBuilder<Activity> builder)
    {
        builder.ToTable("Activity", t => t.HasCheckConstraint("CK_Activity_StartBeforeEnd", "StartDate < EndDate"));

        builder.HasKey(a => a.Id);

        builder.Property(a => a.Name)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(a => a.Description)
            .IsRequired()
            .HasMaxLength(2000);

        builder.Property(a => a.StartDate).IsRequired();

        builder.Property(a => a.EndDate).IsRequired();

        builder.HasIndex(a => new { a.CourseModuleId, a.StartDate });

        builder.HasOne(a => a.ActivityType)
            .WithMany(t => t.Activities)
            .HasForeignKey(a => a.ActivityTypeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(a => a.CourseModule)
            .WithMany(m => m.Activities)
            .HasForeignKey(a => a.CourseModuleId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
