import React from "react";
import "./categoryList.css";
import categoryService from "../../services/category.service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { TiPlus, TiMinus } from "react-icons/ti";
import { STATUS_CODES } from "../../utils/httpStatusCode";

function CategoryList({ filter, isLoading }) {
  const [categories, setCategories] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  function showSubcategories(selectedCategory) {
    if (location.pathname.includes(selectedCategory)) navigate("/shop/all");
    else navigate("/shop/" + selectedCategory);
  }

  useEffect(() => {
    isLoading(true);
    categoryService.getCategoriesWithSubcategories().then((response) => {
      if (response.status === STATUS_CODES.OK) {
        setCategories(response.data);
        isLoading(false);
      }
    });
  }, []);

  return (
    <div className={filter ? "list filter" : "list"}>
      <p>{filter ? "PRODUCT " : ""}CATEGORIES</p>
      <ul className="category">
        {categories &&
          categories.map((catagory) => (
            <div key={catagory.category.id}>
              <div
                className={filter ? "listItemfilter" : "listItem"}
                onClick={() => showSubcategories(catagory.category.name)}
              >
                <li>{catagory.category.name} </li>
                {filter && (
                  <div>
                    {filter === catagory.category.name ? (
                      <TiMinus className="icon" />
                    ) : (
                      <TiPlus className="icon" />
                    )}
                  </div>
                )}
              </div>
              {filter &&
                filter === catagory.category.name &&
                catagory.subcategories.map((sub) => (
                  <ul key={sub.id} className="listSubcategory">
                    <li>
                      {sub.name} ({sub.count})
                    </li>
                  </ul>
                ))}
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
