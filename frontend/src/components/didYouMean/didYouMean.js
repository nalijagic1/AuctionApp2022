import React, {useState, useEffect} from 'react';
import productService from '../../services/product.service';
import './didYouMean.css'

function DidYouMean({search}) {
    const [suggestion,setSuggestion] = useState();
    useEffect (() => {
            productService.getSuggestion(search)
            .then((response)=>{
                setSuggestion(response.data)
            });
    },[])
    return (
        <div className="did">
            Did you mean?
            <a href={"/shop?search="+suggestion}>{suggestion}</a>
        </div>
    );
}

export default DidYouMean; 
