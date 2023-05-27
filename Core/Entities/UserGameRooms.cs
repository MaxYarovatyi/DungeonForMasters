using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class UserGameRooms
    {
        public string Id { get; set; }
        public List<GameRoom> GameRooms { get; set; }
    }
}