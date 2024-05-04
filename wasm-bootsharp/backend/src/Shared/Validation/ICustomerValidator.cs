using BapPoc.Shared.Customers;

namespace BapPoc.Shared.Validation;

public interface ICustomerValidator
{
    public ValidationResultDto ValidateCustomer(CustomerCreateDto customer);
}
