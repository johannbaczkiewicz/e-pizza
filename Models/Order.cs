using System.Collections.Generic;
using e_pizza.Models;
using Newtonsoft.Json;

namespace e_pizza.Models
{
    public class Order 
    {
        [JsonProperty(PropertyName = "PersonalData")]
        public PersonalData CustomerData { get; set; }
        public List<OrderItem> OrderItems { get; set; }
    }
}