using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cinema_app.Migrations
{
    /// <inheritdoc />
    public partial class MovieCategoryTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Drop existing constraints
            migrationBuilder.Sql("IF EXISTS (SELECT name FROM sys.indexes WHERE name = 'IX_MovieCategories_MoviesId') DROP INDEX [IX_MovieCategories_MoviesId] ON [MovieCategories]", suppressTransaction: true);

            migrationBuilder.DropForeignKey(
                name: "FK_MovieCategories_Categories_CategoriesId",
                table: "MovieCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_MovieCategories_Movies_MoviesId",
                table: "MovieCategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MovieCategories",
                table: "MovieCategories");

            // Rename table
            migrationBuilder.RenameTable(
                name: "MovieCategories",
                newName: "MovieCategory");

            // Create new indexes
            migrationBuilder.CreateIndex(
                name: "IX_MovieCategory_MoviesId",
                table: "MovieCategory",
                column: "MoviesId");

            // Add primary key and foreign keys back
            migrationBuilder.AddPrimaryKey(
                name: "PK_MovieCategory",
                table: "MovieCategory",
                columns: new[] { "MoviesId", "CategoriesId" });

            migrationBuilder.AddForeignKey(
                name: "FK_MovieCategory_Categories_CategoriesId",
                table: "MovieCategory",
                column: "CategoriesId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MovieCategory_Movies_MoviesId",
                table: "MovieCategory",
                column: "MoviesId",
                principalTable: "Movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Revert changes in the Down method
            migrationBuilder.DropForeignKey(
                name: "FK_MovieCategory_Categories_CategoriesId",
                table: "MovieCategory");

            migrationBuilder.DropForeignKey(
                name: "FK_MovieCategory_Movies_MoviesId",
                table: "MovieCategory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MovieCategory",
                table: "MovieCategory");

            // Drop new indexes
            migrationBuilder.Sql("IF EXISTS (SELECT name FROM sys.indexes WHERE name = 'IX_MovieCategory_MoviesId') DROP INDEX [IX_MovieCategory_MoviesId] ON [MovieCategory]", suppressTransaction: true);

            migrationBuilder.RenameTable(
                name: "MovieCategory",
                newName: "MovieCategories");

            // Create old indexes
            migrationBuilder.CreateIndex(
                name: "IX_MovieCategories_MoviesId",
                table: "MovieCategories",
                column: "MoviesId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MovieCategories",
                table: "MovieCategories",
                columns: new[] { "MoviesId", "CategoriesId" });

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