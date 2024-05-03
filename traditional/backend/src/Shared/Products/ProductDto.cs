using FluentValidation;

namespace BapPoc.Shared.Products;

public abstract class ProductDto
{
    public class Index
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public decimal Price { get; set; }
        public string? ImageUrl { get; set; }
        public string? Description { get; set; }
    }
}

