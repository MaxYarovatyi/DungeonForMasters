using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class UserGameRooms
    {
        public UserGameRooms()
        {
        }

        public UserGameRooms(string id)
        {
            Id = id;
        }

        public string Id { get; set; }
        public List<GameRoom> GameRooms { get; set; } = new List<GameRoom>();
        public List<CharacterSheet> Sheets { get; set; } = new List<CharacterSheet>();
    }
}