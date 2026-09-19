'use client'
import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react';
import RightPropertyContainer from './RightPropertyContainer/page';
import LeftPropertyContainer from './LeftPropertyContainer/page';
import { Property } from '@/lib/types';

interface IProperty {
  property: Property;
}

const PropertyDetails = ({property}:IProperty) => {
  return (
    <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(6, 1fr)"}} gap={10}>
      <GridItem colSpan={{base: 1, md: 5}} color="#000048">
        <LeftPropertyContainer prop={property}/>
      </GridItem>
      <GridItem colSpan={1} color="#000048">
        <RightPropertyContainer/>
      </GridItem>
    </Grid>
  )
}

export default PropertyDetails;