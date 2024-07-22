using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace E_Commerce.Migrations
{
    /// <inheritdoc />
    public partial class refreshnulleable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "RefreshToken",
                table: "Passwords",
                type: "nvarchar(123)",
                maxLength: 123,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(123)",
                oldMaxLength: 123);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "RefreshToken",
                table: "Passwords",
                type: "nvarchar(123)",
                maxLength: 123,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(123)",
                oldMaxLength: 123,
                oldNullable: true);
        }
    }
}
