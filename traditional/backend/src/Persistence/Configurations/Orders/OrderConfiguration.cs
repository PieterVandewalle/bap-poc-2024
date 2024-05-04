using System;
using BapPoc.Domain.Customers;
using BapPoc.Domain.Orders;
using BapPoc.Domain.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BapPoc.Persistence.Configurations.Orders;

internal class OrderConfiguration : EntityConfiguration<Order>
{
    public override void Configure(EntityTypeBuilder<Order> builder)
    {
        base.Configure(builder);

        builder.OwnsOne(x => x.ShippingCost)
            .Property(x => x.Value)
            .HasColumnName(nameof(Order.ShippingCost));

        builder.OwnsOne(x => x.Customer, customer =>
        {
            customer.OwnsOne(x => x.Email, email =>
            {
                email.Property(x => x.Value).HasColumnName(nameof(Customer.Email));
            });

            customer.OwnsOne(x => x.Address, address =>
            {
                // Without this mapping EF Core does not save the properties since they're getters only.
                // This can be omitted by making them private set, but then you're lying to the domain model.
                address.Property(x => x.Addressline1).HasColumnName(nameof(Address.Addressline1));
                address.Property(x => x.Addressline2).HasColumnName(nameof(Address.Addressline2));
                address.Property(x => x.PostalCode).HasColumnName(nameof(Address.PostalCode));
                address.Property(x => x.City).HasColumnName(nameof(Address.City));
                address.Property(x => x.Country).HasColumnName(nameof(Address.Country));
            });
        });
    }
}