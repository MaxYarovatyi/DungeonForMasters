using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class SheetRepository : ISheetRepository
    {
        private SiteContext _context;

        public SheetRepository(SiteContext context)
        {
            _context = context;
        }
        public async Task<CharacterSheet> GetCharacterSheetByIdAsync(int id)
        {
            return await _context.CharacterSheets.Include(p => p.AbilityScores)
            .Include(p => p.CharClass)
            .Include(p => p.CharRace)
            .Include(p => p.Modificators)
            .Include(p => p.Skills)
            .FirstOrDefaultAsync(p => p.Id == id);
        }
        public async Task<IReadOnlyList<CharacterSheet>> GetCharacterSheetsAsync()
        {
            return await _context.CharacterSheets
            .Include(p => p.AbilityScores)
            .Include(p => p.CharClass)
            .Include(p => p.CharRace)
            .Include(p => p.Modificators)
            .Include(p => p.Skills).ToListAsync();
            ;
        }

        public async Task<IReadOnlyList<CharacterClass>> GetCharacterClassesAsync()
        {

            return await _context.CharacterClasses.ToListAsync();
        }

        public async Task<IReadOnlyList<CharacterRace>> GetCharacterRacesAsync()
        {
            return await _context.CharacterRaces.ToListAsync();
        }
        public async Task<CharacterSheet> CreateCharacterSheetAsync(CharacterSheet sheet)
        {
            var result = await _context.CharacterSheets.AddAsync(sheet);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<AbilityScores> CreateAbilityScoresAsync(AbilityScores scores)
        {

            var result = await _context.AbilityScores.AddAsync(scores);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<Modificators> CreateModificatorsAsync(Modificators modificators)
        {
            var result = await _context.Modificators.AddAsync(modificators);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<SkillList> CreateSkillsAsync(SkillList skills)
        {
            var result = await _context.CharacterSkills.AddAsync(skills);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<CharacterClass> FindCharClass(string charClass)
        {
            return await _context.CharacterClasses.Where(e => e.Name == charClass).FirstOrDefaultAsync();
        }
        public async Task<CharacterRace> FindCharRace(string charRace)
        {
            return await _context.CharacterRaces.Where(e => e.Name == charRace).FirstOrDefaultAsync();
        }
    }
}