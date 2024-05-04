import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { useForm, SubmitHandler, Resolver, FieldError } from "react-hook-form";
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
import { Backend } from "backend";

import { createErrorObject } from "@/utils/createErrorObject";

const Checkout = () => {
  const router = useRouter();

  const resolver: Resolver<Customer> = async (customer) => {
    const validationResult = Backend.validateCustomer(customer);
    
    if (validationResult.fieldErrors.length == 0) {
      return {
        values: customer,
        errors: {},
      };
    }

    // Transform to the format expected by the resolver ex. firstname: {message: the error message}
    const errorObject = createErrorObject<Customer>(validationResult.fieldErrors);

    return {
      values: customer,
      errors: errorObject
    };
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Customer>({
    resolver: resolver,
  });

  const { shoppingCart, subtotal, shippingCost, total, clearShoppingCart } = useShoppingCart();

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
            <Label htmlFor="firstname" value="Voornaam" />
            <TextInput
              {...register("firstname")}
              id="firstName"
              type="text"
              color={errors.firstname ? "failure" : "gray"}
              helperText={errors.firstname?.message}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="lastname" value="Achternaam" />
            <TextInput
              {...register("lastname")}
              id="lastName"
              type="text"
              color={errors.lastname ? "failure" : "gray"}
              helperText={errors.lastname?.message}
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
          <Label htmlFor="addressline1" value="Adreslijn 1" />
          <TextInput
            {...register("address.addressline1")}
            id="addressLine1"
            type="text"
            color={errors.address?.addressline1 ? "failure" : "gray"}
            helperText={errors.address?.addressline1?.message}
          />
        </div>
        <div>
          <Label htmlFor="addressline2" value="Adreslijn 2" />
          <TextInput
            {...register("address.addressline2")}
            id="addressLine2"
            type="text"
            color={errors.address?.addressline2 ? "failure" : "gray"}
            helperText={errors.address?.addressline2?.message}
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

      <CheckoutCartPanel shoppingCart={shoppingCart} total={total} shippingCost={shippingCost} subtotal={subtotal} />
    </div>
  );
};

export default Checkout;
