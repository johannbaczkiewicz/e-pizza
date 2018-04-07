using Microsoft.AspNetCore.Mvc;
using e_pizza.Models;
using e_pizza.Models.Base;
using System.Collections.Generic;

namespace e_pizza
{
    [Route("api/")]
    public class DataController: Controller
    {
        List<IPizza> pizzas = new List<IPizza>
        {
            new Pizza()
            {
                Name = "Margherita",
                Prices = new Dictionary<int, double>
                {
                    [32] = 18.9,
                    [42] = 22.5,
                    [52] = 24.6
                },
                Ingredients = new List<string>
                {
                    "sos pom.",
                    "ser",
                    "peperoni"
                }
            },
            new Pizza()
            {
                Name = "Prosciutto",
                Prices = new Dictionary<int, double>
                {
                    [32] = 20.4,
                    [42] = 24.9,
                    [52] = 29.8
                },
                Ingredients = new List<string>
                {
                    "sos pom.",
                    "ser",
                    "szynka",
                    "oregano"
                }
            },
            new Pizza()
            {
                Name = "Hawai",
                Prices = new Dictionary<int, double>
                {
                    [32] = 22.5,
                    [42] = 26.4,
                    [52] = 32.2
                },
                Ingredients = new List<string>
                {
                    "sos pom.",
                    "ser",
                    "szynka",
                    "ananas",
                    "oregano"
                }
            }
        };

        [HttpGet("pizzas")]
        public IActionResult GetPizzas()
        {
            return Json(pizzas);
        }

        [HttpPost("order")]
        public IActionResult PostOrder([FromBody] IOrder order)
        {
            // send to db
            var result = "";
            return Json(result);
        }
    }
}