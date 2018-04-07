using System.Collections.Generic;

namespace e_pizza.Models.Base
{
    public interface IOrderItem 
    {
        int Count { get; set; }
        IPizza Pizza { get; set; }
    }
}