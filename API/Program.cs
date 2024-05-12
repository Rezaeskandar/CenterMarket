using API.Data;
using API.Entities;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<CenterMarketContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// for to allowing frontend to make the request to the api 
builder.Services.AddCors();

// configuration for identity 
builder.Services.AddIdentityCore<User>(opt => {
    
    // example reduce password complextiy  
    // opt.Password.RequireNonAlphanumeric =false;
    opt.User.RequireUniqueEmail =true;
})
.AddRoles<IdentityRole>()
.AddEntityFrameworkStores<CenterMarketContext>();
builder.Services.AddAuthentication();
builder.Services.AddAuthentication();
builder.Services.AddScoped<TokenService>();

var app = builder.Build();

// Configure the HTTP request pipeline. 
app.UseMiddleware<ExceptionMiddleware>();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// allowing any http method and any header but just from http://localhost:3000" 
app.UseCors(opt => opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000", "http://localhost:3001"));

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

var scope = app.Services.CreateScope(); 
//innislizing producs and user to database when app starts 
var context = scope.ServiceProvider.GetRequiredService<CenterMarketContext>();
var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try
{
    await context.Database.MigrateAsync();
   await DbInitializer.Initialize(context,userManager);
}
catch (Exception ex)
{
    logger.LogError(ex, "An error occurred durring migration.");
}
app.Run();
 