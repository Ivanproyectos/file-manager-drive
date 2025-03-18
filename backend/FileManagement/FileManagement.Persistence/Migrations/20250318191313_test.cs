using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FileManagement.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class test : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FilePermissions_Files_FileId1",
                table: "FilePermissions");

            migrationBuilder.DropIndex(
                name: "IX_FilePermissions_FileId1",
                table: "FilePermissions");

            migrationBuilder.DropColumn(
                name: "FileId1",
                table: "FilePermissions");

            migrationBuilder.UpdateData(
                table: "Peoples",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 18, 14, 13, 12, 959, DateTimeKind.Local).AddTicks(6197));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 18, 14, 13, 12, 960, DateTimeKind.Local).AddTicks(991));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 18, 14, 13, 12, 960, DateTimeKind.Local).AddTicks(999));

            migrationBuilder.UpdateData(
                table: "UserRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 18, 14, 13, 12, 964, DateTimeKind.Local).AddTicks(2354));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 3, 18, 14, 13, 12, 962, DateTimeKind.Local).AddTicks(8304), new DateTime(2025, 3, 18, 14, 13, 12, 962, DateTimeKind.Local).AddTicks(8320) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FileId1",
                table: "FilePermissions",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Peoples",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 18, 12, 19, 34, 370, DateTimeKind.Local).AddTicks(8724));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 18, 12, 19, 34, 371, DateTimeKind.Local).AddTicks(4149));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 18, 12, 19, 34, 371, DateTimeKind.Local).AddTicks(4159));

            migrationBuilder.UpdateData(
                table: "UserRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 18, 12, 19, 34, 374, DateTimeKind.Local).AddTicks(7902));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 3, 18, 12, 19, 34, 373, DateTimeKind.Local).AddTicks(8089), new DateTime(2025, 3, 18, 12, 19, 34, 373, DateTimeKind.Local).AddTicks(8097) });

            migrationBuilder.CreateIndex(
                name: "IX_FilePermissions_FileId1",
                table: "FilePermissions",
                column: "FileId1",
                unique: true,
                filter: "[FileId1] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_FilePermissions_Files_FileId1",
                table: "FilePermissions",
                column: "FileId1",
                principalTable: "Files",
                principalColumn: "Id");
        }
    }
}
