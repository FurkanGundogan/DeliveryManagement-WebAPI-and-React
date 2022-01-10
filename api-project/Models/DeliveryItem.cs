using System;
using System.Collections.Generic;

#nullable disable

namespace DeliveryDBNew.Models
{
    public partial class DeliveryItem
    {
        public int DeliveryItemId { get; set; }
        public int? DeliveryId { get; set; }
        public int? ProductId { get; set; }

        public virtual Delivery Delivery { get; set; }
        public virtual Product Product { get; set; }
    }
}
