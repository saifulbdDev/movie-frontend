import { Link } from 'react-router-dom';
import { BiCameraMovie } from 'react-icons/bi';

import './footer.scss';

const Footer = () => {
  return (
    <div className="footer-container">
      <h2>
        <Link to="/">
          <BiCameraMovie />
          Moviepedia
        </Link>
      </h2>
      <span>
        
      </span>
    </div>
  );
};

export default Footer;
