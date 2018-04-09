using System.Collections.Generic;
using e_pizza.Models;

namespace e_pizza.Models.Base
{
    public interface IOrder 
    {
        PersonalData CustomerPersonalData { get; set; }
        IEnumerable<IOrderItem> OrderItems { get; set; }
    }
}