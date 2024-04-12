# Stripe Project - Pontus

## Dependencies
    server is made out of nodejs express, third party api thats been used is stripe. we are using bcrypt for encryption, cookie session for storing user sessions. cors for cross origin and dotenv.

### CheckList
1. [x]Produkter ska listas på en sida. 
2. [x]Produkter som visas och köps skall hämtas ifrån Stripe.
3. []Det ska gå att lägga till produkter i en kundvagn.
4. []Baserad på kundvagnen skall det gå att lägga en order genom Stripe.
5. []Man skall kunna registrera sig som en användare i webbshoppen. 
    Detta skall resultera i att en ”Customer” skapas i Stripe och användaren sparas i en JSON-fil. 
    (samtliga lösenord skall sparas krypterade).
6. []Man skall kunna logga in som kund. 
    Den inloggade kunden (som även är sparad i Stripe) skall användas vid placering av order.
7. []Man skall inte kunna placera en order om man inte är inloggad.
8. []Samtliga placerade ordrar skall sparas till en lista i en JSON-fil.
9. []Ordern får inte under några omständigheter sparas utan genomförd betalning! 
    (dvs. Spara aldrig ett orderobjekt såvida ni inte fått bekräftelse tillbaka ifrån stripe att betalningen gått igenom)