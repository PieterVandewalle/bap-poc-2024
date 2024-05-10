# 2324-bachelorproef-poc

Deze repository bevat twee implementaties:
- **Traditionele implementatie**: de validatie van klantgegevens en berekening van verzendingskosten wordt zowel in de frontend als backend geïmplementeerd
- **WASM Bootsharp implementatie**: de frontend gebruikt de bedrijfslogica geschreven in de backend d.m.v. Bootsharp en WebAssembly

## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- [.NET 8](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- .NET WebAssembly tooling:  kan geinstalleerd worden met het `dotnet workload install wasm-tools` commando.

## ⚙️ Uitvoeren van de projecten

### React NextJS frontend
Maak een **.env** bestand in de root van het project met volgende inhoud:
```
NEXT_PUBLIC_API_URL='http://localhost:5000/api'
````
Bij de WASM Bootsharp implementatie compileer je eerst het WebAssembly project met `npm run backend`. Dit hoef je niet te doen bij de traditionele implementatie.

Installeer de dependencies met `npm install`

Daarna kan het project gestart worden met `npm run dev`

### ASP.NET Core backend
Plaats in **appsettings.json** de connection string voor de SQL Server databank:
```
  "ConnectionStrings": {
    "SqlServer": "SQL_SERVER_CONNECTION_STRING"
  },
````
Voer daarna het Server project uit met het `dotnet run` commando.

