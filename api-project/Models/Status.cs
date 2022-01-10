using System;
using System.Collections.Generic;

#nullable disable

namespace DeliveryDBNew.Models
{
    public partial class Status
    {
        public Status()
        {
            Deliveries = new HashSet<Delivery>();
        }

        public int StatusId { get; set; }
        public string Message { get; set; }

        public virtual ICollection<Delivery> Deliveries { get; set; }
    }
}
