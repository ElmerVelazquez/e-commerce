using AutoMapper;
using E_Commerce.DTO;
using E_Commerce.Models;

namespace E_Commerce.Utilities
{
    public class MapperProfile: Profile
    {
        public MapperProfile()
        {
            //entrada de datos
            CreateMap<UserDto, User>();
            CreateMap<AddressDto, Address>();
            CreateMap<ProductDto, Product>();
            CreateMap<CategoryDto, Category>();
            CreateMap<CartItemDto, CartItem>();
            CreateMap<ShoppingCartDto, ShoppingCart>();
            CreateMap<OrderDto, Order>();
            CreateMap<OrderDetailDto, OrderDetail>();

            //salida de datos, sin uso aun 
            CreateMap<User, UserDto>();
            CreateMap<Address, AddressDto>();
            CreateMap<Product, ProductDto>();
            CreateMap<Category, CategoryDto>();
            CreateMap<CartItem, CartItemDto>();
            CreateMap<Order, OrderDto>();
            CreateMap<OrderDetail, OrderDetailDto>();
        }
    }
}
