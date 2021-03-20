using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;

        //If Mediator is Null asign to it whatever is on the right
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices
        .GetService<IMediator>();
        
    }
}