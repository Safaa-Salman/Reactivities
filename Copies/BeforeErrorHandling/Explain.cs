
//This will return a 204 no content which is 200 OK but the content is null that is because in the Details i have this:
// public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
// {
//     return await _context.Activities.FindAsync(request.Id);
// }

//Find ASync will return null if id not found
// [HttpGet("{id}")]
// public async Task<ActionResult<Activity>> GetActivity(Guid id)
// {
//     return await Mediator.Send(new Details.Query { Id = id });
// }

//What i want i to return not Founf 404 what i would usually do us

// [HttpGet("{id}")]
// public async Task<ActionResult<Activity>> GetActivity(Guid id)
// {
//     var activity = await Mediator.Send(new Details.Query { Id = id });
//     if (activity == null) return NotFound();
//     return activity;
// }

//But since i am using CQRS i will not put the error handling in the API i will leave it in the Application Layer

//So what i will do is in the Detail(Application) instead of returning an Activity i'll return a result object that will either contain an activity object or contain null and we will specify a failure type of request to deal will eroor inside our handler themselves rather than the controler(API) because we cannot do inside our handler this:
// public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
// {
//     var activity = await _context.Activities.FindAsync(request.Id);
//     if (activity == null) return NotFound();
//     return activity;
// }
//I can't do that because this is a handler not an API Controller
// One way we could do this is by doing:
// public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
// {
//     var activity = await _context.Activities.FindAsync(request.Id);
//     if (activity == null) throw new Exception("Activity not found");
//     return activity;
// }
//That way I can keep my API As is and keep the error handling in the Application but Exceptions cost a lot more that a normal error response and idealy we rather not use exception for program control flow that is why we are not gonna do it this way



//I have put this logic in ActivitiesController 
        // [HttpGet("{id}")]
        // public async Task<IActionResult> GetActivity(Guid id)
        // {
        //     var result = await Mediator.Send(new Details.Query{Id = id});
        //     if(result.IsSucess && result.Value != null)
        //         return Ok(result.Value);
        //     if(result.IsSucess && result.Value == null)
        //         return NotFound();
        //     return BadRequest(result.Error);
        // }
//However i do want to write this logic every single time so i'll just write it in the baseApiController





//New
//public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        // {
        //     if (env.IsDevelopment())
        //     {
        //         app.UseDeveloperExceptionPage();
        //         app.UseSwagger();
        //         app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
        //     }
// this is startup before i did my own Middleware to handle Exceptions and removed app.UseDeveloperExceptionPage();