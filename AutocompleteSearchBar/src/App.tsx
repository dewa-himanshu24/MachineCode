import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

interface Recipe {
  id: number;
  name: string;
  image: string;
}

interface RecipeResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}
function App() {
  const [input, setInput] = useState<string>('');
  const [recipes, setRecipies] = useState<Recipe[]>([]);
  const [showOptions, setShowOptions] = useState<Boolean>(false);
  const [cache, setCache] = useState<Record <string, Recipe[]>>({});

  const fetchRecipies = async (input: string) => {

    if (cache[input]) {
      setRecipies(cache[input]);
      return;
    }

    try{
      const response = await axios.get<RecipeResponse>(`https://dummyjson.com/recipes/search?q=${input}`);
      setRecipies(response.data.recipes);
      setCache((prev) => ({...prev, [input]: response.data.recipes}))
    } catch(err) {
      console.error('Error fetching recipes:', err);
    }
  }

  useEffect(() => {

    const timer = setTimeout(() => fetchRecipies(input)
    , 400)

    return () => clearInterval(timer);
  },[input]);

  return (
    <div className="autocomplete-container">
      <h1>Auto Complete Search Bar</h1>
      <div className='recipes-container'>
        <input type="text" className="search-input" value={input} onChange={(e) => setInput(e.target.value)} onFocus={() => setShowOptions(true)} onBlur={() => setShowOptions(false)} />
        {showOptions && <div className="recipes">
          {recipes.map((recipe) => (
            <div key={recipe.id} className='recipe'>{recipe.name}</div>
          ))}
        </div>}
      </div>
    </div>
  )
}

export default App
