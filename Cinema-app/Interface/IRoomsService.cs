using Cinema_app.model;
using System.Collections.Generic;

namespace Cinema_app.Interface
{

    public interface IRoomsService
    {
        void AddRoom(Room room);
        List<Room> GetAllRooms();
        Room GetRoomById(int id);
        void UpdateRoom(int id, Room room);
        void DeleteRoom(int id);
        List<Room> GetRoomsByCinemaId(int cinemaId);
        List<Room> SearchRooms(string searchTerm);

    }
}
