using System;
using System.Collections.Generic;

#nullable disable

namespace DeliveryDBNew.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Deliveries = new HashSet<Delivery>();
        }

        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string PhoneNumber { get; set; }

        public virtual ICollection<Delivery> Deliveries { get; set; }
    }
}
