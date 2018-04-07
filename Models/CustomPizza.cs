using System.Collections.Generic;
using e_pizza.Models.Base;

namespace e_pizza.Models
{
    public class CustomPizza: IPizza
    {
        public string Name { get; set; }
        public int Size { get; set; }
        public IDictionary<int, double> Prices { get; set; }   
        public IEnumerable<string> Ingredients { get; set; }
    }
}