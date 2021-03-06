import { Navigate, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ path, ...props }) => {
  const { token } = useSelector((state) => state.auth);

  return (
    <div>
      {token ? (
        <Route path={path} {...props} />
      ) : (
        <Navigate state={{ from: path }} replace to="/login" />
      )}
    </div>
  );
};

export default PrivateRoute;
