using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Core.Specifications;


namespace Infrastructure.Services
{
    public class SheetService : ISheetService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ISheetRepository _repo;

        public SheetService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<CharacterSheet> CreateCharacterSheetAsync(CharacterSheet sheet)
        {
            var spec = new CharacterSheetWithClassAndRaceSpecification(1);

            return await _unitOfWork.Repository<CharacterSheet>().GetEntityWithSpec(spec);
        }
    }
}