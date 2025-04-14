using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FileManagement.Core.Contracts.Dtos;
using FileManagement.Core.Entities;
using System.Drawing;
using Google.Apis.Drive.v3.Data;
using FileManagement.Service.Helpers;

namespace FileManagement.Service.Mappers
{
    public class FolderProfile : Profile
    {
        public FolderProfile()
        {
            CreateMap<Folder, FolderDto>()
                .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => src.CreatedAt))
                      //.ForMember(dest => dest.FolderProcessHistories,
                      //    opt => opt.MapFrom(src => src.FolderProcessHistories.Select(fh => fh.FolderProcessStates).ToList()))
                .ForMember(dest => dest.Size, opt => opt.MapFrom(src => src.Files.Sum(file => file.SizeBytes)))
                .ForMember(dest => dest.Users, opt => opt.MapFrom(src => src.UserFolders.Select(uf => new UserFolderDto
                {
                    Name = FormatPeopleName.FormatPeopleType(uf.User.People),
                    Email = uf.User.People.Email
                }).ToList()));


            CreateMap<FolderProcessHistory, FolderProcessHistoryDto>()
                .ForMember(dest => dest.State, opt => opt.MapFrom(src => src.FolderProcessStates));

            CreateMap<FolderProcessState, FolderProcessStateDto>();

        }
    }
}
