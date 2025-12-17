
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a to="/" className="navbar-logo">
          Glow Store
        </a>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <a to="/" className="navbar-a">
              Home
            </a>
          </li>
          <li className="navbar-item">
            <a to="/about" className="navbar-a">
              About
            </a>
          </li>
          <li className="navbar-item">
            <a to="/products" className="navbar-a">
              Products
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
