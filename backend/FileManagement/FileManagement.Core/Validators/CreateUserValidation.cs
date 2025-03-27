using FileManagement.Core.Contracts.Request;
using FluentValidation;

namespace FileManagement.Core.Validators
{
    public class CreateUserValidation: AbstractValidator<CreateUserRequest>
    {
        public CreateUserValidation()
        {
            //RuleFor(x => x.UserName)
            //        .NotEmpty().WithMessage("El User Name es obligatorio")
            //        .MaximumLength(100).WithMessage("El User Name no puede superar los {MaxLength} caracteres");

            RuleFor(x => x.Password)
                    .NotEmpty().WithMessage("El Password es obligatorio")
                    .MaximumLength(100).WithMessage("El Password no puede superar los {MaxLength} caracteres");

            RuleFor(x => x.ConfirmPassword)
                    .NotEmpty().WithMessage("El campo repetir password es obligatorio")
                    .MaximumLength(100).WithMessage("El correo no puede superar los {MaxLength} caracteres")
                    .Equal(x => x.Password).WithMessage("Las contraseñas no coinciden");

            RuleFor(x => x.People)
                .NotNull().WithMessage("Los datos de la persona son obligatorios.")
               .SetValidator(new CreatePeopleValidation());   

        }
    }
}
