import { Navigate, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ path, ...props }) => {
  const authToken = useSelector((state) => state.auth.token);

  return (
    <div>
      {authToken ? (
        <Route path={path} {...props} />
      ) : (
        <Navigate state={{ from: path }} replace to="/login" />
      )}
    </div>
  );
};

export default PrivateRoute;
