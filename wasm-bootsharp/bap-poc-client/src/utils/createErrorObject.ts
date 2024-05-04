import { Backend } from "backend";

// Helper function to deeply set values in an object based on a path
const setObjectValue = (obj: any, path: string[], value: any) => {
  let current = obj;
  for (let i = 0; i < path.length - 1; i++) {
    const part = path[i];
    current[part] = current[part] || {};
    current = current[part];
  }
  current[path[path.length - 1]] = { message: value };
};

// Convert string to camelCase
const toCamelCase = (str: string) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
    index === 0 ? match.toLowerCase() : match.toUpperCase()
  );
};

// Generalized error object creator function using generics
export function createErrorObject<T>(
  errors: Backend.FieldErrorDto[]
): Partial<T> {
  const errorObject: any = {};

  errors.forEach((error) => {
    const path = error.fieldName.split(".").map((part) => toCamelCase(part));
    setObjectValue(errorObject, path, error.error);
  });

  return errorObject as Partial<T>;
}
