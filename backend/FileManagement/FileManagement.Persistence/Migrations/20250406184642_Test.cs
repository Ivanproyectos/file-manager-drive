using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FileManagement.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Test : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_FolderPermissions_UserId_FolderId",
                table: "FolderPermissions");

            migrationBuilder.UpdateData(
                table: "Peoples",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 6, 13, 46, 41, 995, DateTimeKind.Local).AddTicks(4489));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 6, 13, 46, 41, 995, DateTimeKind.Local).AddTicks(7158));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 6, 13, 46, 41, 995, DateTimeKind.Local).AddTicks(7163));

            migrationBuilder.UpdateData(
                table: "SourceProviders",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 6, 18, 46, 41, 996, DateTimeKind.Utc).AddTicks(4226));

            migrationBuilder.UpdateData(
                table: "UserRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 6, 13, 46, 41, 998, DateTimeKind.Local).AddTicks(4306));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 4, 6, 13, 46, 41, 997, DateTimeKind.Local).AddTicks(6453), new DateTime(2025, 4, 6, 13, 46, 41, 997, DateTimeKind.Local).AddTicks(6457) });

            migrationBuilder.CreateIndex(
                name: "IX_FolderPermissions_UserId_FolderId",
                table: "FolderPermissions",
                columns: new[] { "UserId", "FolderId" },
                unique: true,
                filter: "DeletedAt IS NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_FolderPermissions_UserId_FolderId",
                table: "FolderPermissions");

            migrationBuilder.UpdateData(
                table: "Peoples",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 5, 20, 44, 33, 705, DateTimeKind.Local).AddTicks(4070));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 5, 20, 44, 33, 705, DateTimeKind.Local).AddTicks(6977));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 5, 20, 44, 33, 705, DateTimeKind.Local).AddTicks(6983));

            migrationBuilder.UpdateData(
                table: "SourceProviders",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 6, 1, 44, 33, 706, DateTimeKind.Utc).AddTicks(4317));

            migrationBuilder.UpdateData(
                table: "UserRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 5, 20, 44, 33, 708, DateTimeKind.Local).AddTicks(5700));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 4, 5, 20, 44, 33, 707, DateTimeKind.Local).AddTicks(7278), new DateTime(2025, 4, 5, 20, 44, 33, 707, DateTimeKind.Local).AddTicks(7282) });

            migrationBuilder.CreateIndex(
                name: "IX_FolderPermissions_UserId_FolderId",
                table: "FolderPermissions",
                columns: new[] { "UserId", "FolderId" },
                unique: true);
        }
    }
}
