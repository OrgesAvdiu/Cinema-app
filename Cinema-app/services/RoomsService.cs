using CinemaApp.Models;
using Cinema_app.model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Cinema_app.Repository;

namespace Cinema_app.Services
{
    public class RoomsService : RoomRepository
    {
        private readonly CinemaDbContext _context;

        public RoomsService(CinemaDbContext context)
        {
            _context = context;
        }

        // Add a new room
        public void Add(Room room)
        {
            _context.Rooms.Add(room);
            _context.SaveChanges();
        }

        // Get all rooms
        public List<Room> GetAll()
        {
            return _context.Rooms.Include(r => r.Cinema).ToList();
        }

        // Get room by ID
        public Room GetById(int id)
        {
            return _context.Rooms.Include(r => r.Cinema).FirstOrDefault(r => r.Id == id);
        }

        // Update room by ID
        public void Update(int id, Room updatedRoom)
        {
            var existingRoom = _context.Rooms.FirstOrDefault(r => r.Id == id);
            if (existingRoom != null)
            {
                existingRoom.RoomNumber = updatedRoom.RoomNumber;
                existingRoom.Capacity = updatedRoom.Capacity;
                existingRoom.CinemaId = updatedRoom.CinemaId;
                existingRoom.Features = updatedRoom.Features;

                _context.SaveChanges();
            }
        }

        // Delete room by ID
        public void Delete(int id)
        {
            var room = _context.Rooms.FirstOrDefault(r => r.Id == id);
            if (room != null)
            {
                _context.Rooms.Remove(room);
                _context.SaveChanges();
            }
        }

        // Get rooms by Cinema ID
        public List<Room> GetByCinemaId(int cinemaId)
        {
            return _context.Rooms.Where(r => r.CinemaId == cinemaId).ToList();
        }

        // Search rooms by features
        public List<Room> Search(string searchTerm)
        {
            return _context.Rooms
                           .Where(r => r.Features.Contains(searchTerm))
                           .ToList();
        }
    }
}
