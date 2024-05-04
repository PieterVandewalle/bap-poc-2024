using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using BapPoc.Shared.Orders;
using BapPoc.Services.Orders;

namespace BapPoc.Server.Controllers.Products;

[ApiController]
[Route("api/[controller]")]
public class OrderController(IOrderService orderService) : ControllerBase
{
    private readonly IOrderService _orderService = orderService;

    [SwaggerOperation("Places an order for an existing customer.")]
    [HttpPost]
    public async Task<IActionResult> PlaceOrder(OrderDto.Create model)
    {
        int orderId = await _orderService.CreateAsync(model);
        return CreatedAtAction(nameof(PlaceOrder), new { id = orderId });
    }
}
