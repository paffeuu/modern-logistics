.exe path: WebApiPBD\bin\Release\netcoreapp3.0\win-x64\WebApiPBD.exe

TABLES

Car
CarBrand
Client
Delivery
DeliveryEmployee (association table)
Employee

POST REQUESTS

1. Car

https://localhost:5001/api/Cars

{
  "vin": "1b",
  "brandid":1,
  "model":"Carrera",
  "registration": "abcdef"
}

2. CarBrand

https://localhost:5001/api/CarBrands

{
  "name": "Mazda"
}

3. Client

https://localhost:5001/api/Clients

{
  "name": "Janusz Spedycja SP ZOO",
  "address": "Zb¹szynek"
}

4. Delivery

https://localhost:5001/api/Deliveries?int[] employees
np
https://localhost:5001/api/Deliveries?employees=1&employees=2&employees=3 

{
  "carvin": "12311asd",
  "entrydate":"2016-01-01T00:00:00.0000000-00:00",
  "fuelspent":12,
  "fueltype":0,
  "kmtravelled": 12500,
  "clientid": 2
}

5. Employee

https://localhost:5001/api/Employees

{
  "pesel": "12341212345",
  "forename":"Janusz",
  "surname":"Kowal"
}



GET REQUESTS

1. Car

https://localhost:5001/api/Cars					(all records)
https://localhost:5001/api/Cars/vin				(one record)
vin -> string

2. CarBrand

https://localhost:5001/api/CarBrands				(all records)
https://localhost:5001/api/CarBrands/id				(one record)

3. Client

https://localhost:5001/api/Clients				(all records)
https://localhost:5001/api/Clients/id				(one record)

4. Delivery

https://localhost:5001/api/Deliveries				(all records)
https://localhost:5001/api/Deliveries/id			(one record)

5. Employee

https://localhost:5001/api/Employees				(all records)
https://localhost:5001/api/Employees/id				(one record)



DELETE REQUEST 
1. Car

https://localhost:5001/api/Cars/vin				
vin -> string

2. CarBrand

https://localhost:5001/api/CarBrands/id			

3. Client

https://localhost:5001/api/Clients/id				

4. Delivery

https://localhost:5001/api/Deliveries/id			

5. Employee

https://localhost:5001/api/Employees/id	



PUT REQUEST 
----TO BE DONE----		