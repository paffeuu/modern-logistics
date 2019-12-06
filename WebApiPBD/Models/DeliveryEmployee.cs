using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiPBD.Models
{
    public class DeliveryEmployee
    {
        public int DeliveryId { get; set; }
        public Delivery Delivery { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
    }
}
