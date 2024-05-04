namespace BapPoc.Shared.Validation;

public class FieldErrorDto
{
    public string FieldName { get; set; } = default!;
    public string Error { get; set; } = default!;
}
