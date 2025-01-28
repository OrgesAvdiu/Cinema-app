using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cinema_app.Migrations
{
    /// <inheritdoc />
    public partial class AddCategoryForeignKeyToMovies : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MovieCategories_Categories_CategoriesId",
                table: "MovieCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_MovieCategories_Movies_MoviesId",
                table: "MovieCategories");

            migrationBuilder.DropColumn(
                name: "CategoryID",
                table: "Movies");

            migrationBuilder.RenameColumn(
                name: "MoviesId",
                table: "MovieCategories",
                newName: "CategoryId");

            migrationBuilder.RenameColumn(
                name: "CategoriesId",
                table: "MovieCategories",
                newName: "MovieId");

            migrationBuilder.RenameIndex(
                name: "IX_MovieCategories_MoviesId",
                table: "MovieCategories",
                newName: "IX_MovieCategories_CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_MovieCategories_Categories_CategoryId",
                table: "MovieCategories",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MovieCategories_Movies_MovieId",
                table: "MovieCategories",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MovieCategories_Categories_CategoryId",
                table: "MovieCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_MovieCategories_Movies_MovieId",
                table: "MovieCategories");

            migrationBuilder.RenameColumn(
                name: "CategoryId",
                table: "MovieCategories",
                newName: "MoviesId");

            migrationBuilder.RenameColumn(
                name: "MovieId",
                table: "MovieCategories",
                newName: "CategoriesId");

            migrationBuilder.RenameIndex(
                name: "IX_MovieCategories_CategoryId",
                table: "MovieCategories",
                newName: "IX_MovieCategories_MoviesId");

            migrationBuilder.AddColumn<int>(
                name: "CategoryID",
                table: "Movies",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_MovieCategories_Categories_CategoriesId",
                table: "MovieCategories",
                column: "CategoriesId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MovieCategories_Movies_MoviesId",
                table: "MovieCategories",
                column: "MoviesId",
                principalTable: "Movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
