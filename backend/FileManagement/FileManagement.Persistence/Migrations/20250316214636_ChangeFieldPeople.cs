using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FileManagement.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ChangeFieldPeople : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Peoples_Email",
                table: "Peoples");

            migrationBuilder.UpdateData(
                table: "Peoples",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 16, 16, 46, 36, 486, DateTimeKind.Local).AddTicks(3515));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 3, 16, 16, 46, 36, 488, DateTimeKind.Local).AddTicks(8887), new DateTime(2025, 3, 16, 16, 46, 36, 488, DateTimeKind.Local).AddTicks(8891) });

            migrationBuilder.CreateIndex(
                name: "IX_Peoples_Email",
                table: "Peoples",
                column: "Email",
                unique: true,
                filter: "DeletedAt IS NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Peoples_Email",
                table: "Peoples");

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

            migrationBuilder.CreateIndex(
                name: "IX_Peoples_Email",
                table: "Peoples",
                column: "Email",
                unique: true);
        }
    }
}
