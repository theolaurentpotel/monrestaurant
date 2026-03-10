import '../styles/Cart.css'

function Cart({ items, onClose }) {
  const grouped = items.reduce((acc, item) => {
    if (acc[item.id]) {
      acc[item.id].quantity += 1
    } else {
      acc[item.id] = { ...item, quantity: 1 }
    }
    return acc
  }, {})

  const total = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="cart-overlay">
      <div className="cart">
        <button className="close-btn" onClick={onClose}>&times; Retour</button>
        <h2>Votre panier</h2>
        {items.length === 0 ? (
          <p>Panier vide</p>
        ) : (
          <ul className="cart-list">
            {Object.values(grouped).map(i => (
              <li key={i.id} className="cart-item">
                <span>{i.name} x{i.quantity}</span>
                <span>{(i.price * i.quantity).toFixed(2)} €</span>
              </li>
            ))}
          </ul>
        )}
        <div className="cart-total">Total: {total.toFixed(2)} €</div>
      </div>
    </div>
  )
}

export default Cart
