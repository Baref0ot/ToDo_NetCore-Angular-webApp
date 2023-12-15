using Newtonsoft.Json.Serialization;

var MyAllowedOrigins = "_myAllowedOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//JSON Serializer
builder.Services.AddControllers()
    .AddNewtonsoftJson(options => 
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
    .AddNewtonsoftJson(options => 
        options.SerializerSettings.ContractResolver = new DefaultContractResolver());


// Add Custom CORS policy
builder.Services.AddCors(options => {
    options.AddPolicy(name: MyAllowedOrigins, policy => {
        policy.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod(); ;
    });     
});

var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();

// Enable your CORS policy to run in the app middleware pipeline. (Cross Origin Resource Sharing) - Allows Angular frontend to consume our backend API resources
app.UseCors(MyAllowedOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
