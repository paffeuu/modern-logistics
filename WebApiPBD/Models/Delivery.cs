using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiPBD.Models
{
    public class Delivery
    {
        public int Id { get; set; }
        public string CarVIN { get; set; }//not nullable
        [ForeignKey("CarVIN")]
        public Car Car { get; set; }
        public DateTime? EntryDate { get; set; }
        public decimal? FuelSpent { get; set; }
        public FuelType? FuelType { get; set; }
        public decimal? KmTravelled { get; set; }      
        public int? ClientID { get; set; }
        //[ForeignKey("ClientID")]
        //public Client Client { get; set; }
        public virtual ICollection<DeliveryEmployee> DeliveryEmployees { get; set; }//Navigation property. One to many
    }
}

public enum FuelType { gasoline, diesel, gas, ethanol, biodiesel, electric, hydrogen }

//https://localhost:44304/api/Deliveries?employees=1&employees=2&employees=3 