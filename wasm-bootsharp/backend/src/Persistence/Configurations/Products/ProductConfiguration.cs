using BapPoc.Domain.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BapPoc.Persistence.Configurations.Products;

internal class ProductConfiguration : EntityConfiguration<Product>
{
    public override void Configure(EntityTypeBuilder<Product> builder)
    {
        base.Configure(builder);

        builder.OwnsOne(x => x.Price)
               .Property(x => x.Value)
               .HasColumnName(nameof(Product.Price));
    }
}

