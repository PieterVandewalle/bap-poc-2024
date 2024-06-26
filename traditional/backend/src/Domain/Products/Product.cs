﻿namespace BapPoc.Domain.Products;

/// <summary>
/// A product in the Bogus Catalog.
/// </summary>
public class Product : Entity
{
    private string name = default!;
    public string Name
    {
        get => name;
        set => name = Guard.Against.NullOrWhiteSpace(value, nameof(Name));
    }

    private string description = default!;
    public string Description
    {
        get => description;
        set => description = Guard.Against.NullOrWhiteSpace(value, nameof(Description));
    }

    private Money price = default!;
    public Money Price
    {
        get => price;
        set => price = Guard.Against.Null(value, nameof(Price));
    }

    private string imageUrl = default!;
    public string ImageUrl
    {
        get => imageUrl;
        set => imageUrl = Guard.Against.NullOrWhiteSpace(value, nameof(ImageUrl));
    }

    /// <summary>
    /// Database Constructor
    /// </summary>
    private Product() { }

    public Product(string name, string description, Money price, string imageUrl)
    {
        Name = name;
        Description = description;
        Price = price;
        ImageUrl = imageUrl;
    }

}
