import React, { useState, useEffect } from 'react';
import { Flex } from "@tremor/react";
import TopTracksShort from './TopTracksShort';

import {
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    Text,
  } from "@tremor/react";


//Top artists page
//It shows data in short trem, medium term and long term
const TopTracks = () => {

  return (
      <div className='tab'>
    <div className='tab'>
      <Flex justifyContent="center" alignItems="center">
      <TabGroup>
        <TabList className="tabList">
          <Tab >Short Term</Tab>
          <Tab >Medium Term</Tab>
          <Tab >Long Term</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
          <TopTracksShort term="short_term"> 
          </TopTracksShort>  
          </TabPanel>
          <TabPanel>
          <TopTracksShort term="medium_term"> 
          </TopTracksShort>   
          </TabPanel>
          <TabPanel>
          <TopTracksShort term="long_term"> 
          </TopTracksShort>  
          </TabPanel>
        </TabPanels>
      </TabGroup>
      
      </Flex>
      </div>

        </div>
    
    
  );


};

export default TopTracks;
