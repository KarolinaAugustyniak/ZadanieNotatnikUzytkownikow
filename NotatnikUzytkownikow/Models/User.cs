using System.ComponentModel.DataAnnotations;

namespace NotatnikUzytkownikow.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Imię może zawierać jedynie litery")]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(150)]
        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Imię może zawierać jedynie litery")]
        public string LastName { get; set; }

        [Required]
        public DateTime BirthDate { get; set; }

        [Required]
        [RegularExpression("^(Kobieta|Mężczyzna)$", ErrorMessage = "Dopuszczalne wartości to 'Kobieta' lub 'Mężczyzna'.")]
        public string Gender { get; set; }

        public string? PhoneNumber { get; set; }
        public string? Position { get; set; }

        [Range(34, 50, ErrorMessage = "Numer buta powinien mieć wartość od 34 do 50.")]
        public int? ShoeNumber { get; set; }

    }
}
