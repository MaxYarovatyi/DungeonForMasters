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
    public class GameRoomRepository : IGameRoomRepository
    {
        private readonly IDatabase _database;
        public GameRoomRepository(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }

        public async Task<bool> DeleteGameRoomAsync(string id)
        {
            return await _database.KeyDeleteAsync(id);
        }

        public async Task<GameRoom> GetGameRoomAsync(string id)
        {
            var data = await _database.StringGetAsync(id);
            return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<GameRoom>(data);
        }

        public async Task<GameRoom> UpdateGameRoomAsync(GameRoom room)
        {
            var created = await _database.StringSetAsync(room.Id, JsonSerializer.Serialize(room), TimeSpan.FromDays(60));
            if (!created) return null;
            return await GetGameRoomAsync(room.Id);
        }
    }
}