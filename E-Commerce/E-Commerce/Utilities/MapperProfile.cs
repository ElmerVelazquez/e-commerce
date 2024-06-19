using AutoMapper;
using E_Commerce.DTO;
using E_Commerce.Models;

namespace E_Commerce.Utilities
{
    public class MapperProfile: Profile
    {
        public MapperProfile()
        {
            CreateMap<UserDto, User>();
            CreateMap<AddressDto, Address>();
            CreateMap<ProductDto, Product>();
            CreateMap<CategoryDto, Category>();
            CreateMap<CartItemDto, CartItem>();
            CreateMap<OrderDto, Order>();
            CreateMap<OrderDetailDto, OrderDetail>();
        }
    }
}
