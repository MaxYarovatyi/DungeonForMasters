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

    }
}