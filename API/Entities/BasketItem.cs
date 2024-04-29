using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
      // this anotation is the name of the table in the database  
    [Table("BasketItems")]

    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        // navigation properties - we not going to have propertiy here we are onlyg have the product id 
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int BasketId { get; set; }
        public Basket Basket { get; set; }
    }
}