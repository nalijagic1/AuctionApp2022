import React, { useState, useEffect } from "react";
import productService from "../../services/product.service";
import { STATUS_CODES } from "../../utils/httpStatusCode";
import "./didYouMean.css";

function DidYouMean({ search }) {
  const [suggestion, setSuggestion] = useState();
  useEffect(() => {
    productService.getSuggestion(search).then((response) => {
      if (response.status === STATUS_CODES.OK) setSuggestion(response.data);
    });
  }, [search]);
  return (
    <div className="suggestion">
      {suggestion !== "" && (
        <div>
          Did you mean?
          <a href={"/shop?search=" + suggestion}>{suggestion}</a>
        </div>
      )}
    </div>
  );
}

export default DidYouMean;
