﻿using E_Commerce.Interfaces;
using E_Commerce.Models;
using E_Commerce.Repository;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace E_Commerce.Utilities
{
    public static class ServiceExtensions
    {
        public static void AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IShoppingCartRepository, ShoppingCartRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<IOrderDetailRepository, OrderDetailRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();

            services.AddScoped<IBaseRepository<Category>, BaseRepository<Category>>();
            services.AddScoped<IBaseRepository<Address>, BaseRepository<Address>>();
            services.AddScoped<IBaseRepository<CartItem>, BaseRepository<CartItem>>();
            services.AddScoped<IBaseRepository<Discount>, BaseRepository<Discount>>();
            services.AddScoped<IBaseRepository<PaymentMethod>, BaseRepository<PaymentMethod>>();
            services.AddScoped<IBaseRepository<Wishlist>, BaseRepository<Wishlist>>();
            services.AddScoped<IBaseRepository<WishlistItem>, BaseRepository<WishlistItem>>();

            services.AddTransient<IEmailSenderRepository, EmailSenderRepository>();
        }
    }
}
