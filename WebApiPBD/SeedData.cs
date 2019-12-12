using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiPBD.Models;
using WebApiPBD.Services;

namespace WebApiPBD
{
    public class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetRequiredService<AppDBContext>();
            context.Database.EnsureCreated();
            if (!context.CarBrands.Any())
            {
                context.CarBrands.Add(new CarBrand
                {
                    Id = 1,
                    Name = "Porsche"
                });
                context.CarBrands.Add(new CarBrand
                {
                    Id = 2,
                    Name = "Fiat"
                });
                context.CarBrands.Add(new CarBrand
                {
                    Id = 3,
                    Name = "Mercedes"
                });
                context.CarBrands.Add(new CarBrand
                {
                    Id = 4,
                    Name = "Ford"
                });
                context.SaveChanges();
            }

            if (!context.Clients.Any())
            {
                context.Clients.Add(new Client
                {
                    Id = 1,
                    Name = "Castorama",
                    Address = "Wrocław ul.Wrocławska 25"
                });
                context.Clients.Add(new Client
                {
                    Id = 2,
                    Name = "Lidl",
                    Address = "Wrocław ul.Lidlowa 111"
                });
                context.SaveChanges();
            }

            if (!context.Cars.Any())
            {
                context.Cars.Add(new Car
                {
                    VIN = "123abc",
                    BrandID = 1,
                    Model = "Panamera",
                    Registration = "adgfxhbjnk1234"
                });
                context.Cars.Add(new Car
                {
                    VIN = "124abc",
                    BrandID = 2,
                    Model = "Duo",
                    Registration = "5g5g55g5g555"
                });
                context.Cars.Add(new Car
                {
                    VIN = "125abc",
                    BrandID = 3,
                    Model = "Uno",
                    Registration = "123456"
                });

                context.SaveChanges();
            }

            if (!context.Employees.Any())
            {
                context.Employees.Add(new Employee
                {
                    PESEL = "12341212345",
                    Forename = "Adrian",
                    Surname = "Głowacki"
                });
                context.Employees.Add(new Employee
                {
                    PESEL = "14324545678",
                    Forename = "Adrianna",
                    Surname = "Kowalska"
                });
                context.Employees.Add(new Employee
                {
                    PESEL = "23432145678",
                    Forename = "Zbigniew",
                    Surname = "Wierzbicki"
                });

                context.SaveChanges();
            }

            if (!context.Users.Any())
            {
                byte[] passwordHash, passwordSalt;
                UserService.CreatePasswordHash("ownerPassword", out passwordHash, out passwordSalt);
                context.Users.Add(new User
                {
                    Forename = "OwnerName",
                    Surname = "Owner",
                    Username = "owner",
                    PasswordHash = passwordHash,
                    PasswordSalt = passwordSalt,
                    Role = Role.Owner,
                    Token = null
                });
                context.SaveChanges();
            }
        }
    }
}
