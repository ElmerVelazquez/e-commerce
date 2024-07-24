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
            CreateMap<UserDto, User>().ForMember(dest => dest.Password, opt => opt.Ignore());
            CreateMap<AddressDto, Address>();
            CreateMap<ProductDto, Product>();
            CreateMap<CategoryDto, Category>();
            CreateMap<CartItemDto, CartItem>();
            CreateMap<ShoppingCartDto, ShoppingCart>();
            CreateMap<OrderDto, Order>();
            CreateMap<OrderDetailDto, OrderDetail>();
            CreateMap<WishlistItemDto, WishlistItem>();
            CreateMap<DiscountDto, Discount>();
            CreateMap<PaymentMethodDto, PaymentMethod>();

            //salida de datos 
            CreateMap<Product, ProductOutDto>().ForMember(dest => dest.Discounts, opt => opt.MapFrom(src => src.Discounts.Select(d => new Discount
            {
                Id = d.Id,
                DiscountType = d.DiscountType,
                DiscountValue = d.DiscountValue,
                StartDate = d.StartDate,
                EndDate = d.EndDate
                
            })));
        }
    }
}
