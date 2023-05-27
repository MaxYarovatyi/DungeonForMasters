using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Core.Entities;
using System.Security.Cryptography;

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
        public static string HashPassword(string password)
        {
            byte[] salt;
            byte[] buffer2;
            if (password == null)
            {
                throw new ArgumentNullException("password");
            }
            using (Rfc2898DeriveBytes bytes = new Rfc2898DeriveBytes(password, 0x10, 0x3e8))
            {
                salt = bytes.Salt;
                buffer2 = bytes.GetBytes(0x20);
            }
            byte[] dst = new byte[0x31];
            Buffer.BlockCopy(salt, 0, dst, 1, 0x10);
            Buffer.BlockCopy(buffer2, 0, dst, 0x11, 0x20);
            return Convert.ToBase64String(dst);
        }
    }
}