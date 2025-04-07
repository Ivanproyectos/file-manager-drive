using FileManagement.Core.Constants;
using FileManagement.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Service.Helpers
{
    public static class FormatPeopleName
    {
        public static string FormatPeopleType(People people)
        {
            if (people.PersonType == PersonTypes.Natural)
            {
                return $"{people.FirstName} {people.LastName}";
            }

            return people.BussinessName;
        }
    }
}
