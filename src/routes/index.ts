import jwt_decode from "jwt-decode";

type DecodedType = {
  id: string;
  iat: number;
  exp: number;
};

export const Auth = {
  isAuthenticated(cb?: any) {
    const token = localStorage.getItem("chat-app-token");
    if (!token) return false;
    try {
      const decoded: DecodedType = jwt_decode(token);
      if (!decoded.id || !decoded.iat || !decoded.exp) {
        return false;
      }
      if (decoded.exp < Date.now() / 1000) {
        cb();
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  },
};
