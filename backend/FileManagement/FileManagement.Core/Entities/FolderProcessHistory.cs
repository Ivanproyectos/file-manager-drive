using FileManagement.Core.Common;

namespace FileManagement.Core.Entities
{
    public sealed class FolderProcessHistory : AuditableBaseEntity
    {
        public int FolderId { get; set; }
        public int FolderProcessStateId { get; set; }
        public bool IsActive { get; set; }
        public Folder Folder { get; set; }
        public FolderProcessStates FolderProcessStates { get; set; }
    }
}
