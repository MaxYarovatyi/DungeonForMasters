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

        public async Task<UserGameRooms> UpdateUserGameRooms(UserGameRooms gameRooms)
        {
            var gamerooms = await _database.StringSetAsync(gameRooms.Id, JsonSerializer.Serialize(gameRooms));
            return await GetUserGameRooms(gameRooms.Id);
        }
    }
}