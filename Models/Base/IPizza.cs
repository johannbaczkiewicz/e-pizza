using System.Collections.Generic;

namespace e_pizza.Models.Base
{
    public interface IPizza 
    {
        string Name { get; set; }
        IDictionary<int, double> Prices { get; set; }   
        IEnumerable<string> Ingredients { get; set; }
    }
}