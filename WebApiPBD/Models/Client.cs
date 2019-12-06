using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiPBD.Models
{
    public class Client
    {     
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public virtual ICollection<Delivery> Deliveries { get; set; }//one to many
    }
}
