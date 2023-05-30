using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserGameRoomsController : BaseApiController
    {
        private readonly IUserGameRoomsRepository _repo;

        public UserGameRoomsController(IUserGameRoomsRepository repository)
        {
            _repo = repository;
        }

        [HttpGet]
        public async Task<ActionResult<UserGameRooms>> GetUserGameRooms(string id)
        {
            var gamerooms = await _repo.GetUserGameRooms(id);
            return gamerooms ?? new UserGameRooms(id);
        }

        [HttpPost]
        public async Task<ActionResult<UserGameRooms>> UpdateUserGameRooms(string id, GameRoom gameRoom)
        {
            return await _repo.UpdateUserGameRooms(id, gameRoom);
        }
    }
}