using FileManagement.Service.UseCases;
using Microsoft.AspNetCore.Mvc;

namespace FileManagement.WebApi.Controllers
{
    public class SeedsController : BaseApiController
    {
        private readonly SeedUseCase _seedUseCase; 
        public SeedsController(SeedUseCase seedUseCase)
        {
            _seedUseCase = seedUseCase;
        }
        [HttpPost]
        public async Task<IActionResult> Execute()
        {
            await _seedUseCase.Execute();
            return Ok(new { message = "Seed executed" });
        }
    }
}
