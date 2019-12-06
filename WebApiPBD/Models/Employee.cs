using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiPBD.Models
{
    public class Employee
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "PESEL name is required")]
        [StringLength(50)]
        public string PESEL { get; set; }
        public string Forename { get; set; }
        public string Surname { get; set; }
        public virtual ICollection<DeliveryEmployee> DeliveryEmployees { get; set; }//NAvigation Property. One to many
    }
}
