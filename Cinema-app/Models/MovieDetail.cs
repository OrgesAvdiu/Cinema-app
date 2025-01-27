using Cinema_app.model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cinema_app.model
{
    public class MovieDetail
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public string Image { get; set; }

        [Required]
        public int CinemaId { get; set; }
        public Cinema Cinema { get; set; }

        [NotMapped]
        public int NumberOfTickets { get; set; }

        [NotMapped]
        public decimal TotalPrice { get; set; }

        [Required]
        public string PaymentMethod { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedDate { get; set; } = DateTime.UtcNow;
    }
}