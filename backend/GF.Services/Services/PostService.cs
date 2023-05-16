using GF.Services.Interfaces;
using GF.Core.Models;
using GF.Core;
using Microsoft.EntityFrameworkCore;

namespace GF.Services
{
    public class PostService: IPostService
    {
        private readonly ApplicationContext _db;

        public PostService(ApplicationContext db)
        {
            _db = db;
            if (!_db.Posts.Any())
                SeedPosts();
        }

        public IEnumerable<Post> GetAllWithPagination(int limit = 10, int offset = 0)
            => _db.Posts.OrderBy(p => p.Id).Skip(offset).Take(limit).ToList();

        private void SeedPosts()
        {
            if (_db.Posts.Count() > 50)
            {
                var posts = _db.Posts.Select(p => p);
                _db.Posts.RemoveRange(posts);
                _db.SaveChanges();
            }
            for (int i = 0; i < 100; i++)
                _db.Posts.Add(new Post { Title = $"Post{i}" });
            _db.SaveChanges();
        }
    }
}
