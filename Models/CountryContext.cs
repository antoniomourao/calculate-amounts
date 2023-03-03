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
            VatRates = new float[] { 0.05f, 0.10f, 0.13f, 0.20f },
            DecimalPlaces = 2
        });
        CountryItems.Add(new Country()
        {
            Name = "United Kingdom",
            Flag = "uk",
            Currency = "£",
            VatRates = new float[] { 0.05f, 0.20f },
            DecimalPlaces = 2,
        });
        CountryItems.Add(new Country()
        {
            Name = "Portugal",
            Flag = "pt",
            Currency = "€",
            VatRates = new float[] { 0.06f, 0.13f, 0.23f },
            DecimalPlaces = 2,
        });
        CountryItems.Add(new Country()
        {
            Name = "Singapore",
            Flag = "sg",
            Currency = "$",
            VatRates = new float[] { 0.07f },
            DecimalPlaces = 2,
        });
    }

}