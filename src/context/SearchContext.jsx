import { useState, createContext } from 'react'
// createContext nous permet de mettre en place un context partageable entre les components
// useState permet de créer une variable d'état dans un component

const SearchContext = createContext()

export function SearchProvider({children}) {
    // on crée un fournisseur 
    // afin de rendre le context disponibles au éléments enfants

    // état pour tous les filtres
    const [keyword, setKeyword] = useState("")
    const [category, setCategory] = useState("")
    const [tag, setTag] = useState("")
    const [maxPrice, setMaxPrice] = useState(null)

    return (
        <SearchContext.Provider
            value={{
                keyword,
                setKeyword,
                category,
                setCategory,
                tag,
                setTag,
                maxPrice,
                setMaxPrice,
            }}
        >
            {/* value contient les données accessibles depuis le context */}

            {children}
            {/* children représente les éléments enfant qui auront accès au context */}

        </SearchContext.Provider>
    )

}

export default SearchContext