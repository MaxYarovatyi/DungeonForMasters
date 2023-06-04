using Core.Entities;
namespace Core.Interfaces
{
    public interface ISheetService
    {
        Task<CharacterSheet> CreateCharacterSheetAsync(CharacterSheet sheet);
    }
}