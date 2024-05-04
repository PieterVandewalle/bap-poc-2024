﻿namespace BapPoc.Shared.Products;

public class ProductDto
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; }
    public string? Description { get; set; }
}

