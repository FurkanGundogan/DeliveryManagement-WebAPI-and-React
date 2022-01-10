using System;
using System.Collections.Generic;

#nullable disable

namespace DeliveryDBNew.Models
{
    public partial class Delivery
    {
        public Delivery()
        {
            DeliveryItems = new HashSet<DeliveryItem>();
        }

        public int DeliveryId { get; set; }
        public int? CustomerId { get; set; }
        public int? StatusId { get; set; }
        public DateTime ArriveDate { get; set; }
        public string Address { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual Status Status { get; set; }
        public virtual ICollection<DeliveryItem> DeliveryItems { get; set; }
    }
}
