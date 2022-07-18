import React, {useRef} from 'react';
import "./categoryList.css"
import categoryService from '../../services/category.service';
import {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import plus from '../../images/Plus.png'
import minus from "../../images/Minus.png"

function CategoryList({filter}) {
    const [categories, setCategories] = useState();
    const [refresh,setRefresh] = useState(0);
    let show = useRef([]);
    let expand = useRef([]);
    let mainContainer = "list"
    let listContainer = "listItem"
    let previousCategory = useRef(-1);
    const [sign, setSign] = useState(-1);
    let prodCat = useRef("");

    function showSubcategories(event) {
        let showArray = [...show.current];
        let expandArray = [...expand.current];
        let index = event.target.id-1;
       if (expand.current[index] === plus) {
            expandArray[index]= minus;
            showArray[index] = true;
        } else {
            expandArray[index] = plus;
            showArray[index] = false;
        }
        show.current = showArray;
        expand.current = expandArray;
        setRefresh(r => r + 1);
    }

    useEffect(() => {
        categoryService.getCategoriesWithSubcategories()
            .then((response) => {
                setCategories(response.data);
                if (filter) {
                    prodCat.current = "PRODUCT ";
                    if(sign === -1){
                         show.current = new Array(response.data.length).fill(false);
                        expand.current = new Array(response.data.length).fill(plus);
                    }
                    let selected = response.data.find(element => element.category.name.toLowerCase() === filter.toLowerCase());
                    let showArray = [...show.current];
                    if (selected) {
                        if (previousCategory.current !== -1 && previousCategory.current !== selected.category.id - 1) {
                            showArray[previousCategory.current] = false;
                            expand.current[previousCategory.current] = plus;
                        }
                        showArray[selected.category.id - 1] = true;
                        show.current = showArray;
                        if (previousCategory.current !== -1) {
                            expand.current[selected.category.id - 1] = minus;
                        } else setSign(1);
                        previousCategory.current = selected.category.id - 1;

                    } else {
                        if (previousCategory.current !== -1) {
                            showArray[previousCategory.current] = false;
                            expand.current[previousCategory.current] = plus;
                        }
                    }
                }
            })
        if (sign === 1) {
            expand.current[previousCategory.current] = minus;
        }

    }, [filter, sign, refresh]);
    if (filter) {
        mainContainer += " filter";
        listContainer += "filter";
    }
    return (
        <div className={mainContainer}>
            <p>{prodCat.current}CATEGORIES</p>
            <ul className='category'>
                {categories && categories.map(cat => (
                    <div key={cat.category.id}>
                        <div className={listContainer}>
                            <Link to={`/shop/${cat.category.name}`}>
                                <li>{cat.category.name} </li>
                            </Link>
                            {filter &&
                            <img id={cat.category.id} className="showMore" src={expand.current[cat.category.id-1]} onClick={showSubcategories}
                                 alt="sign"></img>
                            }
                        </div>
                        {filter && show.current[cat.category.id - 1] && cat.subcategories.map(sub => (
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
