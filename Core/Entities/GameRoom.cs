using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class GameRoom
    {
        public GameRoom()
        {
        }

        public GameRoom(string id)
        {
            Id = id;
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public List<CharacterSheet> Sheets { get; set; } = new List<CharacterSheet>();
    }
}