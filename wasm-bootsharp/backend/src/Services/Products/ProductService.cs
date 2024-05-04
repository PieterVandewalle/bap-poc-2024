using BapPoc.Persistence;
using BapPoc.Shared.Products;
using Microsoft.EntityFrameworkCore;

namespace BapPoc.Services.Products;

public class ProductService(StoreDbContext dbContext) : IProductService
{
    private readonly StoreDbContext _dbContext = dbContext;

    public async Task<ProductResult.Index> GetIndexAsync()
    {
        var query = _dbContext.Products.AsQueryable();
        int totalAmount = await query.CountAsync();

        var items = await query
           .OrderBy(x => x.Id)
           .Select(x => new ProductDto
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

