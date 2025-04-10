using AutoMapper;
using FileManagement.Core.Constants;
using FileManagement.Core.Contracts.Dtos;
using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Contracts.Response;
using FileManagement.Core.Entities;
using FileManagement.Service.Helpers;

namespace FileManagement.Service.Mappers
{
    internal class GeneralProfile: Profile
    {
        public GeneralProfile()
        {
            #region entity to dto
            CreateMap<Folder, CreateFolderResponse>();
            CreateMap<Folder, FolderDto>();
            CreateMap<Core.Entities.File, UserFileDto>()
                .ForMember(dest => dest.CanView, opt => opt.MapFrom(src => src.Permission.CanView))
                .ForMember(dest => dest.CanDownload, opt => opt.MapFrom(src => src.Permission.CanDownload))
                 .ForMember(dest => dest.IsDateExpired, opt => opt.MapFrom(src => src.Permission.IsDateExpired))
                .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => src.CreatedAt))
                .ForMember(dest => dest.ExpirationDate, opt => opt.MapFrom(src => src.Permission.ExpirationDate));

            CreateMap<User, UserSummaryResponse>()
             .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.People.Email))
             .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.People.PersonType == PersonTypes.Natural ? src.People.FirstName + " " + src.People.LastName : src.People.BussinessName))
             .ForMember(dest => dest.PersonType, opt => opt.MapFrom(src => src.People.PersonType));

            CreateMap<User, UserDto>();
                 //.ForMember(dest => dest.Roles, opt => opt.MapFrom(src => src.Roles.Select(x => x.Role.RoleName)
                 //.ToList()));

            CreateMap<UserRole, RoleDto>()
                .ForMember(dest => dest.RoleName, opt => opt.MapFrom(src => src.Role.RoleName))
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Role.Id));

            CreateMap<Core.Entities.File, FileDto>()
                .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => src.CreatedAt));
          

            CreateMap<People, PeopleDto>();
            CreateMap<Folder, UserFolderResponse>();
            CreateMap<Folder, SubFolderDto>();

            CreateMap<FolderPermission, FolderPermissionResponse>()
                .ForMember(dest => dest.name,
                    opt => opt.MapFrom(src => FormatPeopleName.FormatPeopleType(src.User.People)))
                .ForMember(dest => dest.email, opt => opt.MapFrom(src => src.User.People.Email));

            //  .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.PersonType == PersonTypes.Natural ? src.FirstName + " " + src.LastName : src.BussinessName));


            #endregion

            #region dto to entity
            CreateMap<CreateFolderRequest, Folder>();
            CreateMap<CreateUserRequest, User>()
                .ForMember(dest => dest.Roles, opt => opt.Ignore())
                .ForMember(dest => dest.People, opt => opt.Ignore());

            CreateMap<CreatePeopleRequest, People>();
            CreateMap<UpdatePeopleRequest, People>();
            CreateMap<CreateFolderPermissionRequest, FolderPermission>();
            CreateMap<UpdateFolderPermissionRequest, FolderPermission>();
            

            #endregion
        }
    }
}
