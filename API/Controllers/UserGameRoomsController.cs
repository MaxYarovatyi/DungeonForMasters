using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Core.Entities;
using Core.Interfaces;

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
            return await _repo.GetUserGameRooms(id);
        }
        [HttpPost]
        public async Task<ActionResult<UserGameRooms>> UpdateUserGameRooms(UserGameRooms gameRooms)
        {
            return await _repo.UpdateUserGameRooms(gameRooms);
        }
    }
}