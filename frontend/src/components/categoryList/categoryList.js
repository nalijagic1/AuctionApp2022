import React from 'react';
import "./categoryList.css"
import categoryService from '../../services/category.service';
import {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom'
import {TiPlus, TiMinus} from 'react-icons/ti';

function CategoryList({filter}) {
    const [categories, setCategories] = useState();
    const navigate = useNavigate();
    const location = useLocation();

    function showSubcategories(selectedCategory) {
        if(location.pathname.includes(selectedCategory)) navigate("/shop/all");
        else navigate("/shop/" + selectedCategory);
    }

    useEffect(() => {
        categoryService.getCategoriesWithSubcategories()
            .then((response) => {
                setCategories(response.data);
            })
    }, []);

    return (
        <div className={filter ? "list filter" : "list"}>
            <p>{ filter ? "PRODUCT " : ""}CATEGORIES</p>
            <ul className='category'>
                {categories && categories.map(cat => (
                    <div key={cat.category.id}>
                        <div className={filter ? "listItemfilter" : "listItem"} onClick={() => showSubcategories(cat.category.name)}>
                                <li>{cat.category.name} </li>
                                {filter &&
                                    <div>{filter === cat.category.name ? <TiMinus className='icon' style={{fontSize: 16, color: '#252525'}}/> : <TiPlus  className='icon' style={{fontSize: 16, color: '#252525'}}/>}</div>
                                }
                        </div>
                        {filter && filter === cat.category.name &&  cat.subcategories.map(sub => (
                            <ul  key = {sub.id} className='listSubcategory'>
                                <li>{sub.name} ({sub.count})</li>
                            </ul>
                        ))


                        }


                    </div>

                ))}
                <Link to="/shop/all">
                    <li> All Categories</li>
                </Link>
            </ul>
        </div>
    );
}

export default CategoryList;
