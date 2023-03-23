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
                if (!context.AbilityScores.Any())
                {
                    var scoresData = File.ReadAllText("../Infrastructure/Data/SeedData/abilityScores.json");
                    var scores = JsonSerializer.Deserialize<List<AbilityScores>>(scoresData);

                    foreach (var item in scores)
                    {
                        context.AbilityScores.Add(item);
                    }
                    await context.SaveChangesAsync();
                }
                if (!context.CharacterSkills.Any())
                {
                    var skillsData = File.ReadAllText("../Infrastructure/Data/SeedData/skills.json");
                    var skills = JsonSerializer.Deserialize<List<SkillList>>(skillsData);

                    foreach (var item in skills)
                    {
                        context.CharacterSkills.Add(item);
                    }
                    await context.SaveChangesAsync();
                }
                if (!context.Modificators.Any())
                {
                    var modificatorsData = File.ReadAllText("../Infrastructure/Data/SeedData/modificators.json");
                    var modificators = JsonSerializer.Deserialize<List<Modificators>>(modificatorsData);

                    foreach (var item in modificators)
                    {
                        context.Modificators.Add(item);
                    }
                    await context.SaveChangesAsync();
                }
                if (!context.CharacterSheets.Any())
                {
                    var sheetsData = File.ReadAllText("../Infrastructure/Data/SeedData/sheets.json");
                    var sheets = JsonSerializer.Deserialize<List<CharacterSheet>>(sheetsData);

                    foreach (var item in sheets)
                    {
                        context.CharacterSheets.Add(item);
                    }
                    // context.CharacterSheets.Add(new CharacterSheet{
                    //     CharName="Albek",
                    //     CharClassId=1,
                    //     CharRaceId=1,
                    //     CurrentHitPoints=10,
                    //     MaxHitPoints=10,
                    //     PlayerName="Max",
                    //     ModificatorsId =1,
                    //     SkillsId=1,
                    // });
                    await context.SaveChangesAsync();
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