using BapPoc.Shared.Products;
using Microsoft.EntityFrameworkCore;

namespace BapPoc.Services.Products;

public class ProductService : IProductService
{
    private readonly Persistence.DbContext dbContext;

    public ProductService(Persistence.DbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public async Task<ProductResult.Index> GetIndexAsync()
    {
        var query = dbContext.Products.AsQueryable();
        int totalAmount = await query.CountAsync();

        var items = await query
           .OrderBy(x => x.Id)
           .Select(x => new ProductDto.Index
           {
               Id = x.Id,
               Name = x.Name,
               Description = x.Description,
               Price = x.Price.Value,
               ImageUrl = x.ImageUrl,
           }).ToListAsync();

        var result = new ProductResult.Index
        {
            Products = items,
            TotalAmount = totalAmount
        };
        return result;
    }
}

