using System.Collections.Generic;

namespace e_pizza.Models.Base
{
    public interface IPersonalData 
    {
        string City { get; set; }
        string Street { get; set; }
        int HouseNumber { get; set; }
        int PhoneNumber { get; set; }
    }
}