using BapPoc.Shared.Products;

namespace BapPoc.Services.Products;

public interface IProductService
{
    Task<ProductResult.Index> GetIndexAsync();
}