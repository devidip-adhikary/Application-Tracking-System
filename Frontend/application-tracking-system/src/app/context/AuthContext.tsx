import { useEffect, FC } from "react";
import { redirect } from "next/navigation";

const withAuth = <P extends object>(WrappedComponent: FC<P>): FC<P> => {
  const AuthenticatedComponent: FC<P> = (props) => {
    // const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        redirect("/auth/signin"); // Redirect to sign-in if not authenticated
      }
    }, []);

    // Render nothing if the user is not authenticated
    if (typeof window !== "undefined" && !localStorage.getItem("token")) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
