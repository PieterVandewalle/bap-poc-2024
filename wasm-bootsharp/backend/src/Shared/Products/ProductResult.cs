namespace BapPoc.Shared.Products;

public abstract class ProductResult
{
    public class Index
    {
        public IEnumerable<ProductDto>? Products { get; set; }
        public int TotalAmount { get; set; }
    }
}

