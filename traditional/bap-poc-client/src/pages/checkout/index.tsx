import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useShoppingCart } from "@/contexts/ShoppingCart.context";
import CheckoutCartItem from "@/components/Checkout/CheckoutCartItem";
import { formatToEuroCurrency } from "@/utils/formatValues";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "@/api/orders";
import { OrderItem } from "@/types/order-item";
import { Order } from "@/types/order";
import { useRouter } from "next/router";
import { Customer } from "@/types/customer";
import { Address } from "@/types/address";
import CheckoutCartPanel from "@/components/Checkout/CheckoutCartPanel";

const validationSchema = Yup.object<Customer>().shape({
  firstName: Yup.string().required().max(100),
  lastName: Yup.string().required().max(100),
  email: Yup.string().required().email(),
  address: Yup.object<Address>().shape({
    addressLine1: Yup.string().required().max(250),
    addressLine2: Yup.string().optional(),
    postalCode: Yup.string().required().max(20),
    city: Yup.string().required().max(100),
    country: Yup.string().required().max(100),
  }),
});

const Checkout = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Customer>({
    resolver: yupResolver(validationSchema),
  });

  const { shoppingCart, totalPrice, clearShoppingCart } = useShoppingCart();

  const {
    mutate: createOrderMutate,
    isError,
    isPending,
  } = useMutation({
    mutationFn: createOrder,
    onSuccess: (orderId) => {
      clearShoppingCart();
      router.push({
        pathname: "/checkout/success",
        query: { orderId: orderId },
      });
    },
  });

  const onSubmit: SubmitHandler<Customer> = (customer) => {
    const orderItems: OrderItem[] = shoppingCart.map((cartItem) => ({
      productId: cartItem.product.id,
      quantity: cartItem.amount,
    }));
    const order: Order = {
      customer: customer,
      items: orderItems,
    };
    createOrderMutate(order);
  };

  if (shoppingCart.length == 0) {
    return (
      <div className="flex flex-col gap-2 max-w-sm">
        <h4 className="font-bold text-lg">Nog geen producten in winkelwagen</h4>
        <Link href="/">
          <Button type="submit">Producten toevoegen</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-between gap-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <h4 className="font-bold text-lg">Klantgegevens</h4>
        <div className="flex gap-4">
          <div className="w-full">
            <Label htmlFor="firstName" value="Voornaam" />
            <TextInput
              {...register("firstName")}
              id="firstName"
              type="text"
              color={errors.firstName ? "failure" : "gray"}
              helperText={errors.firstName?.message}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="lastName" value="Achternaam" />
            <TextInput
              {...register("lastName")}
              id="lastName"
              type="text"
              color={errors.lastName ? "failure" : "gray"}
              helperText={errors.lastName?.message}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email" value="Email" />
          <TextInput
            {...register("email")}
            id="email"
            type="email"
            color={errors.email ? "failure" : "gray"}
            helperText={errors.email?.message}
          />
        </div>
        {/* Address Fields */}
        <div>
          <Label htmlFor="addressLine1" value="Adreslijn 1" />
          <TextInput
            {...register("address.addressLine1")}
            id="addressLine1"
            type="text"
            color={errors.address?.addressLine1 ? "failure" : "gray"}
            helperText={errors.address?.addressLine1?.message}
          />
        </div>
        <div>
          <Label htmlFor="addressLine2" value="Adreslijn 2" />
          <TextInput
            {...register("address.addressLine2")}
            id="addressLine2"
            type="text"
            color={errors.address?.addressLine2 ? "failure" : "gray"}
            helperText={errors.address?.addressLine2?.message}
          />
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <Label htmlFor="postalCode" value="Postcode" />
            <TextInput
              {...register("address.postalCode")}
              id="postalCode"
              type="text"
              color={errors.address?.postalCode ? "failure" : "gray"}
              helperText={errors.address?.postalCode?.message}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="city" value="Stad" />
            <TextInput
              {...register("address.city")}
              id="city"
              type="text"
              color={errors.address?.city ? "failure" : "gray"}
              helperText={errors.address?.city?.message}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="country" value="Land" />
          <TextInput
            {...register("address.country")}
            id="country"
            type="text"
            color={errors.address?.country ? "failure" : "gray"}
            helperText={errors.address?.country?.message}
          />
        </div>
        {isPending ? (
          <Button disabled>
            <Spinner aria-label="Spinner button example" size="sm" />
            <span className="pl-3">Bestelling verwerken...</span>
          </Button>
        ) : (
          <Button type="submit">Bestellen</Button>
        )}
        {isError && (
          <p className="text-red-500">Er ging iets mis, probeer het opnieuw</p>
        )}
      </form>

      <CheckoutCartPanel shoppingCart={shoppingCart} totalPrice={totalPrice} />
    </div>
  );
};

export default Checkout;
