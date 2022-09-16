import React from "react";
import Pagination from "@mui/material/Pagination";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import PaginationItem from "@mui/material/PaginationItem";
import { StyledEngineProvider } from "@mui/material/styles";
import "./auctionPagination.css";

function AuctionPagination({count,page = 1,onPageChange}) {
  return (
    <div className="pagePicker">
      <StyledEngineProvider injectFirst>
        <Pagination count={count}
        className="paging"
        page={page}
        shape="rounded"
        showFirstButton
        onChange={onPageChange}
        showLastButton
        renderItem={(item) => (
          <PaginationItem
            components={{ last: KeyboardDoubleArrowRightIcon, first: KeyboardDoubleArrowLeftIcon }}
            {...item}
          />
        )}/> 
      </StyledEngineProvider>
   </div>
  );
}

export default AuctionPagination;
