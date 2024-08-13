"use client";

import { useEffect } from "react";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {}, [error]);
  return (
    <div className={"flex justify-center items-center pt-[10%] px-5"}>
      <div className={"flex flex-col justify-center items-center gap-3"}>
        <h2 className={"text-4xl font-bold"}>
          OOPS... Looks like the server failed to communicate 😢
        </h2>
        <Button
          color={"primary"}
          variant={"shadow"}
          onPress={router.refresh}
          className={"w-[40%]"}
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
