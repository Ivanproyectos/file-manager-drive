using FluentValidation.Results;

namespace FileManagement.Core.Exceptions
{
    public class ValidationException : Exception
    {
        public List<string> Failures { get; }
        public ValidationException() : base("se han producido uno o mas errores de validación")
        {
            Failures = new();
        }
        public ValidationException(string message) : base(message)
        {
            Failures = new();
        }

        public ValidationException(string message, Exception innerException) : base(message, innerException)
        {
            Failures = new();
        }
        public ValidationException(IEnumerable<ValidationFailure> failures) : this()
        {
            Failures = new();
            foreach (var failure in failures)
            {
                Failures.Add(failure.ErrorMessage);
            }
        }
    }
}
