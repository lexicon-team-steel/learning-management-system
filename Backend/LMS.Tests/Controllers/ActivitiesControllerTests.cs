using Xunit;
using Moq;
using LMS.Presentation.Controllers;
using Service.Contracts;
using LMS.Shared.DTOs.ActivityDtos;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LMS.Tests.Controllers
{
    public class ActivitiesControllerTests
    {
        private readonly Mock<IServiceManager> _mockServiceManager;
        private readonly Mock<IActivityService> _mockActivityService;
        private readonly ActivitiesController _controller;

        public ActivitiesControllerTests()
        {
            _mockActivityService = new Mock<IActivityService>();
            _mockServiceManager = new Mock<IServiceManager>();
            _mockServiceManager.Setup(s => s.ActivityService).Returns(_mockActivityService.Object);

            _controller = new ActivitiesController(_mockServiceManager.Object);
        }

        [Fact]
        public async Task GetUserActivities_ReturnsOkWithActivities()
        {
            // Arrange
            var activities = new List<ActivityDto>
            {
                new ActivityDto { Id = Guid.NewGuid(), Name = "Test Activity", ActivityType = new ActivityTypeDto { Name = "SampleType" } }
            };
            _mockActivityService.Setup(s => s.GetUserActivitiesAsync()).ReturnsAsync(activities);

            // Act
            var result = await _controller.GetUserActivities();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnedActivities = Assert.IsAssignableFrom<IEnumerable<ActivityDto>>(okResult.Value);
            Assert.Single(returnedActivities);
        }

        [Fact]
        public async Task GetUserActivities_ReturnsEmptyList_WhenNoActivitiesFound()
        {
            // Arrange
            _mockActivityService.Setup(s => s.GetUserActivitiesAsync()).ReturnsAsync(new List<ActivityDto>());

            // Act
            var result = await _controller.GetUserActivities();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnedActivities = Assert.IsAssignableFrom<IEnumerable<ActivityDto>>(okResult.Value);
            Assert.Empty(returnedActivities);
        }
    }
}
