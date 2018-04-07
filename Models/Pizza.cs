using System.Collections.Generic;
using e_pizza.Models.Base;

namespace e_pizza.Models
{
    public class Pizza: IPizza
    {
        public string Name { get; set; }
        public IDictionary<int, double> Prices { get; set; }   
        public IEnumerable<string> Ingredients { get; set; }
    }
}