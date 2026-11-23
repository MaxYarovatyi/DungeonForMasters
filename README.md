# Dungeon for Masters

Early learning project (2023): a web app for tabletop role-playing games in the style of Dungeons & Dragons. Players create character sheets and join game rooms run by a game master.

## Features
- Registration and JWT authentication (ASP.NET Core Identity)
- Character sheets with races, classes, ability scores, skills and modifiers (seeded from JSON)
- Game rooms: create a password-protected room, add character sheets to it, list a user's rooms and sheets
- Game rooms are stored in Redis, character data in SQLite

## Architecture
| Project | Role |
|---|---|
| `Core` | Entities and interfaces; Specification pattern for queries |
| `Infrastructure` | EF Core (SQLite) with a generic repository, Redis repositories, seed data |
| `API` | ASP.NET Core Web API, AutoMapper DTOs, Identity |
| `client` | Angular 15 front end |

## Running
Requires the .NET 6 SDK, Node.js and a Redis instance on `localhost:6379` (e.g. `docker run -d -p 6379:6379 redis`).
```
dotnet run --project API             # https://localhost:5001
cd client && npm install && npx ng serve
```

## Tech stack
C#, .NET 6, ASP.NET Core Web API, EF Core (SQLite), Redis, AutoMapper, Angular 15, TypeScript.
