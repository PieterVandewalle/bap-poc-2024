using BapPoc.Services.Orders;
using BapPoc.Services.Products;
using Microsoft.Extensions.DependencyInjection;

namespace BapPoc.Services;

public static class ServiceCollectionExtensions
{
    /// <summary>
    /// Adds all services to the DI container.
    /// </summary>
    /// <param name="services"></param>
    /// <returns></returns>
    public static IServiceCollection AddStoreServices(this IServiceCollection services)
    {
        services.AddScoped<IProductService, ProductService>();
        services.AddScoped<IOrderService, OrderService>();

        return services;
    }
}

