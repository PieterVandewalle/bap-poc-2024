using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using BapPoc.Shared.Customers;
using BapPoc.Services.Products;
using BapPoc.Shared.Products;
using BapPoc.Shared.Orders;
using BapPoc.Services.Orders;

namespace BapPoc.Server.Controllers.Products;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly IOrderService orderService;

    public OrderController(IOrderService orderService)
    {
        this.orderService = orderService;
    }

    [SwaggerOperation("Places an order for an existing customer.")]
    [HttpPost]
    public async Task<IActionResult> PlaceOrder(OrderDto.Create model)
    {
        int orderId = await orderService.CreateAsync(model);
        return CreatedAtAction(nameof(PlaceOrder), new { id = orderId });
    }
}
