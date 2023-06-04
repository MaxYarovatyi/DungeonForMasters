using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<SkillsDto, SkillList>().ForMember(d => d.Id, o => o.AllowNull());
            CreateMap<ModificatorsDto, Modificators>().ForMember(d => d.Id, o => o.AllowNull());
            CreateMap<AbilityScoresDto, AbilityScores>().ForMember(d => d.Id, o => o.AllowNull());
            CreateMap<CharacterSheetDto, CharacterSheet>().ForMember(d => d.CharClass, o => o.MapFrom(s => new CharacterClass { Name = s.CharClass })).ForAllMembers(o => o.AllowNull());
        }
    }
}