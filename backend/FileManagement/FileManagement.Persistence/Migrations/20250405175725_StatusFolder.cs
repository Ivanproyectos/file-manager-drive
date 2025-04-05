using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FileManagement.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class StatusFolder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "Folders",
                type: "BIT",
                maxLength: 500,
                nullable: false,
                defaultValue: true);

            migrationBuilder.UpdateData(
                table: "Peoples",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 5, 12, 57, 25, 531, DateTimeKind.Local).AddTicks(8550));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 5, 12, 57, 25, 532, DateTimeKind.Local).AddTicks(5203));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 5, 12, 57, 25, 532, DateTimeKind.Local).AddTicks(5217));

            migrationBuilder.UpdateData(
                table: "SourceProviders",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 5, 17, 57, 25, 533, DateTimeKind.Utc).AddTicks(5413));

            migrationBuilder.UpdateData(
                table: "UserRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 5, 12, 57, 25, 536, DateTimeKind.Local).AddTicks(2685));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 4, 5, 12, 57, 25, 535, DateTimeKind.Local).AddTicks(1892), new DateTime(2025, 4, 5, 12, 57, 25, 535, DateTimeKind.Local).AddTicks(1900) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Folders");

            migrationBuilder.UpdateData(
                table: "Peoples",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 4, 19, 26, 49, 659, DateTimeKind.Local).AddTicks(3417));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 4, 19, 26, 49, 660, DateTimeKind.Local).AddTicks(563));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 4, 19, 26, 49, 660, DateTimeKind.Local).AddTicks(579));

            migrationBuilder.UpdateData(
                table: "SourceProviders",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 5, 0, 26, 49, 661, DateTimeKind.Utc).AddTicks(2606));

            migrationBuilder.UpdateData(
                table: "UserRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 4, 19, 26, 49, 664, DateTimeKind.Local).AddTicks(2681));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 4, 4, 19, 26, 49, 663, DateTimeKind.Local).AddTicks(714), new DateTime(2025, 4, 4, 19, 26, 49, 663, DateTimeKind.Local).AddTicks(728) });
        }
    }
}
