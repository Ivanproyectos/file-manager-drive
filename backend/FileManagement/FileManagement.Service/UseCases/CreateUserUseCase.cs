using AutoMapper;
using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Contracts.Response;
using FileManagement.Core.Entities;
using FileManagement.Core.Interfaces.Repositories;
using FileManagement.Core.Interfaces.Services;
using MediatR;

namespace FileManagement.Service.UseCases
{
    public class CreateUserUseCase : IRequestHandler<CreateUserRequest, CreateUserResponse>
    {
        private readonly IFolderRepository _folderRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly IPeopleRepository _peopleRepository;
        private readonly IPasswordService _passwordService;
        public CreateUserUseCase(IFolderRepository folderRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            IUserRepository userRepository,
            IPeopleRepository peopleRepository,
            IPasswordService passwordService)
        {
            _userRepository = userRepository;
            _folderRepository = folderRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _peopleRepository = peopleRepository;
            _passwordService = passwordService;
        }
        public async Task<CreateUserResponse> Handle(CreateUserRequest request, CancellationToken cancellationToken)
        {
            try
            {
                await _unitOfWork.BeginTransactionAsync();

                var people = _mapper.Map<People>(request.People);

                await _peopleRepository.AddPeopleAsync(people);

                await _unitOfWork.SaveChangesAsync();

                var user = _mapper.Map<User>(request);

                user.PasswordHash = _passwordService.HashPassword(request.Password);

                user.PeopleId = people.Id;
                user.People = null;

                await _userRepository.AddUserAsync(user);

                await _unitOfWork.CommitAsync();

                return new CreateUserResponse { Id = user.Id, Email = user.People.Email };

            } catch (Exception ex)
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }

        }
    }
}
