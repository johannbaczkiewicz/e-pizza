using System.Collections.Generic;
using e_pizza.Models.Base;

namespace e_pizza.Models
{
    public class Pizza
    {
        public string Name { get; set; }
        public Dictionary<int, double> Prices { get; set; }   
        public List<string> Ingredients { get; set; }
    }
}