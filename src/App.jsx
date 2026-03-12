import { useReducer, useContext } from 'react'
import Header from './components/Header'
import Nav from './components/Nav'
import Article from './components/Article'
import Footer from './components/Footer'
import Cart from './components/Cart'
import './App.css'
import SearchContext from './context/SearchContext'

function cartReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, action.item]
    case 'remove': {
      const index = state.findIndex(i => i.id === action.item.id)
      if (index === -1) return state
      const newState = [...state]
      newState.splice(index, 1)
      return newState
    }
    default:
      return state
  }
}

function App() {
  const [cartItems, dispatch] = useReducer(cartReducer, [])
  const [showCart, setShowCart] = useReducer((s) => !s, false)

  const {
    keyword,
    setKeyword,
    category,
    setCategory,
    tag,
    setTag,
    maxPrice,
    setMaxPrice,
  } = useContext(SearchContext)

  const categories = ['Burger', 'Pizza', 'Kebab', 'Poulet rôti', 'Accompagnements', 'Desserts', 'Boissons']

  const menuItems = [
    {
      id: 1,
      name: 'Pizza Margarita',
      category: 'Pizza',
      price: 11,
      image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=300&h=300&fit=crop',
      ingredients: ['Tomate', 'Champignons', 'Emmental']
    },
    {
      id: 2,
      name: 'Burger',
      category: 'Burger',
      price: 10,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop',
      ingredients: ['Boeuf', 'Tomate', 'Oignons', 'Cornichons']
    },
    {
      id: 3,
      name: 'Frites',
      category: 'Accompagnements',
      price: 4,
      image: 'https://eu-images.contentstack.com/v3/assets/blt5004e64d3579c43f/blt130eb8978cc923bf/615db7e9b084d018488c0a1e/3010.jpg?width=1200&height=630&crop=1200:630',
      ingredients: ['Frites', 'Accompagnements']
    },
    {
      id: 4,
      name: 'Club sandwich + frites',
      category: 'Burger',
      price: 13,
      image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=300&h=300&fit=crop',
      ingredients: ['Tomate', 'Frites', 'Emmental']
    },
    {
      id: 5,
      name: 'Poulet frit',
      category: 'Poulet rôti',
      price: 10,
      image: 'https://uploads.lebonbon.fr/source/2021/february/2006417/istock-452813985_2_1000.jpg',
      ingredients: ['Poulet']
    },
    {
      id: 6,
      name: 'Kebab rouleau + frites',
      category: 'Kebab',
      price: 14,
      image: 'https://www.cargest.com/wp-content/uploads/2025/02/rouleau-kebab-halal.webp',
      ingredients: ['Agneau', 'Frites', 'Oignons']
    }
  ]

  // compute set of unique tags for sidebar
  const allTags = Array.from(new Set(menuItems.flatMap(i => i.ingredients)))

  const filteredMenuItems = menuItems.filter(item => {
    if (category && item.category !== category) return false
    if (tag && !item.ingredients.includes(tag)) return false
    if (maxPrice !== null && maxPrice !== '' && item.price > maxPrice) return false
    if (keyword) {
      const kw = keyword.toLowerCase()
      const inName = item.name.toLowerCase().includes(kw)
      const inCategory = item.category.toLowerCase().includes(kw)
      const inIngredients = item.ingredients.some(i => i.toLowerCase().includes(kw))
      if (!inName && !inCategory && !inIngredients) return false
    }
    return true
  })

  const addToCart = item => {
    dispatch({ type: 'add', item })
  }

  const removeFromCart = item => {
    dispatch({ type: 'remove', item })
  }

  const toggleCart = () => setShowCart()

  return (
    <div className="app">
      <Header />
      <Nav cartCount={cartItems.length} onCartClick={toggleCart} />
      <div className="content-container">
        <aside className="sidebar">
          <h2>Catégories</h2>
          <ul className="category-list">
            {categories.map((cat, index) => (
              <li key={index}>
                <button
                  className={cat === category ? 'active' : ''}
                  onClick={() => setCategory(category === cat ? '' : cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
          <div className="filter-section">
            <input
              type="text"
              placeholder="Recherche..."
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
            />
            <input
              type="number"
              min="0"
              placeholder="Prix max"
              value={maxPrice !== null ? maxPrice : ''}
              onChange={e => setMaxPrice(e.target.value ? Number(e.target.value) : null)}
            />
          </div>
          <div className="tag-list">
            <h4>Tags</h4>
            {allTags.map((t, i) => (
              <button
                key={i}
                className={t === tag ? 'active' : ''}
                onClick={() => setTag(tag === t ? '' : t)}
              >
                {t}
              </button>
            ))}
          </div>
        </aside>
        <main className="menu-grid">
          {filteredMenuItems.map(item => (
            <Article
              key={item.id}
              {...item}
              onAdd={() => addToCart(item)}
              onRemove={() => removeFromCart(item)}
              onTagClick={setTag}
            />
          ))}
        </main>
      </div>
      {showCart && <Cart items={cartItems} onClose={toggleCart} />}
      <Footer />
    </div>
  )
}

export default App
