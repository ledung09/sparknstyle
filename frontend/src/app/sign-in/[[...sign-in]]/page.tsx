import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex mt-14 justify-center min-h-screen">
      <SignIn />
    </div>
  );
}
