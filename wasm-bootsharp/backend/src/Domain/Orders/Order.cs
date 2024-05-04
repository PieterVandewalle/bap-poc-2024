using BapPoc.Domain.Customers;

namespace BapPoc.Domain.Orders;

public class Order : Entity
{
    private readonly List<OrderLine> lines = new();

    public Customer Customer { get; } = default!;

    public Money ShippingCost { get; set; } = default!;

    public IReadOnlyCollection<OrderLine> Lines => lines.AsReadOnly();

    private Order() { }

    public Order(Customer customer, IEnumerable<OrderItem> items, Money shippingCost)
    {
        Customer = Guard.Against.Null(customer, nameof(Customer));
        Guard.Against.NullOrEmpty(items, nameof(items));
        ShippingCost = Guard.Against.Null(shippingCost, nameof(shippingCost));

        foreach (OrderItem item in items)
        {
            lines.Add(new OrderLine(this, item));
        }
    }
}