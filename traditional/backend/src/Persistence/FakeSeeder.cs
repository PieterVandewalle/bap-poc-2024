using BapPoc.Fakers.Products;

namespace BapPoc.Persistence;

public class FakeSeeder
{
    private readonly DbContext dbContext;

    public FakeSeeder(DbContext dbContext)
	{
        this.dbContext = dbContext;
    }

    public void Seed()
    {
        // Not a good idea in production.
        dbContext.Database.EnsureDeleted();
        dbContext.Database.EnsureCreated();

        SeedProducts();
    }

    private void SeedProducts()
	{
        var products = new ProductFaker().AsTransient().UseSeed(1337).Generate(100);
        dbContext.Products.AddRange(products);
        dbContext.SaveChanges();
    }
}

