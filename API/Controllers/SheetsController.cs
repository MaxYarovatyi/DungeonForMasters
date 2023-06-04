using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Extensions;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SheetsController : BaseApiController
    {
        private readonly ISheetRepository _repo;
        private readonly ISheetService _service;
        private readonly IMapper _mapper;

        public SheetsController(ISheetRepository repository, ISheetService service, IMapper mapper
        )
        {
            _repo = repository;
            _service = service;
            _mapper = mapper;

        }

        // [HttpGet]
        // public async Task<ActionResult<IReadOnlyList<CharacterSheet>>> GetSheets()
        // {
        //     return Ok(await _repo.GetCharacterSheetsAsync());
        // }

        [HttpGet("{id}")]
        public async Task<ActionResult<CharacterSheet>> GetSheetById(int id)
        {
            return Ok(await _repo.GetCharacterSheetByIdAsync(id));
        }


        [HttpGet("races")]
        public async Task<ActionResult<IReadOnlyList<CharacterRace>>> GetRaces()
        {
            return Ok(await _repo.GetCharacterRacesAsync());
        }



        [HttpGet("classes")]
        public async Task<ActionResult<IReadOnlyList<CharacterClass>>> GetCLasses()
        {
            return Ok(await _repo.GetCharacterClassesAsync());
        }
        [HttpPost]
        public async Task<ActionResult<object>> CreateSheetAsync(CharacterSheetDto sheetDto)
        {
            var email = User.RetrieveEmailFromPrincipal();
            var skills = _mapper.Map<SkillsDto, SkillList>(sheetDto.Skills);
            var modificators = _mapper.Map<ModificatorsDto, Modificators>(sheetDto.Modificators);
            var abilityScores = _mapper.Map<AbilityScoresDto, AbilityScores>(sheetDto.AbilityScores);
            var createdSkills = await _repo.CreateSkillsAsync(skills);
            var createdModificators = await _repo.CreateModificatorsAsync(modificators);
            var createdAbilityScores = await _repo.CreateAbilityScoresAsync(abilityScores);
            var charClass = await _repo.FindCharClass(sheetDto.CharClass);
            var charRace = await _repo.FindCharRace(sheetDto.CharRace);
            var sheet = new CharacterSheet
            {
                CharName = sheetDto.CharName,
                Level = sheetDto.Level,
                CharClass = charClass,
                CharClassId = charClass.Id,
                CharRace = charRace,
                CharRaceId = charRace.Id,
                ArmorClass = sheetDto.ArmorClass,
                PlayerName = sheetDto.PlayerName,
                ExpiriencePoints = sheetDto.ExpiriencePoints,
                Initiative = sheetDto.Initiative,
                Speed = sheetDto.Speed,
                AbilityScores = createdAbilityScores,
                AbilityScoresId = createdAbilityScores.Id,
                Skills = createdSkills,
                SkillsId = createdSkills.Id,
                Background = sheetDto.Background,
                Alignment = sheetDto.Alignment,
                CurrentHitPoints = sheetDto.CurrentHitPoints,
                MaxHitPoints = sheetDto.MaxHitPoints,
                Modificators = createdModificators,
                ModificatorsId = createdModificators.Id
            };
            var createdSheet = await _repo.CreateCharacterSheetAsync(sheet);
            return Ok(sheet);

        }
    }
}