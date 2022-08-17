import React from 'react';
import './searchResult.css'
import { Link } from 'react-router-dom';
import Card from '../card/card';

function SearchResult({ results }) {
    return (
        <div className="result">
            {results.map(product => (
                <div key={results.id} className='resultItem'>
                    <Link to={`/product/${product.id}`}>
                        <Card name={product.name} productId={product.id}
                            price={product.startingPrice} />
                    </Link>
                </div>

            ))}
        </div>
    );
}

export default SearchResult;
