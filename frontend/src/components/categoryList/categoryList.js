import React from 'react';
import "./categoryList.css"
import categoryService from '../../services/category.service';
import {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import plus from '../../images/Plus.png'
import minus from "../../images/Minus.png"

function CategoryList({filter}) {
    const [categories, setCategories] = useState();
    const [show, setShow] = useState([]);
    let mainContainer = "list"
    let listContainer = "listItem"
    function showSubcategories(event){
        let showArray = [...show]
        let index = event.target.id - 1;
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
            categoryService.getCategoriesWithSubcategories()
                .then((response) => {
                    setCategories(response.data)
                    setShow(new Array(response.data.length).fill(false))
                    /*if(filter){
                        let selected = response.data.find(element => element.category.name.toLowerCase() === filter.toLowerCase());
                        let showArray = [...show];
                        showArray[selected.category.id-1] = true;
                        setShow(showArray);
                        document.getElementsByClassName("showMore")[selected.category.id-1].src = minus;
                    }*/
                    })
                
        
    }, []);
    if (filter) {
        mainContainer += " filter";
        listContainer += "filter"
    }
    return (
        <div className={mainContainer}>
            <p>CATEGORIES</p>
            <ul className='category'>
                {categories && categories.map(cat => (
                    <div>
                        <div class={listContainer}>
                            <Link to={`/shop/${cat.category.name}`}>
                                <li key={cat.category.id}>{cat.category.name} </li>
                            </Link>
                            {filter &&
                            <img  id={cat.category.id} className="showMore" src={plus} onClick={showSubcategories}></img>
                            }
                            </div>
                            {filter && show[cat.category.id - 1] && cat.subcategories.map(sub => (
                            <ul className='listSubcategory'>
                                <li>{sub.name} ({sub.count})</li>
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
