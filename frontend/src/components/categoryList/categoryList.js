import React, {useRef} from 'react';
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
    let previousCategory = useRef(-1);
    let sign = useRef(-1);
    let prodCat = useRef("");
    function showSubcategories(event) {
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
        console.log(filter)
        categoryService.getCategoriesWithSubcategories()
            .then((response) => {
                setCategories(response.data)
                if (filter) {
                    prodCat.current ="PRODUCT "
                    setShow(new Array(response.data.length).fill(false))
                    let selected = response.data.find(element => element.category.name.toLowerCase() === filter.toLowerCase());
                    let showArray = [...show];
                    if (selected) {
                        if (previousCategory.current !== -1 && previousCategory.current !== selected.category.id - 1) {
                            showArray[previousCategory.current] = false;
                            document.getElementsByClassName("showMore")[previousCategory.current].src = plus;
                        }
                        showArray[selected.category.id - 1] = true;
                        setShow(showArray);
                        if (previousCategory.current !== -1) {
                            document.getElementsByClassName("showMore")[selected.category.id - 1].src = minus;
                        } else sign.current = 1
                        previousCategory.current = selected.category.id - 1

                    } else {
                        if (previousCategory.current !== -1) {
                            showArray[previousCategory.current] = false;
                            document.getElementsByClassName("showMore")[previousCategory.current].src = plus;
                        }
                    }
                }
            })
        if (sign.current === 1) {
            document.getElementsByClassName("showMore")[previousCategory.current].src = minus;
        }

    }, [filter, sign.current]);
    if (filter) {
        mainContainer += " filter";
        listContainer += "filter"
    }
    return (
        <div className={mainContainer}>
            <p>{prodCat.current}CATEGORIES</p>
            <ul className='category'>
                {categories && categories.map(cat => (
                    <div>
                        <div className={listContainer}>
                            <Link to={`/shop/${cat.category.name}`}>
                                <li key={cat.category.id}>{cat.category.name} </li>
                            </Link>
                            {filter &&
                            <img id={cat.category.id} className="showMore" src={plus} onClick={showSubcategories}></img>
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
                <Link to="/shop/all">
                    <li> All Categories</li>
                </Link>
            </ul>
        </div>
    );
}

export default CategoryList;
