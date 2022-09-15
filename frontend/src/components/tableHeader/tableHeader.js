import React from "react";
import Checkbox from "../checkbox/checkbox";
import SortFilter from "../sortFilter/sortFilter";
import {TbDotsVertical} from "react-icons/tb"
import "./tableHeader.css";

function TableHeader({setChecked,checked,setSort}) {
  return (
    <div className="tableHeader">
        <Checkbox checked ={checked} onChange={(checked)=>setChecked(checked)}/>
        <SortFilter label="Full name" width="150px" type="alphabet" field="last_name" sortId ="fullName"onSelect={(sort) => setSort(sort)}/>
        <SortFilter label="Date of creation" width="180px" type="date" field="first_log_in"  sortId ="dateOfCreation" onSelect={(sort) => setSort(sort)}/>
        <SortFilter label="Email" width="150px" type="alphabet" field="email" sortId="email" onSelect={(sort) => setSort(sort)}/>
        <SortFilter label="Mobile Number" enableSort={false}/>
        <SortFilter label ="Location" enableSort={false} width="190px"/>
        <SortFilter label="Status"  width="100px" enableSort={false}/>
        <SortFilter label ="Status update" type="date" field ="status_update" sortId="statusUpdate" onSelect={(sort) => setSort(sort)}/>
        <TbDotsVertical className="moreIcon"/>
    </div>
  );
}

export default TableHeader;
