using AutoMapper;
using E_Commerce.Middlewares;
using E_Commerce.Models;
using E_Commerce.Repository;
using E_Commerce.Utilities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using System.Text.Json.Serialization;


var builder = WebApplication.CreateBuilder(args);


var config = builder.Configuration;


// Add services to the container.
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = config["JwtSettings:Issuer"],
        ValidAudience = config["JwtSettings:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey
            (Encoding.UTF8.GetBytes(config["JwtSettings:key"]!)),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true
    };
    x.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context =>
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;

            // Log or handle the authentication failure
            return Task.CompletedTask;
        },
        OnTokenValidated = context =>
        {
            context.Response.StatusCode = StatusCodes.Status200OK;

            // Additional custom validation logic can go here
            return Task.CompletedTask;
        },
        OnChallenge = context =>
        {
            // Handle challenge event
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        },
        OnForbidden = context =>
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            context.Response.ContentType = "text/plain";
            return context.Response.WriteAsync("Acceso denegado.");
        }
    };
});
builder.Services.AddAuthorization(
    options =>
{
    options.AddPolicy("AdminPolicy", policy =>
        policy.RequireRole("admin"));
    options.AddPolicy("UserPolicy", policy =>
        policy.RequireClaim("UserType", "regular"));

}
);
var mapperConfig = new MapperConfiguration(config =>
{
    config.AddProfile(new MapperProfile());
});
IMapper mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton(mapper);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});


var environment = builder.Environment.EnvironmentName;

// Configurar la cadena de conexi�n basada en el entorno
string connectionString;

if (environment == "Development")
{
    connectionString = builder.Configuration.GetConnectionString("Default2");
}
else
{
    connectionString = builder.Configuration.GetConnectionString("Default");
}

builder.Services.AddDbContext<EcommerceDbContext>(options =>
    
    options.UseSqlServer(connectionString)
);

//AddScoped
builder.Services.AddRepositories();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    // Definir el esquema de seguridad
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter into field the word 'Bearer' following by space and JWT",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    // Habilitar el uso del esquema de seguridad en Swagger
    c.AddSecurityRequirement(new OpenApiSecurityRequirement{
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }});
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
   // app.UseSwagger();
   // app.UseSwaggerUI();
}
app.UseSwagger();//
app.UseSwaggerUI();//
app.UseHttpsRedirection();

app.UseCors("AllowOrigin");

app.UseAuthentication();
app.UseAuthorization();

app.UseMiddleware<AuthorizationMiddleware>();

app.MapControllers();

app.Run();

