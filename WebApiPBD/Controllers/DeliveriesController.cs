using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApiPBD.Models;

namespace WebApiPBD.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveriesController : ControllerBase
    {
        private readonly AppDBContext _context;

        public DeliveriesController(AppDBContext context)
        {
            _context = context;
        }

        // GET: api/Deliveries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Delivery>>> GetDeliveries()
        {
            //return await _context.Deliveries.ToListAsync();
            return await _context.Deliveries.Include(i => i.DeliveryEmployees).Include(i => i.Car).ThenInclude(i => i.Brand).ToListAsync();
        }

        // GET: api/Deliveries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Delivery>> GetDelivery(int id)
        {
            //var delivery = await _context.Deliveries.FindAsync(id);
            var delivery = await _context.Deliveries.Include(i => i.DeliveryEmployees).Include(i => i.Car).ThenInclude(i => i.Brand).FirstOrDefaultAsync(i => i.Id == id);

            if (delivery == null)
            {
                return NotFound();
            }

            return delivery;
        }

        // PUT: api/Deliveries/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [Authorize(Roles = Role.Owner + "," + Role.Admin)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDelivery(int id, Delivery delivery)
        {
            if (id != delivery.Id)
            {
                return BadRequest();
            }
            _context.Entry(delivery).State = EntityState.Modified;

           
            if (delivery.DeliveryEmployees != null)
            {
                if (delivery.DeliveryEmployees.Count > 0)
                {
                    var listOfNewEmployeeId = delivery.DeliveryEmployees.Select(r => r.EmployeeId);
                    var deliveryEmployeesToDelete = _context.DeliveryEmployees.Where(r => r.DeliveryId == id && !listOfNewEmployeeId.Contains(r.EmployeeId));
                    foreach (var delEmp in deliveryEmployeesToDelete)
                        _context.DeliveryEmployees.Remove(delEmp);

                    var listOfExistingEmployeeId = _context.DeliveryEmployees.Where(i => i.DeliveryId == id).Select(r => r.EmployeeId);
                    var listOfNewEmployeeIdToAdd = listOfNewEmployeeId.Where(r => !listOfExistingEmployeeId.Contains(r));
                    foreach (var newEmp in listOfNewEmployeeIdToAdd.ToList())
                        _context.DeliveryEmployees.Add(new DeliveryEmployee
                        {
                            DeliveryId = id,
                            EmployeeId = newEmp
                        });
                }
                else
                {
                    var deliveryEmployeesToDelete = _context.DeliveryEmployees.Where(r => delivery.Id == r.DeliveryId);
                    foreach (var delEmp in deliveryEmployeesToDelete)
                        _context.DeliveryEmployees.Remove(delEmp);
                }
            }
            

            //check for null, dont update em
            if (delivery.CarVIN == null)
                _context.Entry(delivery).Property(x => x.CarVIN).IsModified = false;
            if (delivery.ClientID == null)
                _context.Entry(delivery).Property(x => x.ClientID).IsModified = false;
            if (delivery.EntryDate == null)
                _context.Entry(delivery).Property(x => x.EntryDate).IsModified = false;

            if (delivery.FuelSpent == null)
                _context.Entry(delivery).Property(x => x.FuelSpent).IsModified = false;
            if (delivery.FuelType == null)
                _context.Entry(delivery).Property(x => x.FuelType).IsModified = false;
            if (delivery.KmTravelled == null)
                _context.Entry(delivery).Property(x => x.KmTravelled).IsModified = false;
            if (delivery.EntryDate == null)
                _context.Entry(delivery).Property(x => x.EntryDate).IsModified = false;


            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DeliveryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Deliveries
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        //https://localhost:44304/api/Deliveries?employees=1&employees=2&employees=3 
        [Authorize(Roles = Role.Owner + "," + Role.Admin)]
        [HttpPost()]
        public async Task<ActionResult<Delivery>> PostDelivery(Delivery delivery, [FromQuery]int[] employees)
        {     
            _context.Deliveries.Add(delivery);
            foreach (int empIndex in employees)
                _context.DeliveryEmployees.Add(new DeliveryEmployee
                {
                    DeliveryId = delivery.Id,
                    EmployeeId = empIndex
                });

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDelivery", new { id = delivery.Id }, delivery);           
        }

        // DELETE: api/Deliveries/5
        [Authorize(Roles = Role.Owner)]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Delivery>> DeleteDelivery(int id)
        {
            //var delivery = await _context.Deliveries.FindAsync(id);
            var delivery = await _context.Deliveries.Include(i => i.DeliveryEmployees).Include(i => i.Car).FirstOrDefaultAsync(i => i.Id == id);

            if (delivery == null)
            {
                return NotFound();
            }

            _context.Deliveries.Remove(delivery);
            await _context.SaveChangesAsync();

            return delivery;
        }

        private bool DeliveryExists(int id)
        {
            return _context.Deliveries.Any(e => e.Id == id);
        }
    }
}
