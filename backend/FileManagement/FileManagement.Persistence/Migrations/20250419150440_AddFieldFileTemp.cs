using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FileManagement.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddFieldFileTemp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "CreatedBy",
                table: "FilesTemp",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "FilesTemp",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StorageIdentifier",
                table: "FilesTemp",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.UpdateData(
                table: "FileUploadConfigurations",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 4, 19, 10, 4, 40, 583, DateTimeKind.Local).AddTicks(4005), new DateTime(2025, 4, 19, 10, 4, 40, 583, DateTimeKind.Local).AddTicks(4019) });

            migrationBuilder.UpdateData(
                table: "FolderProcessStates",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 19, 10, 4, 40, 584, DateTimeKind.Local).AddTicks(6720));

            migrationBuilder.UpdateData(
                table: "FolderProcessStates",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 19, 10, 4, 40, 584, DateTimeKind.Local).AddTicks(6736));

            migrationBuilder.UpdateData(
                table: "FolderProcessStates",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 19, 10, 4, 40, 584, DateTimeKind.Local).AddTicks(6739));

            migrationBuilder.UpdateData(
                table: "Peoples",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 19, 10, 4, 40, 589, DateTimeKind.Local).AddTicks(8887));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 19, 10, 4, 40, 590, DateTimeKind.Local).AddTicks(1777));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 19, 10, 4, 40, 590, DateTimeKind.Local).AddTicks(1783));

            migrationBuilder.UpdateData(
                table: "SourceProviders",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 19, 15, 4, 40, 590, DateTimeKind.Utc).AddTicks(9886));

            migrationBuilder.UpdateData(
                table: "UserRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 19, 10, 4, 40, 592, DateTimeKind.Local).AddTicks(2082));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 4, 19, 10, 4, 40, 591, DateTimeKind.Local).AddTicks(3878), new DateTime(2025, 4, 19, 10, 4, 40, 591, DateTimeKind.Local).AddTicks(3882) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StorageIdentifier",
                table: "FilesTemp");

            migrationBuilder.AlterColumn<int>(
                name: "CreatedBy",
                table: "FilesTemp",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "FilesTemp",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.UpdateData(
                table: "FileUploadConfigurations",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 4, 19, 8, 56, 58, 714, DateTimeKind.Local).AddTicks(3881), new DateTime(2025, 4, 19, 8, 56, 58, 714, DateTimeKind.Local).AddTicks(3889) });

            migrationBuilder.UpdateData(
                table: "FolderProcessStates",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 19, 8, 56, 58, 715, DateTimeKind.Local).AddTicks(6917));

            migrationBuilder.UpdateData(
                table: "FolderProcessStates",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 19, 8, 56, 58, 715, DateTimeKind.Local).AddTicks(6933));

            migrationBuilder.UpdateData(
                table: "FolderProcessStates",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 19, 8, 56, 58, 715, DateTimeKind.Local).AddTicks(6936));

            migrationBuilder.UpdateData(
                table: "Peoples",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 19, 8, 56, 58, 720, DateTimeKind.Local).AddTicks(9527));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 19, 8, 56, 58, 721, DateTimeKind.Local).AddTicks(2375));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 19, 8, 56, 58, 721, DateTimeKind.Local).AddTicks(2381));

            migrationBuilder.UpdateData(
                table: "SourceProviders",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 19, 13, 56, 58, 721, DateTimeKind.Utc).AddTicks(9722));

            migrationBuilder.UpdateData(
                table: "UserRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 19, 8, 56, 58, 723, DateTimeKind.Local).AddTicks(1298));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 4, 19, 8, 56, 58, 722, DateTimeKind.Local).AddTicks(3446), new DateTime(2025, 4, 19, 8, 56, 58, 722, DateTimeKind.Local).AddTicks(3450) });
        }
    }
}
