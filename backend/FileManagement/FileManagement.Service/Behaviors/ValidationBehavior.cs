using FluentValidation;
using FluentValidation.Results;
using MediatR;
using CoreLayer = FileManagement.Core.Exceptions;

namespace FileManagement.Service.Behaviors
{
    public class ValidationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : IRequest<TResponse>
    {
        private readonly IEnumerable<IValidator<TRequest>> _validators;
        public ValidationBehavior(IEnumerable<IValidator<TRequest>> validators)
        {
            _validators = validators;
        }
        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            if (_validators.Any())
            {
                var context = new ValidationContext<TRequest>(request);
                var validationResults = await Task.WhenAll(_validators.Select(v => v.ValidateAsync(context, cancellationToken)));
                List<ValidationFailure> failures = validationResults.SelectMany(r => r.Errors).Where(f => f != null).ToList();
                if (failures.Count > 0)
                {
                    var errors =failures.Select(f => new KeyValuePair<string, string>(f.PropertyName, f.ErrorMessage));
                    throw new CoreLayer.ValidationException(errors);
                }
            }
            return await next();
        }
    }
}
