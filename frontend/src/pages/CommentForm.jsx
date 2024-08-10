import React, { useState } from 'react';
import { BASE_URL } from "../utils/config";


const CommentForm = ({ selectedRecipe, onCommentAdded }) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(1);
console.log(selectedRecipe)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const commentData = { comment, rating };
            console.log('commentData:', commentData);
            
            
            const response = await fetch(`${BASE_URL}/comments/${selectedRecipe._id}`, { comment, rating }, {
                headers: {"content-type": 'application/json'}
                
            });

            onCommentAdded(response.data);
            setComment('');
            setRating(1);
            
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Rating:</label>
                <select value={rating} onChange={(e) => setRating(e.target.value)}>
                    {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Comment:</label>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default CommentForm;
