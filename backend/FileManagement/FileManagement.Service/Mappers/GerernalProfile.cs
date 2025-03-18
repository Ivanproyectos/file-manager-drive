using AutoMapper;
using FileManagement.Core.Contracts.Dtos;
using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Contracts.Response;
using FileManagement.Core.Entities;

namespace FileManagement.Service.Mappers
{
    internal class GerernalProfile: Profile
    {
        public GerernalProfile()
        {
            #region entity to dto
            CreateMap<Folder, CreateFolderResponse>();
            CreateMap<Folder, FolderDto>();
            CreateMap<FileManagement.Core.Entities.File, FileDto>();


            #endregion

            #region dto to entity
            CreateMap<CreateFolderRequest, Folder>();
            CreateMap<CreateUserRequest, User>()
                .ForMember(dest => dest.People, opt => opt.Ignore());
            CreateMap<CreatePeopleRequest, People>();
            #endregion
        }
    }
}
