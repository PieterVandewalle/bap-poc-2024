namespace BapPoc.Shared.Validation;

public class ValidationResultDto
{
    public List<FieldErrorDto> FieldErrors { get; set; } = default!;
}
