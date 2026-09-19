'use client'
import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react';
import RightSearchContainer from '@/components/RightSearchContainer';
import LeftRequestProperty from './LeftRequestContainer/page';

const PropertyRequest = () => {
  return (
    <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(6, 1fr)"}} gap={10}>
      <GridItem colSpan={{base: 1, md: 4}} color="#000048" px="40px">
        <LeftRequestProperty/>
      </GridItem>
      <GridItem colSpan={{base: 1, md: 2}}>
        <RightSearchContainer/>
      </GridItem>
    </Grid>
  )
}

export default PropertyRequest;
