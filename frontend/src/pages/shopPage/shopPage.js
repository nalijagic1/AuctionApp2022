import React, {useState, useEffect} from 'react';
import CategoryList from '../../components/categoryList/categoryList';
import SearchResult from '../../components/searchResult/searchResult';
import {useParams,useLocation} from 'react-router-dom';
import './shopPage.css'
import productService from '../../services/product.service';

function ShopPage() {
    const param = useParams();
    const[products,setProducts] = useState([])
    const query = new URLSearchParams(useLocation().search);
    const word = query.get("search");
    useEffect(() => {
        if(word){
            productService.getSearchResult(word).
                then((response) => {
                    setProducts(response.data);
                });
        }else{
            productService.getProductsFromCategory(param.category)
            .then((response) => {
                setProducts(response.data);

            });
        }
        
    }, [param,word]);
    return (
        <div className="shopPage">
            <div class="shop">
            <CategoryList filter="filter"/>
            <SearchResult results={products}/>
            </div>
                    </div>
    );
}

export default ShopPage;
