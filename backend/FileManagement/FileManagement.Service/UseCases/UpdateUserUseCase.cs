using AutoMapper;
using FileManagement.Core.Contracts.Request;
using FileManagement.Core.Entities;
using FileManagement.Core.Exceptions;
using FileManagement.Core.Interfaces.Repositories;
using MediatR;

namespace FileManagement.Service.UseCases
{
    public class UpdateUserUseCase : IRequestHandler<UpdateUserRequest, Unit>
    {
        private readonly IFolderRepository _folderRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly IPeopleRepository _peopleRepository;
        public UpdateUserUseCase(IFolderRepository folderRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            IUserRepository userRepository,
            IPeopleRepository peopleRepository)
        {
            _userRepository = userRepository;
            _folderRepository = folderRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _peopleRepository = peopleRepository;
        }
        public async Task<Unit> Handle(UpdateUserRequest request, CancellationToken cancellationToken)
        {
            try
            {
                var user = await _userRepository.GetUserByIdAsync(request.Id);
                if (user is null)
                {
                    throw new KeyNotFoundException($"El usuario con el id {request.Id} no existe");
                }

                await _unitOfWork.BeginTransactionAsync();

                var people = _mapper.Map<People>(request.People);
                //var userUpdate = _mapper.Map<User>(request);


                //userUpdate.PeopleId = user.PeopleId;
                people.Id = user.PeopleId;
                await _peopleRepository.UpdatePeopleAsync(people);

                //await _userRepository.UpdateUserAsync(userUpdate);
                await _unitOfWork.CommitAsync();

                return Unit.Value;
            }
            catch (Exception ex)
            {
                await _unitOfWork.RollbackAsync();
                throw;
            }
        }
    }
}
