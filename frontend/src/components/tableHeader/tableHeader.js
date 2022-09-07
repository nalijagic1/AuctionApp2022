import React, { useState } from "react";
import Checkbox from "../checkbox/checkbox";
import SortFilter from "../sortFilter/sortFilter";
import {TbDotsVertical} from "react-icons/tb"
import "./tableHeader.css";

function TableHeader() {

  return (
    <div className="tableHeader">
        <Checkbox/>
        <SortFilter label="Full name" width="150px"/>
        <SortFilter label="Date of creation" width="180px"/>
        <SortFilter label="Email" width="150px"/>
        <SortFilter label="Mobile Number" enableSort={false}/>
        <SortFilter label ="Location" enableSort={false} width="190px"/>
        <SortFilter label="Status"  width="100px" enableSort={false}/>
        <SortFilter label ="Status update"/>
        <TbDotsVertical className="moreIcon"/>
    </div>
  );
}

export default TableHeader;
