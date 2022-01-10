using System;
using System.Collections.Generic;

#nullable disable

namespace DeliveryDBNew.Models
{
    public partial class Product
    {
        public Product()
        {
            DeliveryItems = new HashSet<DeliveryItem>();
        }

        public int ProductId { get; set; }
        public int Price { get; set; }
        public string Name { get; set; }

        public virtual ICollection<DeliveryItem> DeliveryItems { get; set; }
    }
}
