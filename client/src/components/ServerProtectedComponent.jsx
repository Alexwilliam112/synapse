import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ServerProtectedComponents = ({ children }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token || token.value.length <= 0) {
    redirect("/login");
  }

  return <>{children}</>;
};

export default ServerProtectedComponents;
