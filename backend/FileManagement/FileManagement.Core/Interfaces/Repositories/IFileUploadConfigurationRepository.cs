﻿using FileManagement.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Interfaces.Repositories
{
    public interface IFileUploadConfigurationRepository
    {
        Task<FileUploadConfiguration> GetAsync();
    }
}
