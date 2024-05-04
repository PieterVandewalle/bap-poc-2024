using BapPoc.Shared.Customers;
using FluentValidation.Results;

namespace BapPoc.Shared.Validation;

public class CustomerValidator : ICustomerValidator
{
    public ValidationResultDto ValidateCustomer(CustomerCreateDto customer)
    {
        CustomerCreateDto.Validator validator = new();

        ValidationResult result = validator.Validate(customer);

        var fieldErrorDtos = result.Errors.Select(x => new FieldErrorDto { FieldName = x.PropertyName, Error = x.ErrorMessage });

        return new ValidationResultDto {FieldErrors =  fieldErrorDtos.ToList()};
    }
}
