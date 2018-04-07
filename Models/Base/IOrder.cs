using System.Collections.Generic;

namespace e_pizza.Models.Base
{
    public interface IOrder 
    {
        IPersonalData CustomerPersonalData { get; set; }
        IEnumerable<IOrderItem> OrderItems { get; set; }
    }
}