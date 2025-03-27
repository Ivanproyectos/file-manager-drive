using FileManagement.Core.Constants;
using FileManagement.Core.Contracts.Request;
using FluentValidation;

namespace FileManagement.Core.Validators
{
    public class CreatePeopleValidation: AbstractValidator<CreatePeopleRequest>
    {
        public CreatePeopleValidation()
        {

                RuleFor(x => x.FirstName)
                    .NotEmpty().WithMessage("El nombre es obligatorio")
                    .MaximumLength(200).WithMessage("El nombre no puede superar los {MaxLength} caracteres")
                    .When(x => x.PersonType == PersonTypes.Natural);

            RuleFor(x => x.LastName)
                    .NotEmpty().WithMessage("El apellido es obligatorio")
                    .MaximumLength(200).WithMessage("El apellido no puede superar los {MaxLength} caracteres")
                    .When(x => x.PersonType == PersonTypes.Natural);

            RuleFor(x => x.BussinessName)
                .NotEmpty().WithMessage("La razón social es obligatorio")
                .MaximumLength(200).WithMessage("El apellido no puede superar los {MaxLength}caracteres")
                .When(x => x.PersonType == PersonTypes.Legal);

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("El correo es obligatorio")
                .MaximumLength(100).WithMessage("El correo no puede superar los {MaxLength} caracteres")
                .EmailAddress().WithMessage("El correo no es valido");

            RuleFor(x => x.Address)
                 .NotEmpty().WithMessage("La dirección es obligatorio")
                 .MaximumLength(500).WithMessage("La dirección no puede superar los {MaxLength} caracteres");

            RuleFor(x => x.Identification)
                .NotEmpty().WithMessage("El número de identificación es obligatorio.");

            RuleFor(x => x.Identification)
                .Length(8).WithMessage("El número de documento debe tener exactamente 8 caracteres.")
                .When(x => x.PersonType == PersonTypes.Natural);
            
            RuleFor(x => x.Identification)
                .Length(11).WithMessage("El número de ruc debe tener exactamente 11 caracteres.")
                .When(x => x.PersonType == PersonTypes.Legal);

            RuleFor(x => x.PersonType)
                .NotEmpty().WithMessage("El tipo de persona es obligatorio")
                .Must(type => PersonTypes.AllTypes.Contains(type))
                .WithMessage($"El tipo de persona debe ser '{PersonTypes.Natural}' (Natural) o '{PersonTypes.Legal}' (Jurídica).");
        }
    }
}
