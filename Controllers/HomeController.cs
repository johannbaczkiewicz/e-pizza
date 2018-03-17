using Microsoft.AspNetCore.Mvc;

namespace e_pizza
{
    public class HomeController: Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}