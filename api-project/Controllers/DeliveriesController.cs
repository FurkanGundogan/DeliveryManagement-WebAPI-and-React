using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DeliveryDBNew.Models;

namespace DeliveryDBNew.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveriesController : ControllerBase
    {
        private readonly MyDeliveryDBContext _context;

        public DeliveriesController(MyDeliveryDBContext context)
        {
            _context = context;
        }

        // GET: api/Deliveries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Delivery>>> GetDeliveries()
        {
            return await _context.Deliveries.Include(d => d.Customer).Include(d => d.DeliveryItems)
                .Include(d => d.Status).ToListAsync();
        }

        // GET: api/Deliveries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Delivery>> GetDelivery(int id)
        {
            var products = await _context.DeliveryItems.Include(c => c.Product).
                Where(c => c.DeliveryId == id).ToListAsync(); 


            var delivery = await _context.Deliveries.Include(c => c.Customer)
                .Include(c => c.Status)
                .Where(c => c.DeliveryId == id).FirstOrDefaultAsync();

            delivery.DeliveryItems = products;
            
            if (delivery == null)
            {
                return NotFound();
            }

            return delivery;
        }

        // PUT: api/Deliveries/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDelivery(int id, Delivery delivery)
        {
            if (ModelState.IsValid)
            {

                if (id != delivery.DeliveryId)
                {
                    return BadRequest();
                }

                _context.Entry(delivery).State = EntityState.Modified;

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
            else
            {
                return BadRequest(ModelState);
            }
        }

        // POST: api/Deliveries
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Delivery>> PostDelivery(Delivery delivery)
        {
            if (ModelState.IsValid)
            {
                _context.Deliveries.Add(delivery);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetDelivery", new { id = delivery.DeliveryId }, delivery);
            }
            else
            {
                return BadRequest(ModelState);
            }

        }

        // DELETE: api/Deliveries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDelivery(int id)
        {
            
            var delivery = await _context.Deliveries.Include(c => c.DeliveryItems)
                .Where(c => c.DeliveryId == id).FirstOrDefaultAsync();
            if (delivery == null)
            {
                return NotFound();
            }

            _context.Deliveries.Remove(delivery);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DeliveryExists(int id)
        {
            return _context.Deliveries.Any(e => e.DeliveryId == id);
        }
    }
}
