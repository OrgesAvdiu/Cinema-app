using Cinema_app.model;
using Cinema_app.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Cinema_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly RoomService _roomService;

        public RoomsController(RoomService roomService)
        {
            _roomService = roomService;
        }

        // Add a new room
        [HttpPost]
        public IActionResult AddRoom([FromBody] Room room)
        {
            _roomService.AddRoom(room);
            return Ok(new { Message = "Room added successfully" });
        }

        // Get all rooms
        [HttpGet]
        public IActionResult GetAllRooms()
        {
            var rooms = _roomService.GetAllRooms();
            return Ok(rooms);
        }

        // Get room by ID
        [HttpGet("{id}")]
        public IActionResult GetRoomById(int id)
        {
            var room = _roomService.GetRoomById(id);
            if (room == null)
            {
                return NotFound(new { Message = "Room not found" });
            }
            return Ok(room);
        }

        // Update a room
        [HttpPut("{id}")]
        public IActionResult UpdateRoom(int id, [FromBody] Room room)
        {
            var existingRoom = _roomService.GetRoomById(id);
            if (existingRoom == null)
            {
                return NotFound(new { Message = "Room not found" });
            }
            room.Id = id; // Ensure the correct ID is used
            _roomService.UpdateRoom(room);
            return Ok(new { Message = "Room updated successfully" });
        }

        // Delete a room by ID
        [HttpDelete("{id}")]
        public IActionResult DeleteRoom(int id)
        {
            var room = _roomService.GetRoomById(id);
            if (room == null)
            {
                return NotFound(new { Message = "Room not found" });
            }
            _roomService.DeleteRoom(id);
            return Ok(new { Message = "Room deleted successfully" });
        }

        // Get rooms by Cinema ID
        [HttpGet("byCinema/{cinemaId}")]
        public IActionResult GetRoomsByCinemaId(int cinemaId)
        {
            var rooms = _roomService.GetRoomsByCinemaId(cinemaId);
            return Ok(rooms);
        }

        // Search rooms by features
        [HttpGet("search")]
        public IActionResult SearchRooms([FromQuery] string searchTerm)
        {
            var rooms = _roomService.SearchRooms(searchTerm);
            return Ok(rooms);
        }
    }
}
