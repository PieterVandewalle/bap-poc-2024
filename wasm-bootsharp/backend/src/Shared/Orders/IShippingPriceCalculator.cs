namespace BapPoc.Shared.Orders;

public interface  IShippingPriceCalculator
{
    public double CalculateShippingPrice(double totalOrderValue);
}
