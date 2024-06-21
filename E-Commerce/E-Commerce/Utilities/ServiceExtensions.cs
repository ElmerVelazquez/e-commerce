using E_Commerce.Interfaces;
using E_Commerce.Models;
using E_Commerce.Repository;

namespace E_Commerce.Utilities
{
    public static class ServiceExtensions
    {
        public static void AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IBaseRepository<Product>, BaseRepository<Product>>();
            services.AddScoped<IBaseRepository<Category>, BaseRepository<Category>>();
            services.AddScoped<IBaseRepository<Address>, BaseRepository<Address>>();
            services.AddScoped<IBaseRepository<CartItem>, BaseRepository<CartItem>>();
            services.AddScoped<IShoppingCartRepository, ShoppingCartRepository>();
            services.AddScoped<IBaseRepository<Order>, BaseRepository<Order>>();
            services.AddScoped<IBaseRepository<OrderDetail>, BaseRepository<OrderDetail>>();

        }
    }
}
