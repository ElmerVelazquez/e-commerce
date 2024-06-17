using Microsoft.AspNetCore.Mvc;

namespace E_Commerce.Controllers
{
    public class UserController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
