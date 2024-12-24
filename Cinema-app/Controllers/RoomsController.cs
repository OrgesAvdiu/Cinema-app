using Cinema_app.model;
using Microsoft.AspNetCore.Mvc;
using Cinema_app.Services;

namespace Cinema_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly RoomsService _roomService;

        public RoomsController(RoomsService roomService)
        {
            _roomService = roomService;
        }

        // Add a new room
        [HttpPost]
        public IActionResult AddRoom([FromBody] Room room)
        {
            if (room == null)
            {
                return BadRequest(new { Message = "Room cannot be null" });
            }

            _roomService.Add(room); // Adjusted method name
            return Ok(new { Message = "Room added successfully" });
        }

        // Get all rooms
        [HttpGet]
        public IActionResult GetAllRooms()
        {
            var rooms = _roomService.GetAll(); // Adjusted method name
            return Ok(rooms);
        }

        // Get room by ID
        [HttpGet("{id}")]
        public IActionResult GetRoomById(int id)
        {
            var room = _roomService.GetById(id); // Adjusted method name
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
            if (room == null || id != room.Id)
            {
                return BadRequest(new { Message = "Invalid room data" });
            }

            var existingRoom = _roomService.GetById(id); // Adjusted method name
            if (existingRoom == null)
            {
                return NotFound(new { Message = "Room not found" });
            }

            // Call the Update method
            _roomService.Update(id, room); // Adjusted method name
            return Ok(new { Message = "Room updated successfully" });
        }

        // Delete a room by ID
        [HttpDelete("{id}")]
        public IActionResult DeleteRoom(int id)
        {
            var room = _roomService.GetById(id); // Adjusted method name
            if (room == null)
            {
                return NotFound(new { Message = "Room not found" });
            }
            _roomService.Delete(id); // Adjusted method name
            return Ok(new { Message = "Room deleted successfully" });
        }

        // Get rooms by Cinema ID
        [HttpGet("byCinema/{cinemaId}")]
        public IActionResult GetRoomsByCinemaId(int cinemaId)
        {
            var rooms = _roomService.GetByCinemaId(cinemaId); // Adjusted method name
            return Ok(rooms);
        }

        // Search rooms by features
        [HttpGet("search")]
        public IActionResult SearchRooms([FromQuery] string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm))
            {
                return BadRequest(new { Message = "Search term cannot be empty" });
            }

            var rooms = _roomService.Search(searchTerm); // Adjusted method name
            return Ok(rooms);
        }
    }
}
