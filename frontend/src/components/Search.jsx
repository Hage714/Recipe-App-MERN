import React, { useContext, useState } from 'react'
import { MyRecipesContext } from '../context/MyRecipesContext'
import { BASE_URL } from '../utils/config.jsx'


const Search = () => {
const [title, setTitle] = useState(null);
const { setRecipes } = useContext(MyRecipesContext);

const handleSearch = async (e) => {
    e.preventDefault();
console.log({title})

if (title) {
    const response = await fetch (`${BASE_URL}/recipes?title=${title}`)
    const data = await response.json();
    console.log(data);
    setRecipes(data);
}

};

  return (
    <div className="row">
      <div className="col-lg-6 offset-lg-3">
        <form className="form-inline" onSubmit={handleSearch}>
          <input className="form-control mr-sm-2 fw-bold" type="search" placeholder="Search recipes..." value={title} onChange={(e) => setTitle(e.target.value)} aria-label="Search" style={{ width: 'auto' }} />
          <input type='submit' hidden />
        </form>
      </div>
    </div>
  )
}

export default Search
