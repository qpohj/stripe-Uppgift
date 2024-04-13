# Stripe Project - Pontus

### Dependencies
    server is made out of nodejs express, third party api thats been used is stripe. we are using bcrypt for encryption, cookie session for storing user sessions. cors for cross origin and dotenv.

### CheckList
- [x] Produkter ska listas på en sida. 
- [x] Produkter som visas och köps skall hämtas ifrån Stripe.
- [x] Det ska gå att lägga till produkter i en kundvagn.
- [ ] Baserad på kundvagnen skall det gå att lägga en order genom Stripe.
- [ ] Man skall kunna registrera sig som en användare i webbshoppen. Detta skall resultera i att en ”Customer” skapas i Stripe och användaren sparas i en JSON-fil. (samtliga lösenord skall sparas krypterade).
- [ ] Man skall kunna logga in som kund. Den inloggade kunden (som även är sparad i Stripe) skall användas vid placering av order.
- [ ] Man skall inte kunna placera en order om man inte är inloggad.
- [ ] Samtliga placerade ordrar skall sparas till en lista i en JSON-fil.
- [ ] Ordern får inte under några omständigheter sparas utan genomförd betalning! (dvs. Spara aldrig ett orderobjekt såvida ni inte fått bekräftelse tillbaka ifrån stripe att betalningen gått igenom)