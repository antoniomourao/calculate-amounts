
using Microsoft.AspNetCore.Mvc;
using calculate_amounts.Models;

namespace calculate_amounts.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CountryItemsController : ControllerBase
{

    private readonly ILogger<CountryItemsController> _logger;
    private readonly CountryContext _countriesContext;

    public CountryItemsController(ILogger<CountryItemsController> logger, CountryContext countriesContext)
    {
        _logger = logger;
        _countriesContext = countriesContext;
    }

    [HttpGet]
    public IEnumerable<Country> Get()
    {
        return _countriesContext.CountryItems;

    }
}
