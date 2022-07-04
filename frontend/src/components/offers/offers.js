import React from 'react';
import { Tab,Tabs } from '@mui/material';
function ProductHighlight() {
  return(
    <div className="highlight">
      <Tabs
  variant="scrollable"
  scrollButtons={false}
  aria-label="scrollable prevent tabs example">
  <Tab label="New Arrivals" value="1" />
  <Tab label="Last Chance"  value ="2"/>

</Tabs>
    </div>
  );
}

export default ProductHighlight;