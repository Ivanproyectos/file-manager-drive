using FileManagement.Core.Common;

namespace FileManagement.Core.Entities
{
    public class People : AuditableBaseEntity
    {
        public char PersonType { get; set; } // 'N' = Natural, 'J' = Legal
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string BussinessName { get; set; }
        public string Identification { get; set; } // Unique
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; } // Unique

        //public User User { get; set; }
        public User CreatedByUser { get; set; }
        public User UpdatedByUser { get; set; }
    }
}
