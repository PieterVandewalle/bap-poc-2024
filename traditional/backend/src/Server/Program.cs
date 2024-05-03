using BapPoc.Persistence;
using BapPoc.Server.Middleware;
using BapPoc.Services;
using BapPoc.Shared.Orders;
using BapPoc.Shared.Products;
using FluentValidation;
using FluentValidation.AspNetCore;
using MicroElements.Swashbuckle.FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod();
        });
});

// Add services to the container.
builder.Services.AddStoreServices();

// Fluentvalidation
builder.Services.AddValidatorsFromAssemblyContaining<OrderDto.Create.Validator>();
builder.Services.AddFluentValidationAutoValidation();

// Swagger | OAS 
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    // Since we subclass our dto's we need a more unique id.
    options.CustomSchemaIds(type => type.DeclaringType is null ? $"{type.Name}" : $"{type.DeclaringType?.Name}.{type.Name}");
    options.EnableAnnotations();
}).AddFluentValidationRulesToSwagger();

// Database
// Database
builder.Services.AddDbContext<BapPoc.Persistence.DbContext>(options =>
{
    options.UseSqlServer
    (
        builder.Configuration.GetConnectionString("SqlServer")
    );
});

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

// app.UseHttpsRedirection();

app.UseCors();

app.UseMiddleware<ExceptionMiddleware>();

app.MapControllers();


using (var scope = app.Services.CreateScope())
{ // Require a DbContext from the service provider and seed the database.
    var dbContext = scope.ServiceProvider.GetRequiredService<BapPoc.Persistence.DbContext>();
    FakeSeeder seeder = new(dbContext);
    seeder.Seed();
}

app.Run();
