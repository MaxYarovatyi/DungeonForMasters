using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using StackExchange.Redis;

namespace Infrastructure.Data
{
    public class UserGameRoomsRepository : IUserGameRoomsRepository
    {
        private readonly IDatabase _database;

        public UserGameRoomsRepository(IConnectionMultiplexer connectionMultiplexer)
        {
            _database = connectionMultiplexer.GetDatabase(1);
        }

        public Task<UserGameRooms> DeleteUserGameRooms()
        {
            throw new NotImplementedException();
        }

        public async Task<UserGameRooms> GetUserGameRooms(string id)
        {
            var data = await _database.StringGetAsync(id);
            return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<UserGameRooms>(data);
        }

        public async Task<UserGameRooms> UpdateUserGameRooms(string id, GameRoom room)
        {
            var data = await GetUserGameRooms(id);
            var gameRooms = data == null ? new List<string>() : data.GameRooms;
            gameRooms.Add(room.Id);
            var updatedGameRooms = new UserGameRooms
            {
                Id = id,
                GameRooms = gameRooms
            };
            var created = await _database.StringSetAsync(id, JsonSerializer.Serialize(updatedGameRooms));
            if (!created) return null;
            return await GetUserGameRooms(id);
        }
    }
}