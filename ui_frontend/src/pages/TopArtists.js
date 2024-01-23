import React, { useState, useEffect } from 'react';
import { Flex } from "@tremor/react";
import TopArtistsShort from './TopArtistsShort';

import {
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    Text,
  } from "@tremor/react";


//Top artists page
const TopArtists = () => {
  return (
      <div className='tab'>
    <div className='tab'>
      <Flex justifyContent="center" alignItems="center">
      <TabGroup>
        <TabList className="mt-8">
        <Tab >Short Term</Tab>
          <Tab >Medium Term</Tab>
          <Tab >Long Term</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TopArtistsShort term="short_term"> 
            </TopArtistsShort> 
          </TabPanel>
          <TabPanel>
          <TopArtistsShort term="medium_term"> 
            </TopArtistsShort>  
          </TabPanel>
          <TabPanel>
          <TopArtistsShort term="long_term"> 
          </TopArtistsShort>  
          </TabPanel>
        </TabPanels>
      </TabGroup>
      </Flex>
      </div>
      </div>
  );


};

export default TopArtists;
