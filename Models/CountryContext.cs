namespace calculate_amounts.Models;

public class CountryContext
{
    public List<Country> CountryItems { get; set; } = null!;

    public CountryContext()
    {
        CountryItems = new List<Country>();
        CountryItems.Add(new Country()
        {
            Name = "Austria",
            Flag = "au",
            Currency = "€",
            Vats = new int[] { 5, 10, 13, 20 },
            DecimalPlaces = 2
        });
        CountryItems.Add(new Country()
        {
            Name = "United Kingdom",
            Flag = "uk",
            Currency = "£",
            Vats = new int[] { 5, 20 },
            DecimalPlaces = 2,
        });
        CountryItems.Add(new Country()
        {
            Name = "Portugal",
            Flag = "pt",
            Currency = "€",
            Vats = new int[] { 6, 13, 23 },
            DecimalPlaces = 2,
        });
        CountryItems.Add(new Country()
        {
            Name = "Singapore",
            Flag = "sg",
            Currency = "$",
            Vats = new int[] { 7 },
            DecimalPlaces = 2,
        });
    }

}