using System;
using MySql.Data.MySqlClient;
using Microsoft.EntityFrameworkCore;
using static Org.BouncyCastle.Math.EC.ECCurve;
using Cinema_app.model;
namespace MSSQLApp.Data { 



public class dbconnect : DbContext                                                                         
{
    public IConfiguration _config { get; set; }
    public dbconnect(IConfiguration config)
    {
        _config = config;
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_config.GetConnectionString("DatabaseConnection"));
    }
    public DbSet<Movie> Movies { get; set; }    
}
}