import { Link } from "react-router-dom";

import notFound from "../../assets/page_not_found.svg";

import "./NotFound.css";

const NotFound = () => {
  return (
    <div>
      <img src={notFound} alt="404 photo" className="notFound-image" />
      <h2>Oops! The page you're looking for, does not exist</h2>
      <Link to="/">
        <button className="btn btn-primary">Go to Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
