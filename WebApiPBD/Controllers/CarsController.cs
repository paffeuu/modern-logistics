﻿using System;
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
    public class CarsController : ControllerBase
    {
        private readonly AppDBContext _context;

        public CarsController(AppDBContext context)
        {
            _context = context;
        }

        // GET: api/Cars
        //[Authorize(Roles = Role.Owner)]
        [HttpGet]        
        public async Task<ActionResult<IEnumerable<Car>>> GetCars()
        {
            //return await _context.Cars.ToListAsync();
            return await _context.Cars.Include(e => e.Brand).ToListAsync();
        }

        // GET: api/Cars/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> GetCar(string id)
        {
            //var car = await _context.Cars.FindAsync(id);
            var car = await _context.Cars.Include(i => i.Brand).FirstOrDefaultAsync(i => i.VIN == id);

            if (car == null)
            {
                return NotFound();
            }

            return car;
        }

        // PUT: api/Cars/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [Authorize(Roles = Role.Owner + "," + Role.Admin)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCar(string id, Car car)
        {
            if (id != car.VIN)
            {
                return BadRequest();
            }

            _context.Entry(car).State = EntityState.Modified;

            if (car.Registration == null)
                _context.Entry(car).Property(x => x.Registration).IsModified = false;
            if (car.BrandID == null)
                _context.Entry(car).Property(x => x.BrandID).IsModified = false;
            if (car.Model == null)
                _context.Entry(car).Property(x => x.Model).IsModified = false;


            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarExists(id))
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

        // POST: api/Cars
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [Authorize(Roles = Role.Owner + "," + Role.Admin)]
        [HttpPost]
        public async Task<ActionResult<Car>> PostCar(Car car)
        {
            _context.Cars.Add(car);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CarExists(car.VIN))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCar", new { id = car.VIN }, car);
        }

        // DELETE: api/Cars/5
        [Authorize(Roles = Role.Owner)]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Car>> DeleteCar(string id)
        {
            //var car = await _context.Cars.FindAsync(id);
            var car = await _context.Cars.Include(i => i.Brand).FirstOrDefaultAsync(i => i.VIN == id);
            var delivery = await _context.Deliveries.FirstOrDefaultAsync(i => i.CarVIN == id);
            if(delivery != null)
                delivery.CarVIN = null;

            if (car == null)
            {
                return NotFound();
            }

            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();

            return car;
        }

        private bool CarExists(string id)
        {
            return _context.Cars.Any(e => e.VIN == id);
        }
    }
}
