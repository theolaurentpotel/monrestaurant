import '../styles/Article.css'

function Article({ image, name, price, ingredients, onAdd }) {
  return (
    <article className="article-card">
      <div className="article-image">
        <img src={image} alt={name} />
      </div>
      <div className="article-content">
        <h3>{name}</h3>
        <p className="price">{price} €</p>
        <div className="ingredients">
          {ingredients.map((ingredient, index) => (
            <span key={index} className="ingredient-tag">{ingredient}</span>
          ))}
        </div>
        <button className="add-button" onClick={onAdd}>Ajouter au panier</button>
      </div>
    </article>
  )
}

export default Article
