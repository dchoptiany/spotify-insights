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



const TopTracks = () => {

  return (
      <div className='tab'>
    <div className='tab'>
      <Flex justifyContent="center" alignItems="center">
      <TabGroup>
        <TabList className="tabList">
          <Tab >Short Term</Tab>
          <Tab >Medium Term</Tab>
          <Tab >LongTerm</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
          <TopTracksShort> 
          </TopTracksShort>  
          </TabPanel>
          <TabPanel>
          <TopTracksShort> 
          </TopTracksShort>   
          </TabPanel>
          <TabPanel>
          <TopTracksShort> 
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
