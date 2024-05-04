namespace BapPoc.Services.Orders;

public class ShippingPriceCalculator : IShippingPriceCalculator
{
    public decimal CalculateShippingPrice(decimal totalOrderValue)
    {
        if(totalOrderValue < 100)
        {
            return 19.99m;
        }

        if (totalOrderValue < 400)
        {
            return 9.99m;
        }

        if(totalOrderValue < 3000)
        {
            return 2.99m;
        }

        return 0;
    }
}
