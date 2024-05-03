using System.Reflection;
using BapPoc.Domain.Orders;
using BapPoc.Domain.Products;
using BapPoc.Persistence.Triggers;
using Microsoft.EntityFrameworkCore;

namespace BapPoc.Persistence;

public class DbContext : Microsoft.EntityFrameworkCore.DbContext
{
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Order> Orders => Set<Order>();

    public DbContext(DbContextOptions<DbContext> options) : base(options) { }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
        optionsBuilder.EnableDetailedErrors();
        optionsBuilder.EnableSensitiveDataLogging();
        optionsBuilder.UseTriggers(options =>
        {
            options.AddTrigger<EntityBeforeSaveTrigger>();
        });
    }

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        // All decimals should have 2 digits after the comma
        configurationBuilder.Properties<decimal>().HavePrecision(18, 2);
        // Max Length of a NVARCHAR that can be indexed
        configurationBuilder.Properties<string>().HaveMaxLength(4_000);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}

