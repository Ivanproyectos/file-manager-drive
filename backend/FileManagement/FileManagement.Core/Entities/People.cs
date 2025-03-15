using FileManagement.Core.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Entities
{
    public class People : AuditableBaseEntity
    {
        public char PersonType { get; set; } // 'N' = Natural, 'J' = Legal
        public string Name { get; set; }
        public string Identification { get; set; } // Unique
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; } // Unique

        public User CreatedByUser { get; set; }
        public User UpdatedByUser { get; set; }
    }
}
