using System.Collections.Generic;
using Newtonsoft.Json;

namespace e_pizza.Models
{
    public class Address
    {
        public string City { get; set; }
        public string Street { get; set; }
        public int HouseNumber { get; set; }
        public int? ApartmentNumber { get; set; }
    }
}