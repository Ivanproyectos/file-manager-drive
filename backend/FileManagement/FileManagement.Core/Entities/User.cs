using FileManagement.Core.Common;

namespace FileManagement.Core.Entities
{
    public class User : AuditableBaseEntity
    {
        public int PeopleId { get; set; }
        //public string UserName { get; set; }
        public string PasswordHash { get; set; }
        public bool? Status { get; set; } = true;
        public bool IsExpired { get; set; }
        public bool HasChangedPassword { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public People? People { get; set; }
        public ICollection<UserRole> Roles { get; set; }
        //public ICollection<UserFolder> UserFolders { get; set; }
        //public User? CreatedByUser { get; set; }
        //public User? UpdatedByUser { get; set; }

        //public IEnumerable<FolderPermission> FolderPermissions { get; set; }
        //public IEnumerable<FilePermission> FilePermissions { get; set; }
    }
}
