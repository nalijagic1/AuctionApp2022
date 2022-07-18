import React, {useState, useEffect, useRef} from 'react';
import CategoryList from '../../components/categoryList/categoryList';
import SearchResult from '../../components/searchResult/searchResult';
import {useParams, useLocation} from 'react-router-dom';
import './shopPage.css'
import productService from '../../services/product.service';
import Button from '../../components/button/button';
import PathBar from '../../components/pathBar/pathBar';

function ShopPage() {
    const param = useParams();
    const [products, setProducts] = useState([])
    const query = new URLSearchParams(useLocation().search);
    const word = query.get("search");
    const [count, setCount] = useState(9);
    let hasMore = useRef(true)
    let start = useRef(1);
    let previous = useRef("")
    let filter = "";
    if (word) {
        filter = word;
    } else filter = param.category;

    function showMore() {
        start.current += 1;
        setCount(9 * start.current)
    }

    useEffect(() => {
        const testIfChanged = ((change) => {
            if (previous.current !== change) setCount(9);
        })
        if (word) {
            testIfChanged(word)
            previous.current = word;
            productService.getSearchResult(word, count)
                .then((response) => {
                    setProducts(response.data);
                    if (response.data.length !== count) hasMore.current = false;
                    else hasMore.current = true;
                });
        } else {
            testIfChanged(param.category)
            previous.current = param.category
            productService.getProductsFromCategory(param.category, count)
                .then((response) => {
                    setProducts(response.data);
                    if (response.data.length !== count) hasMore.current = false;
                    else hasMore.current = true;

                });
        }

    }, [param, word, count]);
    return (
        <div className="shopPage">
            {word &&
            <PathBar prop={{name: "", startPoint: "Home", endPoint: `Search results for ${word}`}}></PathBar>
            }
            <div className="shop">
                <CategoryList filter={filter}/>
                <SearchResult results={products}/>
            </div>
            {hasMore.current &&
            <div className="explore">
                <Button className="exploreButton" lable="Explore More" onClick={showMore}/>
            </div>}

        </div>
    );
}

export default ShopPage;
