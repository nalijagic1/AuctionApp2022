import React, {useState, useEffect} from 'react';
import CategoryList from '../../components/categoryList/categoryList,';
import SearchResult from '../../components/searchResult/searchResult';
import {useParams} from 'react-router-dom';
import './shopPage.css'
import productService from '../../services/product.service';

function ShopPage() {
    const param = useParams();
    const[products,setProducts] = useState([])
    useEffect(() => {
        productService.getProductsFromCategory(param.categoryId)
            .then((response) => {
                setProducts(response.data);

            });
    }, [param]);
    return (
        <div className="shopPage">
            <div class="shop">
            <CategoryList/>
            <SearchResult results={products}/>
            </div>
                    </div>
    );
}

export default ShopPage;
