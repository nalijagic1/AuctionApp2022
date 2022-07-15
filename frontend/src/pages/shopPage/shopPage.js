import React, {useState, useEffect, useRef} from 'react';
import CategoryList from '../../components/categoryList/categoryList';
import SearchResult from '../../components/searchResult/searchResult';
import {useParams,useLocation} from 'react-router-dom';
import './shopPage.css'
import productService from '../../services/product.service';
import Button from '../../components/button/button';

function ShopPage() {
    const param = useParams();
    const[products,setProducts] = useState([])
    const query = new URLSearchParams(useLocation().search);
    const word = query.get("search");
    const [count,setCount] = useState(9);
    let hasMore = useRef(true)
    let start = useRef(1);
    function showMore(){
        start.current+=1;
        setCount(9*start.current)
        console.log(count)
    }
    useEffect(() => {
        if(word){
            productService.getSearchResult(word,count).
                then((response) => {
                    setProducts(response.data);
                    if(response.data.length !== count) hasMore.current = false
                });
        }else{
            productService.getProductsFromCategory(param.category,count)
            .then((response) => {
                setProducts(response.data);
                if(response.data.length !== count) hasMore.current = false

            });
        }
        
    }, [param,word,count]);
    return (
        <div className="shopPage">
            <div class="shop">
            <CategoryList filter={param.category}/>
            <SearchResult results={products}/>
            </div>
            {hasMore.current &&
            <div className="explore">
                <Button className="exploreButton" lable="Explore More" onClick={showMore}/>
            </div>}
            
                    </div>
    );
}

export default ShopPage;
