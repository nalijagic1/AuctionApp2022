import React from 'react';
import "./categoryList.css"
import categoryService from '../../services/category.service';
import {useEffect, useState} from "react";

function CategoryList() {
    const [categories, setCategories] = useState();
    useEffect(() => {
        categoryService.getAll()
            .then((response) => {
                setCategories(response.data);
            });
    }, []);
    return (
        <div className="list">
            <p>CATEGORIES</p>
            <ul className='category'>
                {categories && categories.map(cat => (
                    <li key={cat.id}>{cat.name}</li>
                ))}
                <li> All Categories</li>
            </ul>
        </div>
    );
}

export default CategoryList;
