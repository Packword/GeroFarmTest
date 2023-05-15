using GF.Core.Models;

namespace GF.Services.Interfaces
{
    public interface IPostService
    {
        public IEnumerable<Post> GetAllWithPagination(int limit = 10, int offset = 0);
    }
}
