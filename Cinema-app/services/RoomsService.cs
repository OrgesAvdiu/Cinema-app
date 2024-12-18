using CinemaApp.Models;
using Cinema_app.model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Cinema_app.Interface; 


namespace Cinema_app.Interface
{
    public class RoomsService : IRoomsService
    {
        private readonly CinemaDbContext _context;

        public RoomsService(CinemaDbContext context)
        {
            _context = context;
        }

        // Add a new room
        public void AddRoom(Room room)
        {
            _context.Rooms.Add(room);
            _context.SaveChanges();
        }

        // Get all rooms
        public List<Room> GetAllRooms()
        {
            return _context.Rooms.Include(r => r.Cinema).ToList();
        }

        // Get room by ID
        public Room GetRoomById(int id)
        {
            return _context.Rooms.Include(r => r.Cinema).FirstOrDefault(r => r.Id == id);
        }

        // Update a room
        public void UpdateRoom(int id, Room updatedRoom)
        {
            var existingRoom = _context.Rooms.FirstOrDefault(r => r.Id == updatedRoom.Id);
            if (existingRoom != null)
            {
                existingRoom.RoomNumber = updatedRoom.RoomNumber;
                existingRoom.Capacity = updatedRoom.Capacity;
                existingRoom.CinemaId = updatedRoom.CinemaId;
                existingRoom.Features = updatedRoom.Features;

                _context.SaveChanges();
            }
        }

        // Delete a room by ID
        public void DeleteRoom(int id)
        {
            var room = _context.Rooms.FirstOrDefault(r => r.Id == id);
            if (room != null)
            {
                _context.Rooms.Remove(room);
                _context.SaveChanges();
            }
        }

        // Get rooms by Cinema ID
        public List<Room> GetRoomsByCinemaId(int cinemaId)
        {
            return _context.Rooms.Where(r => r.CinemaId == cinemaId).ToList();
        }

        // Search rooms by features
        public List<Room> SearchRooms(string searchTerm)
        {
            return _context.Rooms
                           .Where(r => r.Features.Contains(searchTerm))
                           .ToList();
        }

    }
}
