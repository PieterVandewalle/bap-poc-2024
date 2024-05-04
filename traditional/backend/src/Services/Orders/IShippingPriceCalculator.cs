namespace BapPoc.Services.Orders;

public interface  IShippingPriceCalculator
{
    public decimal CalculateShippingPrice(decimal totalOrderValue);
}
