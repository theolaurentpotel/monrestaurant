import '../styles/Nav.css'

function Nav({ cartCount = 0, onCartClick }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <span className="nav-brand">Mon Restaurant</span>
        <ul className="nav-menu">
          <li><a href="#menu">Menu</a></li>
          <li>
            <button className="cart-btn" onClick={onCartClick}>
              Panier ({cartCount})
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav
