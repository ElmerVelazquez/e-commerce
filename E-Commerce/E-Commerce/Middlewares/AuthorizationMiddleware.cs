using Microsoft.AspNetCore.Http;
using System.Security.Claims;

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

                var routeUserId = context.Request.RouteValues["id"]?.ToString();

                var Endpoints = new[] { "/api/user/" + routeUserId};
                var requestPath = context.Request.Path.Value?.ToLower();

                if (context.User.IsInRole("admin") || userid == routeUserId ||
                    routeUserId == null || !Endpoints.Contains(requestPath))
                {
                    await _next(context);
                    return;
                }

                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                context.Response.ContentType = "text/plain";
                await context.Response.WriteAsync("Acceso denegado.");
                return;
            }

            await _next(context);
        }
    }

}
