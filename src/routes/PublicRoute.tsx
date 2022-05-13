import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Auth } from ".";

type PublicRouteType = {
  component: any;
  restricted: boolean;
};

function PublicRoute({
  component: Component,
  restricted,
  ...rest
}: PublicRouteType) {
  const navigate = useNavigate();

  useEffect(() => {
    if (Auth.isAuthenticated() && restricted) {
      navigate("/");
    }
  }, [navigate, restricted]);

  return Auth.isAuthenticated() && restricted ? (
    <>loading...</>
  ) : (
    <Component {...rest} />
  );
}

export default PublicRoute;
