import React from 'react';
import "./categoryList.css"
import categoryService from '../../services/category.service';
import {useEffect, useState} from "react";
import {Link} from 'react-router-dom';

function CategoryList() {
    const [categories, setCategories] = useState()
    useEffect(() => {
        categoryService.getAll()
            .then((response) => {
                setCategories(response.data)
            });
    }, []);
    return (
        <div className="list">
            <p>CATEGORIES</p>
            <ul className='category'>
                {categories && categories.map(cat => (
                    <Link  to={`/shop/${cat.name}`}>
                    <li key={cat.id}>{cat.name}</li>
                    </Link>
                ))}
                <Link to="/shop/0">
                <li> All Categories</li>
                </Link>
            </ul>
        </div>
    );
}

export default CategoryList;
