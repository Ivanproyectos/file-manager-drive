using FileManagement.IoC;
using FileManagement.WebApi.Middleware;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var allowSpecificOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddApplication(builder.Configuration);

builder.Services.AddCors(options => options.AddPolicy("CorsPolicy",policy =>
{
    policy.WithOrigins(allowSpecificOrigins)
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials();
}
));

builder.Services.AddSwaggerGen(c =>
{
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

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.UseMiddleware<ExceptionHadlerMiddleware>();

app.Run();
