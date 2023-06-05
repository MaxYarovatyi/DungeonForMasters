using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Core.Entities;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{

    public class GameRoomController : BaseApiController
    {
        private readonly IGameRoomRepository _gameRoomRepository;
        public GameRoomController(IGameRoomRepository gameRoomRepository)
        {
            _gameRoomRepository = gameRoomRepository;
        }
        [HttpGet]
        public async Task<ActionResult<GameRoom>> GetGameRoomById(string id)
        {
            var gameroom = await _gameRoomRepository.GetGameRoomAsync(id);
            return Ok(gameroom ?? new GameRoom(id));
        }
        [HttpPost]

        public async Task<ActionResult<GameRoom>> UpdateGameRoom(GameRoom gameRoom)
        {
            var password = gameRoom.Password;
            var hashedPassword = HashPassword(password);
            gameRoom.Password = hashedPassword;
            var updatedGameRoom = await _gameRoomRepository.UpdateGameRoomAsync(gameRoom);
            return Ok(updatedGameRoom);
        }

        [HttpDelete]
        public async Task DeleteGameRoomAsync(string id)
        {
            await _gameRoomRepository.DeleteGameRoomAsync(id);
        }
        [HttpGet("name_exists")]
        public async Task<ActionResult<bool>> CheckNameExists(string id)
        {
            var gameroom = await _gameRoomRepository.GetGameRoomAsync(id);
            return gameroom != null ? true : false;
        }
        [HttpPost("addSheetToGameRoom")]
        public async Task<ActionResult<GameRoom>> AddSheetToGameRoom(string id, CharacterSheet sheet)
        {
            var gameRoom = await _gameRoomRepository.AddSheetToGameRoom(id, sheet);
            return gameRoom;
        }
        [HttpGet("checkPassword")]
        public async Task<ActionResult<bool>> CheckPassword(string id, string password)
        {
            var gameRoom = await _gameRoomRepository.GetGameRoomAsync(id);
            return gameRoom.Password == HashPassword(password);
        }
        public static string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                // Send a sample text to hash.  
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                // Get the hashed string.  
                var hash = BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
                // Print the string.   
                return hash;
            }

        }

    }
}