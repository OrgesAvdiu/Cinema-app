using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cinema_app.Migrations
{
    /// <inheritdoc />
    public partial class ConfigureMovieCategoryRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CategoryMovie_Categories_CategoriesId",
                table: "CategoryMovie");

            migrationBuilder.DropForeignKey(
                name: "FK_CategoryMovie_Movies_MoviesId",
                table: "CategoryMovie");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CategoryMovie",
                table: "CategoryMovie");

            migrationBuilder.RenameTable(
                name: "CategoryMovie",
                newName: "MovieCategories");

            migrationBuilder.RenameIndex(
                name: "IX_CategoryMovie_MoviesId",
                table: "MovieCategories",
                newName: "IX_MovieCategories_MoviesId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MovieCategories",
                table: "MovieCategories",
                columns: new[] { "CategoriesId", "MoviesId" });

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MovieCategories_Categories_CategoriesId",
                table: "MovieCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_MovieCategories_Movies_MoviesId",
                table: "MovieCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MovieCategories",
                table: "MovieCategories");

            migrationBuilder.RenameTable(
                name: "MovieCategories",
                newName: "CategoryMovie");

            migrationBuilder.RenameIndex(
                name: "IX_MovieCategories_MoviesId",
                table: "CategoryMovie",
                newName: "IX_CategoryMovie_MoviesId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CategoryMovie",
                table: "CategoryMovie",
                columns: new[] { "CategoriesId", "MoviesId" });

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryMovie_Categories_CategoriesId",
                table: "CategoryMovie",
                column: "CategoriesId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryMovie_Movies_MoviesId",
                table: "CategoryMovie",
                column: "MoviesId",
                principalTable: "Movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
