using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FileManagement.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ChangeTypeFieldSizeO : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "SizeBytes",
                table: "Files",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.UpdateData(
                table: "Peoples",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 23, 13, 56, 56, 391, DateTimeKind.Local).AddTicks(8796));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 23, 13, 56, 56, 392, DateTimeKind.Local).AddTicks(1657));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 23, 13, 56, 56, 392, DateTimeKind.Local).AddTicks(1662));

            migrationBuilder.UpdateData(
                table: "SourceProviders",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 23, 18, 56, 56, 392, DateTimeKind.Utc).AddTicks(8973));

            migrationBuilder.UpdateData(
                table: "UserRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 23, 13, 56, 56, 395, DateTimeKind.Local).AddTicks(379));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 3, 23, 13, 56, 56, 394, DateTimeKind.Local).AddTicks(2229), new DateTime(2025, 3, 23, 13, 56, 56, 394, DateTimeKind.Local).AddTicks(2233) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "SizeBytes",
                table: "Files",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

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

            migrationBuilder.UpdateData(
                table: "SourceProviders",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 23, 17, 50, 53, 691, DateTimeKind.Utc).AddTicks(2953));

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
    }
}
