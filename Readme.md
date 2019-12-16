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


PUT REQUESTS

4. Delivery
https://localhost:44304/api/Deliveries/id

{
  "id": 1,
  "carvin": "12311asd",
  "entrydate":"2016-01-01T00:00:00.0000000-00:00",
  "fuelspent":1200,
  "fueltype":0,
  "kmtravelled": 12500,
  "clientid": 2,
  "deliveryEmployees": [{"deliveryId": 1, "employeeId": 3}, {"deliveryId": 1, "employeeId": 2}, {"deliveryId": 1, "employeeId": 1}]
}


AUTHORIZATION

Roles = {User, Admin, Owner}

there is already seeded owner User

					Forename = "OwnerName",
                    Surname = "Owner",
                    Username = "owner",
                    Role = Role.Owner,

REGISTER USER
https://localhost:5001/users/registerUser			(RegisterModel)
{
    "surname": "userSurname",
    "forename": "userForename",
    "username": "username",
    "password": "passwordddd"
}

REGISTER ADMIN (only authorized owner can do that)	(RegisterModel)
https://localhost:5001/users/registerAdmin
{
    "surname": "userSurname",
    "forename": "userForename",
    "username": "username",
    "password": "passwordddd"
}

AUTHENTICATION
https://localhost:5001/users/authenticate			(AuthenticateModel)
{
    "username": "admin1",
    "password": "admin1Password"
}

	this request will return smth like that,
	use that token to authorize later on


	{
    "id": 3,
    "username": "admin1",
    "firstName": "AdminForename",
    "lastName": "AdminSurname",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjMiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE1NzU5Mjk5MjcsImV4cCI6MTU3NjUzNDcyNywiaWF0IjoxNTc1OTI5OTI3fQ.jLWAx9gVVFIL3TnKVz_ZfeFVw30HTroLyetvSJcVjIc"
	}
	

GET USERS (only authorized, any role)
https://localhost:5001/users						(UserModel)
