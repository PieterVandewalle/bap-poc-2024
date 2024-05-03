export interface Address {
  addressLine1: string;
  addressLine2?: string | undefined;
  postalCode: string;
  city: string;
  country: string;
}
