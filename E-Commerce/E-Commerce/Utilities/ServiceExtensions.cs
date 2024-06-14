using E_Commerce.Interfaces;
using E_Commerce.Repository;

namespace E_Commerce.Utilities
{
    public static class ServiceExtensions
    {
        public static void AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();

        }
    }
}
