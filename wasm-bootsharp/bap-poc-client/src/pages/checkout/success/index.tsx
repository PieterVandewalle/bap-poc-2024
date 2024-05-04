import { Button, Card } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";

const Success = () => {
  const router = useRouter();
  return (
    <div className="flex w-full justify-center">
      <Card className="max-w-xl">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Bestelling geplaatst
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Uw bestelling met nummer #{router.query?.orderId} werd zonet geplaatst.
        </p>
        <Link href="/">
          <Button>Verder winkelen</Button>
        </Link>
      </Card>
    </div>
  );
};

export default Success;
