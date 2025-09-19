using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LMS.Infractructure.Migrations
{
    /// <inheritdoc />
    public partial class AddFullnameToApplicationUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "ApplicationUser",
                type: "TEXT",
                maxLength: 200,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FullName",
                table: "ApplicationUser");
        }
    }
}
