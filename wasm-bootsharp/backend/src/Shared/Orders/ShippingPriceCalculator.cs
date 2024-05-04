namespace BapPoc.Shared.Orders;

public class ShippingPriceCalculator : IShippingPriceCalculator
{
    public double CalculateShippingPrice(double totalOrderValue)
    {
        if(totalOrderValue < 100)
        {
            return 19.99;
        }

        if (totalOrderValue < 400)
        {
            return 9.99;
        }

        if(totalOrderValue < 3000)
        {
            return 2.99;
        }

        return 0;
    }
}
