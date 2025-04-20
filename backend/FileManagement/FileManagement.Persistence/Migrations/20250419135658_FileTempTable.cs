using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FileManagement.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class FileTempTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FilesTemp",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FileName = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Extension = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    MimeType = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    SizeBytes = table.Column<long>(type: "bigint", nullable: false),
                    FolderId = table.Column<int>(type: "int", nullable: false),
                    UploadId = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedBy = table.Column<int>(type: "int", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<int>(type: "int", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FilesTemp", x => x.Id);
                });

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FilesTemp");

            migrationBuilder.UpdateData(
                table: "FileUploadConfigurations",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 4, 18, 20, 19, 46, 615, DateTimeKind.Local).AddTicks(7476), new DateTime(2025, 4, 18, 20, 19, 46, 615, DateTimeKind.Local).AddTicks(7493) });

            migrationBuilder.UpdateData(
                table: "FolderProcessStates",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 18, 20, 19, 46, 617, DateTimeKind.Local).AddTicks(809));

            migrationBuilder.UpdateData(
                table: "FolderProcessStates",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 18, 20, 19, 46, 617, DateTimeKind.Local).AddTicks(825));

            migrationBuilder.UpdateData(
                table: "FolderProcessStates",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 18, 20, 19, 46, 617, DateTimeKind.Local).AddTicks(829));

            migrationBuilder.UpdateData(
                table: "Peoples",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 18, 20, 19, 46, 622, DateTimeKind.Local).AddTicks(5413));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 18, 20, 19, 46, 622, DateTimeKind.Local).AddTicks(8330));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 18, 20, 19, 46, 622, DateTimeKind.Local).AddTicks(8373));

            migrationBuilder.UpdateData(
                table: "SourceProviders",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 19, 1, 19, 46, 623, DateTimeKind.Utc).AddTicks(8375));

            migrationBuilder.UpdateData(
                table: "UserRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 18, 20, 19, 46, 625, DateTimeKind.Local).AddTicks(8313));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 4, 18, 20, 19, 46, 624, DateTimeKind.Local).AddTicks(3525), new DateTime(2025, 4, 18, 20, 19, 46, 624, DateTimeKind.Local).AddTicks(3530) });
        }
    }
}
