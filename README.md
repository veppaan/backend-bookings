**Vera Kippel veki2400**

Ett API byggt med express. 
API:et hanterar bokningar för företaget Voff-Truck

Tabellens namn heter "bookings" som skapats med hjälp av MongoDB och mongoose.
Tabellens innehåll:
- _id
- starter(string)
- mainCourse(string)
- dessert(string)
- customer {firstname(string), lastname(string), number(string)}
- created(Date)


Användning:

|Metod | Ändpunkt | Beskrivning |
-------|----------|-------------|
|GET | "/" | Visar ett välkomstmeddelande|
|GET | "/bookings" | Hämta alla lagrade bokningar|
|POST| "/bookings" | Lägg till en bokning |
|DELETE | "/bookings/:id" | Radera en bokning med angivet id|

Bokningens JSON-struktur kan se ut såhär:
```json
{
    "starter": "Morotsbitar",
    "mainCourse": "Paj",
    "dessert": "Blåbärsglass",
    "customer" {
        "firstname": "Vera",
        "lastname": "Kippel",
        "number": "070123123"
    }
}