import { useUser } from "@clerk/nextjs";

export default function useRole() {
  const { user } = useUser();
  return user?.publicMetadata["role"];
}
