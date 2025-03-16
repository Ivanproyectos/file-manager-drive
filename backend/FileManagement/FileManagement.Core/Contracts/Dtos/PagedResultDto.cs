namespace FileManagement.Core.Contracts.Dtos
{
    public class PagedResultDto<T> where T : class
    {
        public PagedResultDto(T data, int totalRecords, int pageNumber, int pageSize) {
            Data = data;
            TotalRecords = totalRecords;
            PageNumber = pageNumber;
            PageSize = pageSize;
        }
        public T Data { get; set; }
        public int TotalRecords { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public int TotalPages => (int)Math.Ceiling((double)TotalRecords / PageSize);
    }
}
