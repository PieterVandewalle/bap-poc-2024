using BapPoc.Domain.Orders;
using System.Diagnostics.Metrics;

namespace BapPoc.Domain.Customers;

public class Customer : ValueObject
{
    private string firstname = default!;
    public string Firstname
    {
        get => firstname;
        set => firstname = Guard.Against.NullOrWhiteSpace(value, nameof(Firstname));
    }

    private string lastname = default!;
    public string Lastname
    {
        get => lastname;
        set => lastname = Guard.Against.NullOrWhiteSpace(value, nameof(Lastname));
    }

    private Address address = default!;
    public Address Address
    {
        get => address;
        set => address = Guard.Against.Null(value, nameof(Address));
    }

    private EmailAddress email = default!;
    public EmailAddress Email
    {
        get => email;
        set => email = Guard.Against.Null(value, nameof(Email));
    }

    /// <summary>
    /// Database Constructor
    /// </summary>
    private Customer() { }

    public Customer(string firstname, string lastname, Address address, EmailAddress email)
    {
        Firstname = firstname;
        Lastname = lastname;
        Address = address;
        Email = email;
    }

    protected override IEnumerable<object?> GetEqualityComponents()
    {
        yield return Email;
        yield return Firstname.ToLower();
        yield return Lastname.ToLower();
        yield return Address;
    }
}
