using System;
using BapPoc.Shared.Customers;
using FluentValidation;

namespace BapPoc.Shared.Orders;

public abstract class OrderDto
{
    public class Create
    {
        public IEnumerable<OrderItemDto.Create> Items { get; set; } = default!;
        public CustomerDto.Create Customer { get; set; } = default!;
        // Other properties such as :
        // DeliveryDate
        // ShippingAddress (when different from Customer Address),...

        public class Validator : AbstractValidator<Create>
        {
            public Validator()
            {
                RuleFor(x => x.Items).NotEmpty();
                RuleForEach(x => x.Items).SetValidator(new OrderItemDto.Create.Validator());
                RuleFor(x => x.Customer).SetValidator(new CustomerDto.Create.Validator());
            }
        }
    }
}

