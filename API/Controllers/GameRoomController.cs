using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Core.Entities;

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
    }
}