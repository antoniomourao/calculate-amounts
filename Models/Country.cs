
namespace calculate_amounts.Models; 

public class Country {
    public string Name { get; set; } = null!;
    public string Flag { get; set; } = null!;
    public string Currency { get; set; } = null!;
    public float[] VatRates { get; set; } = null!;
    public int DecimalPlaces { get; set; } = 2;
}