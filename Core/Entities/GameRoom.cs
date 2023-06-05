using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;

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
        public string Password { get; set; }
        public string MastersId { get; set; }
        public List<int> Sheets { get; set; } = new List<int>();
    }
}