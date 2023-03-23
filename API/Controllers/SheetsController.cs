using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SheetsController : BaseApiController
    {
        private readonly ISheetRepository _repo;

        public SheetsController(ISheetRepository repository
        )
        {
            _repo = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<CharacterSheet>>> GetSheets()
        {
            return Ok(await _repo.GetCharacterSheetsAsync());
        }

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

    }
}