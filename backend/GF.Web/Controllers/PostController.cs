using GF.Services.Interfaces;
using GF.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace GF.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;

        public PostController(IPostService postService)
            => _postService = postService;
        

        [HttpGet]
        public OkObjectResult Get(int limit = 10, int offset = 0) 
            =>  Ok(_postService.GetAllWithPagination(limit, offset));
    }
}
