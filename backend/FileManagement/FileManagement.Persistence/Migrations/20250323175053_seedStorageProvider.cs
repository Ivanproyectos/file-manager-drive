using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FileManagement.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class seedStorageProvider : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Peoples",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 23, 12, 50, 53, 690, DateTimeKind.Local).AddTicks(3191));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 23, 12, 50, 53, 690, DateTimeKind.Local).AddTicks(5911));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 23, 12, 50, 53, 690, DateTimeKind.Local).AddTicks(5920));

            migrationBuilder.InsertData(
                table: "SourceProviders",
                columns: new[] { "Id", "CreatedAt", "CreatedBy", "DeletedAt", "Description", "ProviderName", "UpdatedAt", "UpdatedBy" },
                values: new object[] { 1, new DateTime(2025, 3, 23, 17, 50, 53, 691, DateTimeKind.Utc).AddTicks(2953), 1, null, "Google Drive Provider", "Google Drive", null, null });

            migrationBuilder.UpdateData(
                table: "UserRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 23, 12, 50, 53, 693, DateTimeKind.Local).AddTicks(3630));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 3, 23, 12, 50, 53, 692, DateTimeKind.Local).AddTicks(5828), new DateTime(2025, 3, 23, 12, 50, 53, 692, DateTimeKind.Local).AddTicks(5831) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "SourceProviders",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.UpdateData(
                table: "Peoples",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 18, 18, 49, 4, 997, DateTimeKind.Local).AddTicks(9904));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 18, 18, 49, 4, 998, DateTimeKind.Local).AddTicks(2697));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 18, 18, 49, 4, 998, DateTimeKind.Local).AddTicks(2703));

            migrationBuilder.UpdateData(
                table: "UserRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 18, 18, 49, 5, 1, DateTimeKind.Local).AddTicks(986));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 3, 18, 18, 49, 5, 0, DateTimeKind.Local).AddTicks(2957), new DateTime(2025, 3, 18, 18, 49, 5, 0, DateTimeKind.Local).AddTicks(2962) });
        }
    }
}
