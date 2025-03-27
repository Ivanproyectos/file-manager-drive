namespace FileManagement.Core.Contracts.Dtos
{
    public record struct PeopleDto(
        int Id,
        string PersonType,
        string FirstName,
        string LastName,
        string BussinessName,
        string Identification,
        string Address,
        string Email,
        string Phone
        );
}
