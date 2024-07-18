import React, { useEffect, useContext } from 'react'
import { BASE_URL } from '../utils/config'
import AuthContext from '../context/AuthContext'
 
const DeleteRecipe = ({ id }) => {
const { token } = useContext(AuthContext);

useEffect (() => {
  const getRecipe = async () => {
      const response = await fetch.get(`${BASE_URL}/recipes/${id}`, {
        method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });
            const data = await response.json();
            console.log(data);
        }
        if (id) {
            getRecipe();
        }

    }, [token]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const deleteRecipe = async () => {
            const response = await fetch(`${BASE_URL}/recipes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify()
            });
            if (response.ok) {
                alert("Recipe deleted successfully!");
                window.location.reload();
            }
            else {
                alert("Failed to delete recipe!");
            }
        }
        deleteRecipe();
    }

  return (
    <div className="modal fade" id="deleteRecipe" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Recipe</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
<p>
                        <p>Are you sure you want to delete the recipe?</p></p>

      </div>
     <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleSubmit} type="submit" className="btn btn-primary">Delete</button>
                    </div>
    </div>
  </div>
</div>

  )
}

export default DeleteRecipe
