using GF.Core;
using GF.Services;
using GF.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GF.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            ConfigureServices(builder.Services, builder.Configuration);

            var app = builder.Build();

            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.MapControllers();

            app.Run();
        }

        private static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddControllers();
            services.AddDbContext<ApplicationContext>(options => 
                options.UseSqlServer(configuration["ConnectionStrings:DefaultConnection"]));
            services.AddTransient<IPostService, PostService>();
            services.AddCors();
        }
    }
}