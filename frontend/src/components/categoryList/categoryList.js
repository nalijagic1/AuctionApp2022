import React from 'react';
import "./categoryList.css"
import categoryService from '../../services/category.service';
import {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import plus from '../../images/Plus.png'
import minus from "../../images/Minus.png"
import subcategoryService from '../../services/subcategory.service';

function CategoryList({filter}) {
    const [categories, setCategories] = useState();
    const [subcategories, setSubcategories] = useState([]);
    const [show, setShow] = useState([]);
    let mainContainer = "list"
    let listContainer = "listItem"
    let showArray = [...show]
    function showSubcategories(event){
        let index = event.target.value;
        if (event.target.src === plus) {
            event.target.src = minus;
            showArray[index] = true
        } else {
            event.target.src = plus;
            showArray[index] = false;
        }
        setShow(showArray);
    }

    useEffect(() => {
        if (!categories) {
            categoryService.getAll()
                .then((response) => {
                    setCategories(response.data)
                    response.data.forEach((category) => {
                         subcategoryService.getSubcategoriesFromCategory(category.id).then((res) => {
                            subcategories.push(res.data)
                            show.push(false)
                            setSubcategories(subcategories)
                            setShow(show);
                        })
                    })
                });
        }
        
    }, [categories]);
    if (filter) {
        mainContainer += " " + filter;
        listContainer += filter
    }
    return (
        <div className={mainContainer}>
            <p>CATEGORIES</p>
            <ul className='category'>
                {categories && categories.map(cat => (
                    <div>
                        <div class={listContainer}>
                            <Link to={`/shop/${cat.name}`}>
                                <li key={cat.id}>{cat.name} </li>
                            </Link>
                            {filter &&
                            <img  value={cat.id} className="showMore" src={plus} onClick={showSubcategories}></img>
                            }
                        </div>
                        {filter && show[cat.id - 1] && subcategories[cat.id - 1].map(sub => (
                            <ul className='listSubcategory'>
                                <li>{sub.name}</li>
                            </ul>
                        ))


                        }
                    </div>

                ))}
                <Link to="/shop/0">
                    <li> All Categories</li>
                </Link>
            </ul>
        </div>
    );
}

export default CategoryList;
