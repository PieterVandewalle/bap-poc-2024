using Microsoft.AspNetCore.Mvc;
using BapPoc.Shared.Products;
using Swashbuckle.AspNetCore.Annotations;
using BapPoc.Services.Products;

namespace BapPoc.Server.Controllers.Products;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly IProductService productService;

    public ProductController(IProductService productService)
    {
        this.productService = productService;
    }

    [SwaggerOperation("Returns a list of products available in the bogus catalog.")]
    [HttpGet]
    public async Task<ProductResult.Index> GetIndex()
    {
        return await productService.GetIndexAsync();
    }
}
