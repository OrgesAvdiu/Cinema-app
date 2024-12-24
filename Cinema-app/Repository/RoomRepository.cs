using Cinema_app.model;
using System.Collections.Generic;

namespace Cinema_app.Repository
{
    public interface RoomRepository
    {
        void Add(Room room);
        List<Room> GetAll();
        Room GetById(int id);
        void Update(int id, Room room);
        void Delete(int id);
        List<Room> GetByCinemaId(int cinemaId);
        List<Room> Search(string searchTerm);
    }
}
