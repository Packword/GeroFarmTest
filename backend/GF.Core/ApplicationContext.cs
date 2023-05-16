using GF.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace GF.Core
{
    public class ApplicationContext: DbContext
    {
        public DbSet<Post> Posts { get; set; } = null!;

        public ApplicationContext(DbContextOptions<ApplicationContext> options): base(options)
        {
            Database.Migrate();
        }
    }
}
