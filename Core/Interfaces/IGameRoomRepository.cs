using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IGameRoomRepository
    {
        Task<GameRoom> GetGameRoomAsync(string id);
        Task<GameRoom> UpdateGameRoomAsync(GameRoom room);
        Task<bool> DeleteGameRoomAsync(string id);
    }
}