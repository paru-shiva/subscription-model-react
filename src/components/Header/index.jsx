import "./index.css";
import { FaUserCog } from "react-icons/fa";

const Header = () => {
  return (
    <div className="headerComponent">
      <img className="logoImage" src="tai.webp" />
      <FaUserCog className="admin" />
    </div>
  );
};

export default Header;
