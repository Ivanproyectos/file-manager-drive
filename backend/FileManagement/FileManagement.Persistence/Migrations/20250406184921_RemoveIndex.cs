using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FileManagement.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class RemoveIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserFolders_UserId_FolderId",
                table: "UserFolders");

            migrationBuilder.DropIndex(
                name: "IX_FolderPermissions_UserId_FolderId",
                table: "FolderPermissions");

            migrationBuilder.UpdateData(
                table: "Peoples",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 6, 13, 49, 21, 70, DateTimeKind.Local).AddTicks(9438));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 6, 13, 49, 21, 71, DateTimeKind.Local).AddTicks(2150));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 6, 13, 49, 21, 71, DateTimeKind.Local).AddTicks(2156));

            migrationBuilder.UpdateData(
                table: "SourceProviders",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 6, 18, 49, 21, 71, DateTimeKind.Utc).AddTicks(9245));

            migrationBuilder.UpdateData(
                table: "UserRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 4, 6, 13, 49, 21, 73, DateTimeKind.Local).AddTicks(8836));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 4, 6, 13, 49, 21, 73, DateTimeKind.Local).AddTicks(1623), new DateTime(2025, 4, 6, 13, 49, 21, 73, DateTimeKind.Local).AddTicks(1628) });

            migrationBuilder.CreateIndex(
                name: "IX_UserFolders_UserId",
                table: "UserFolders",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_FolderPermissions_UserId",
                table: "FolderPermissions",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserFolders_UserId",
                table: "UserFolders");

            migrationBuilder.DropIndex(
                name: "IX_FolderPermissions_UserId",
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
                name: "IX_UserFolders_UserId_FolderId",
                table: "UserFolders",
                columns: new[] { "UserId", "FolderId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FolderPermissions_UserId_FolderId",
                table: "FolderPermissions",
                columns: new[] { "UserId", "FolderId" },
                unique: true,
                filter: "DeletedAt IS NULL");
        }
    }
}
