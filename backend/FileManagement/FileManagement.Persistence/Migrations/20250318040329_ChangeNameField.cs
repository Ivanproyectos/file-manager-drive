using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FileManagement.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ChangeNameField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Files_Folders_IdFolder",
                table: "Files");

            migrationBuilder.RenameColumn(
                name: "IdFolder",
                table: "Files",
                newName: "FolderId");

            migrationBuilder.RenameIndex(
                name: "IX_Files_IdFolder",
                table: "Files",
                newName: "IX_Files_FolderId");

            migrationBuilder.UpdateData(
                table: "Peoples",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 17, 23, 3, 29, 291, DateTimeKind.Local).AddTicks(2310));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 17, 23, 3, 29, 291, DateTimeKind.Local).AddTicks(5037));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 17, 23, 3, 29, 291, DateTimeKind.Local).AddTicks(5043));

            migrationBuilder.UpdateData(
                table: "UserRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 17, 23, 3, 29, 294, DateTimeKind.Local).AddTicks(3608));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 3, 17, 23, 3, 29, 293, DateTimeKind.Local).AddTicks(5620), new DateTime(2025, 3, 17, 23, 3, 29, 293, DateTimeKind.Local).AddTicks(5624) });

            migrationBuilder.AddForeignKey(
                name: "FK_Files_Folders_FolderId",
                table: "Files",
                column: "FolderId",
                principalTable: "Folders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Files_Folders_FolderId",
                table: "Files");

            migrationBuilder.RenameColumn(
                name: "FolderId",
                table: "Files",
                newName: "IdFolder");

            migrationBuilder.RenameIndex(
                name: "IX_Files_FolderId",
                table: "Files",
                newName: "IX_Files_IdFolder");

            migrationBuilder.UpdateData(
                table: "Peoples",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 17, 21, 33, 26, 963, DateTimeKind.Local).AddTicks(5865));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 17, 21, 33, 26, 963, DateTimeKind.Local).AddTicks(8667));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 17, 21, 33, 26, 963, DateTimeKind.Local).AddTicks(8674));

            migrationBuilder.UpdateData(
                table: "UserRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 3, 17, 21, 33, 26, 966, DateTimeKind.Local).AddTicks(8528));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 3, 17, 21, 33, 26, 966, DateTimeKind.Local).AddTicks(175), new DateTime(2025, 3, 17, 21, 33, 26, 966, DateTimeKind.Local).AddTicks(180) });

            migrationBuilder.AddForeignKey(
                name: "FK_Files_Folders_IdFolder",
                table: "Files",
                column: "IdFolder",
                principalTable: "Folders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
