using FileManagement.Core.Hubs;
using FileManagement.Core.Settings;
using FileManagement.IoC;
using FileManagement.WebApi.Middleware;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var allowSpecificOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>();
var jwtSetting = builder.Configuration.GetSection("JWTSettings").Get<JWTSettings>();
//builder.Services.Configure<JwtSetting>(builder.Configuration.GetSection("JwtConfig"));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

builder.Services.AddApplicationServices(builder.Configuration);
//builder.Services.AddTransient<JwtMiddleware>();

builder.Services.AddCors(options => options.AddPolicy("CorsPolicy",policy =>
{
    policy.WithOrigins(allowSpecificOrigins?? Array.Empty<string>())
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials();
}
));

builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "FileManagement.WebApi",
        Version = "v1",
        Description = "File Management API",
        Contact = new OpenApiContact
        {
            Name = "Soporte",
            Email = "ivansperezt@gmail.com"
        }
    });
});

builder.Services.AddHttpContextAccessor();
builder.Services.AddSignalR();

/*builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
}); */

var app = builder.Build();
app.MapHub<FileUploadHub>("/fileUploadHub");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");
app.UseHttpsRedirection();

app.UseMiddleware<JwtMiddleware>(jwtSetting.SecretKey);
app.UseAuthentication();

app.UseAuthorization();


app.MapControllers();
app.UseMiddleware<ExceptionHadlerMiddleware>();

app.Run();
