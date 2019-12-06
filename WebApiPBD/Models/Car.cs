using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiPBD.Models
{
    public class Car
    {
        [Key]
        public string VIN { get; set; }
        public string Registration { get; set; }
        public int? BrandID { get; set; }
        [ForeignKey("BrandID")]
        public CarBrand Brand { get; set; }//Navigation property
        public string Model { get; set; }
    }
}
