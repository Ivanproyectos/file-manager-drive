using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FileManagement.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ChangeNameFieldUserName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Username",
                table: "Users",
                newName: "UserName");

            migrationBuilder.RenameIndex(
                name: "IX_Users_Username",
                table: "Users",
                newName: "IX_Users_UserName");

            migrationBuilder.UpdateData(
                table: "Peoples",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 16, 14, 47, 8, 434, DateTimeKind.Local).AddTicks(1237));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 3, 16, 14, 47, 8, 437, DateTimeKind.Local).AddTicks(2777), new DateTime(2025, 3, 16, 14, 47, 8, 437, DateTimeKind.Local).AddTicks(2787) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserName",
                table: "Users",
                newName: "Username");

            migrationBuilder.RenameIndex(
                name: "IX_Users_UserName",
                table: "Users",
                newName: "IX_Users_Username");

            migrationBuilder.UpdateData(
                table: "Peoples",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 16, 12, 9, 5, 717, DateTimeKind.Local).AddTicks(3221));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 3, 16, 12, 9, 5, 720, DateTimeKind.Local).AddTicks(1688), new DateTime(2025, 3, 16, 12, 9, 5, 720, DateTimeKind.Local).AddTicks(1693) });
        }
    }
}
