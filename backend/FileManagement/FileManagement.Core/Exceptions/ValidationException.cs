using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FileManagement.Core.Exceptions
{
    public class ValidationException : Exception
    {
        public Dictionary<string, List<string>> Failures { get; }
        public ValidationException() : base("se han producido uno o mas errores de validación")
        {
            Failures = new();
        }
        public ValidationException(string message, string propertyName, string errorMessage) : base(message) => Failures = new()
         {
             [propertyName] = new() { errorMessage }
         };
        public ValidationException(IEnumerable<KeyValuePair<string, string>> failures) : this()
        {
            Failures = new();
            foreach (var failure in failures)
            {
                if (Failures.ContainsKey(failure.Key))
                {
                    Failures[failure.Key].Add(failure.Value);
                }
                else
                {
                    Failures.Add(failure.Key, new() { failure.Value });
                }
            }
        }
    }
}
