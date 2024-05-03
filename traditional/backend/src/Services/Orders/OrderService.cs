using BapPoc.Domain.Customers;
using BapPoc.Domain.Orders;
using BapPoc.Domain.Products;
using BapPoc.Persistence;
using BapPoc.Shared.Orders;
using Microsoft.EntityFrameworkCore;

namespace BapPoc.Services.Orders;

public class OrderService(StoreDbContext dbContext) : IOrderService
{
    private readonly StoreDbContext _dbContext = dbContext;

    public async Task<int> CreateAsync(OrderDto.Create model)
    {
        // Customer
        EmailAddress email = new EmailAddress(model.Customer.Email);
        Address address = new(model.Customer.Address.Addressline1!, model.Customer.Address.Addressline2, model.Customer.Address.PostalCode!, model.Customer.Address.City!, model.Customer.Address.Country!);
        Customer customer = new(model.Customer.Firstname!, model.Customer.Lastname!, address, email);

        IEnumerable<Product> products = await _dbContext.Products
                                               .Where(x => model.Items.Select(x => x.ProductId).Contains(x.Id))
                                                .ToListAsync();
        // Order
        List<OrderItem> orderItems = new();

        foreach (var item in model.Items)
        {
            Product? p = products.FirstOrDefault(x => x.Id == item.ProductId);

            if (p is null)
                throw new EntityNotFoundException(nameof(Product), item.ProductId);
            orderItems.Add(new OrderItem(p, item.Quantity));
        }

        Order order = new Order(customer, orderItems);
        _dbContext.Orders.Add(order);
        await _dbContext.SaveChangesAsync();

        return order.Id;
    }


}

