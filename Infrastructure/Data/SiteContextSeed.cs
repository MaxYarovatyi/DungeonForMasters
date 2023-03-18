using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
    public class SiteContextSeed
    {
        public static async Task SeedAsync(SiteContext context, ILoggerFactory factory)
        {
            try
            {
                if (!context.CharacterRaces.Any())
                {
                    var racesData = File.ReadAllText("../Infrastructure/Data/SeedData/races.json");
                    var races = JsonSerializer.Deserialize<List<CharacterRace>>(racesData);

                    foreach (var item in races)
                    {
                        context.CharacterRaces.Add(item);
                    }
                    await context.SaveChangesAsync();
                }
                if (!context.CharacterClasses.Any())
                {
                    var classesData = File.ReadAllText("../Infrastructure/Data/SeedData/classes.json");
                    var classes = JsonSerializer.Deserialize<List<CharacterClass>>(classesData);

                    foreach (var item in classes)
                    {
                        context.CharacterClasses.Add(item);
                    }
                    await context.SaveChangesAsync();
                }
                if (!context.CharacterSheets.Any())
                {
                    context.CharacterSheets.Add(new CharacterSheet
                    {
                        CharName = "Albek",
                        PlayerName = "Max",
                        Alignment = "Chaotic Evil",
                        CharClassId = 2,
                        CharRaceId = 3
                    });
                }
            }
            catch (Exception ex)
            {
                var logger = factory.CreateLogger<SiteContextSeed>();
                logger.LogError(ex.Message);
            }
        }
    }
}