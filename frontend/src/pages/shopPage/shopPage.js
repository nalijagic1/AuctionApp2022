import React, {useState, useEffect} from 'react';
import CategoryList from '../../components/categoryList/categoryList,';
import SearchResult from '../../components/searchResult/searchResult';
import {useParams} from 'react-router-dom';
import './shopPage.css'

function ShopPage() {
    
    const param = useParams();
    return (
        <div className="shopPage">
            <CategoryList/>
            <SearchResult category={param.categoryId}/>
        </div>
    );
}

export default ShopPage;
