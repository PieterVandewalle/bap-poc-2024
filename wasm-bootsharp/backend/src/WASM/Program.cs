using Bootsharp;
using Bootsharp.Inject;
using Microsoft.Extensions.DependencyInjection;

// Application entry point for browser-wasm build target.
// Notice, how neither domain, nor other C# backend assemblies
// are coupled with the JavaScript interop specifics
// and can be shared with other build targets (console, MAUI, etc).

// Generate C# -> JavaScript interop handlers for specified contracts.
[assembly: JSExport(typeof(BapPoc.Shared.Validation.ICustomerValidator), typeof(BapPoc.Shared.Orders.IShippingPriceCalculator))]
// Group all generated JavaScript APIs under "Backend" namespace.
[assembly: JSPreferences(Space = [".+", "Backend"])]

// Perform dependency injection.
new ServiceCollection()
    .AddSingleton<BapPoc.Shared.Validation.ICustomerValidator, BapPoc.Shared.Validation.CustomerValidator>()
    .AddSingleton<BapPoc.Shared.Orders.IShippingPriceCalculator, BapPoc.Shared.Orders.ShippingPriceCalculator>()
    .AddBootsharp() // inject generated interop handlers
    .BuildServiceProvider()
    .RunBootsharp(); // initialize interop servicesinterop services