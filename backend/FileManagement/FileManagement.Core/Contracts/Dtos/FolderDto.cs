namespace FileManagement.Core.Contracts.Dtos
{
    public record struct FolderDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public long Size { get; set; }
        public List<UserFolderDto> Users { get; set; }
        public DateTime? CreatedDate { get; set; }
    }

    //public record struct UserFolderDto 
    //{
    //    public string Name { get; set; }
    //    public string Email { get; set; }
    //}

}
