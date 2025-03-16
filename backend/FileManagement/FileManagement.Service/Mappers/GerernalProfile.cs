using AutoMapper;
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

            #endregion

            #region dto to entity
            CreateMap<CreateFolderRequest, Folder>();
            CreateMap<CreateUserRequest, User>();
            CreateMap<CreatePeopleRequest, People>();
            #endregion
        }
    }
}
