using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IUserGameRoomsRepository
    {
        Task<UserGameRooms> UpdateUserGameRooms(string id, GameRoom room);
        Task<UserGameRooms> GetUserGameRooms(string id);
        Task<UserGameRooms> DeleteUserGameRooms();
    }
}