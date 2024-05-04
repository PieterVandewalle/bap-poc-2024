using BapPoc.Shared.Orders;

namespace BapPoc.Services.Orders
{
    public interface IOrderService
    {
        Task<int> CreateAsync(OrderDto.Create model);
    }
}