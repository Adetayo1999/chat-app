import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Auth } from ".";

type PrivateRouteType = {
  component: any;
};

function PrivateRoute({ component: Component, ...rest }: PrivateRouteType) {
  const navigate = useNavigate();
  useEffect(() => {
    if (
      !Auth.isAuthenticated(() => {
        toast.error("Session expired..");
      })
    ) {
      navigate("/login");
    }
  }, [navigate]);
  return Auth.isAuthenticated() ? <Component {...rest} /> : <>loading...</>;
}

export default PrivateRoute;
