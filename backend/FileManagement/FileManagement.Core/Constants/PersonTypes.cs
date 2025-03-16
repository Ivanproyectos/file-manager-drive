using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Constants
{
    public class PersonTypes
    {
        public const char Natural = 'N';
        public const char Legal = 'J';

        public static readonly char[] AllTypes = { Natural, Legal };
    }
}
