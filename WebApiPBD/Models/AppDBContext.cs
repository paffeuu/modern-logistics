using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiPBD.Models
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DeliveryEmployee>().HasKey(x => new { x.DeliveryId, x.EmployeeId });//composite key

            modelBuilder.Entity<DeliveryEmployee>()
                .HasOne(x => x.Delivery)
                .WithMany(m => m.DeliveryEmployees)
                .HasForeignKey(x => x.DeliveryId);
            modelBuilder.Entity<DeliveryEmployee>()
                .HasOne(x => x.Employee)
                .WithMany(m => m.DeliveryEmployees)
                .HasForeignKey(x => x.EmployeeId);//many to many

            //to navigate use select
            //var photos = person.PersonPhotos.Select(c => c.Photo);
            //https://stackoverflow.com/questions/29442493/how-to-create-a-many-to-many-relationship-with-latest-nightly-builds-of-ef-core

            /*modelBuilder.Entity<Client>()
                .HasMany(c => c.Deliveries)
                .WithOne(e => e.Client);//one to many*/
        }

        public DbSet<CarBrand> CarBrands { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<Delivery> Deliveries { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<DeliveryEmployee> DeliveryEmployees { get; set; } 
    }
}
