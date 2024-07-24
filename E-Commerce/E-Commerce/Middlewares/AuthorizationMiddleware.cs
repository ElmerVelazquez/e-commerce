using E_Commerce.DTO;
using E_Commerce.Models;
using E_Commerce.Utilities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text.Json;

namespace E_Commerce.Middlewares
{
    public class AuthorizationMiddleware
    {
        private readonly RequestDelegate _next;

        public AuthorizationMiddleware(RequestDelegate next)
        {
            _next = next;

        }

        public async Task InvokeAsync(HttpContext context)
        {
            
            if (context.User.Identity.IsAuthenticated)
            {
                var userid = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                var routeId = context.Request.RouteValues["id"]?.ToString();
                
                var EndpointsUser = new[] {
                    $"/api/users/{routeId}"};
                var EndpointsResource = new[] {
                    $"/api/addresses/{routeId}",
                    $"/api/orders/{routeId}",
                    $"/api/shoppingcarts/{routeId}",
                    $"/api/discounts/{routeId}",
                    $"/api/paymentmethods/{routeId}"};
                var EndpointsSubResource = new[] {
                    $"/api/cartitems/{routeId}",
                    $"/api/orderdetails/{routeId}",
                    $"/api/wishlistItem/{routeId}"};
                
                var requestPath = context.Request.Path.Value?.ToLower();
                if (context.User.IsInRole("admin") || routeId == null)
                {
                    await _next(context);
                    return;
                }                
                if (EndpointsUser.Contains(requestPath) & userid == routeId)
                {
                    await _next(context);
                    return;
                }
                var _dbContext = context.RequestServices.GetRequiredService<EcommerceDbContext>();

                if (EndpointsResource[0].Contains(requestPath))
                {
                    var cart = await _dbContext.ShoppingCarts.Where(u => u.Id == int.Parse(routeId)).FirstOrDefaultAsync();
                    if (cart != null)
                    {
                        if (cart.UserId == int.Parse(userid))
                        {
                            await _next(context);
                            return;
                        }
                    }
                }
                if (EndpointsResource[1].Contains(requestPath))
                {
                    var order = await _dbContext.Orders.Where(u => u.Id == int.Parse(routeId)).FirstOrDefaultAsync();
                    if (order != null)
                    {
                        if (order.UserId == int.Parse(userid))
                        {
                            await _next(context);
                            return;
                        }
                    }
                }
                if (EndpointsResource[2].Contains(requestPath))
                {
                    var address = await _dbContext.Addresses.Where(u => u.Id == int.Parse(routeId)).FirstOrDefaultAsync();
                    if (address != null)
                    {
                        if (address.UserId == int.Parse(userid))
                        {
                            await _next(context);
                            return;
                        }
                    }
                }
                if (EndpointsSubResource[0].Contains(requestPath))
                {
                    var carti = await _dbContext.CartItems.Where(u => u.Id == int.Parse(routeId)).FirstOrDefaultAsync();
                    if (carti != null)
                    {
                        var cart = await _dbContext.ShoppingCarts.Where(u => u.Id == carti.CartId).FirstOrDefaultAsync();
                        if (cart.UserId == int.Parse(userid))
                        {
                            await _next(context);
                            return;
                        }
                    }
                }
                if (EndpointsSubResource[1].Contains(requestPath))
                {
                    var orderd = await _dbContext.OrderDetails.Where(u => u.Id == int.Parse(routeId)).FirstOrDefaultAsync();
                    if (orderd != null)
                    {
                        var Order = await _dbContext.Orders.Where(u => u.Id == orderd.OrderId).FirstOrDefaultAsync();
                        if (Order.UserId == int.Parse(userid))
                        {
                            await _next(context);
                            return;
                        }
                    }
                }
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                context.Response.ContentType = "text/plain";
                await context.Response.WriteAsync(JsonSerializer.Serialize(Result.Fail("Acceso denegado")));
                return;
            }

            await _next(context);
            return;
        }





    }

}
