using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApiPBD.Models;

namespace WebApiPBD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryEmployeesController : ControllerBase
    {
        private readonly AppDBContext _context;

        public DeliveryEmployeesController(AppDBContext context)
        {
            _context = context;
        }

        // GET: api/DeliveryEmployees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeliveryEmployee>>> GetDeliveryEmployees()
        {
            return await _context.DeliveryEmployees.ToListAsync();
        }

        // GET: api/DeliveryEmployees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DeliveryEmployee>> GetDeliveryEmployee(int id)
        {
            var deliveryEmployee = await _context.DeliveryEmployees.FindAsync(id);

            if (deliveryEmployee == null)
            {
                return NotFound();
            }

            return deliveryEmployee;
        }

        // PUT: api/DeliveryEmployees/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDeliveryEmployee(int id, DeliveryEmployee deliveryEmployee)
        {
            if (id != deliveryEmployee.DeliveryId)
            {
                return BadRequest();
            }

            _context.Entry(deliveryEmployee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DeliveryEmployeeExists(id))
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

        // POST: api/DeliveryEmployees
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<DeliveryEmployee>> PostDeliveryEmployee(DeliveryEmployee deliveryEmployee)
        {
            _context.DeliveryEmployees.Add(deliveryEmployee);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (DeliveryEmployeeExists(deliveryEmployee.DeliveryId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetDeliveryEmployee", new { id = deliveryEmployee.DeliveryId }, deliveryEmployee);
        }

        // DELETE: api/DeliveryEmployees/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DeliveryEmployee>> DeleteDeliveryEmployee(int id)
        {
            var deliveryEmployee = await _context.DeliveryEmployees.FindAsync(id);
            if (deliveryEmployee == null)
            {
                return NotFound();
            }

            _context.DeliveryEmployees.Remove(deliveryEmployee);
            await _context.SaveChangesAsync();

            return deliveryEmployee;
        }

        private bool DeliveryEmployeeExists(int id)
        {
            return _context.DeliveryEmployees.Any(e => e.DeliveryId == id);
        }
    }
}
