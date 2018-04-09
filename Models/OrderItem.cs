using System.Collections.Generic;

namespace e_pizza.Models
{
    public class OrderItem 
    {
        public int Count { get; set; }
        public Pizza Pizza { get; set; }
    }
}