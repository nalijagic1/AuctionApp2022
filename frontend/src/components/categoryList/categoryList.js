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
    let mainContainerClass = "list";
    let listContainerClass = "listItem";
    let previousCategory = useRef(-1);
    const [sign, setSign] = useState(-1);
    let prodCat = useRef("");

    function showSubcategories(index) {
        let showArray = [...show.current];
        let expandArray = [...expand.current];
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
                    let selected = response.data.find(element => element.category.name.toLowerCase() === filter.toLowerCase());
                    if (previousCategory.current !== -2 && (!selected  || previousCategory.current !== selected.category.id - 1)) {
                        show.current = new Array(response.data.length).fill(false);
                        expand.current = new Array(response.data.length).fill(plus);
                    }
                    if (selected) {
                        show.current[selected.category.id - 1] = true;
                        if (previousCategory.current < 0 ) {
                            expand.current[selected.category.id - 1] = minus;
                        } else setSign(1);
                        previousCategory.current = selected.category.id - 1;

                    } else {
                        if(previousCategory.current === -1) {
                            previousCategory.current = -2;
                            setSign(-2);
                        }
                    }
                }
            })
        if (sign === 1) {
            expand.current[previousCategory.current] = minus;
        }

    }, [filter, sign, refresh]);
    if (filter) {
        mainContainerClass += " filter";
        listContainerClass += "filter";
    }
    return (
        <div className={mainContainerClass}>
            <p>{prodCat.current}CATEGORIES</p>
            <ul className='category'>
                {categories && categories.map(cat => (
                    <div key={cat.category.id}>
                        <div className={listContainerClass}>
                            <Link to={`/shop/${cat.category.name}`}>
                                <li>{cat.category.name} </li>
                            </Link>
                            {filter &&
                            <img id={cat.category.id} className="showMore" src={expand.current[cat.category.id-1]} onClick={event => showSubcategories(event.target.id-1)}
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
