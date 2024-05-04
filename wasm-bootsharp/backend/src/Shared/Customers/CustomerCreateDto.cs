using FluentValidation;

namespace BapPoc.Shared.Customers;

public class CustomerCreateDto
{
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
        public string Email { get; set; } = default!;
        public AddressDto Address { get; set; } = new();

        public class Validator : AbstractValidator<CustomerCreateDto>
        {
            public Validator()
            {
                RuleFor(x => x.Firstname).NotEmpty().MaximumLength(100);
                RuleFor(x => x.Lastname).NotEmpty().MaximumLength(100);
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.Address).NotEmpty().SetValidator(new AddressDto.Validator());
            }
        }
}


