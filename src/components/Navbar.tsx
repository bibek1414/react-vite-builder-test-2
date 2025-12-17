
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          Glow Store
        </a>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <a href="/" className="navbar-a">
              Home
            </a>
          </li>
          <li className="navbar-item">
            <a href="/about" className="navbar-a">
              About
            </a>
          </li>
          <li className="navbar-item">
            <a href="/products" className="navbar-a">
              Products
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
