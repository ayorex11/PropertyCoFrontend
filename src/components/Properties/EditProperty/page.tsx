'use client'
import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react';
import RightSearchContainer from '@/components/RightSearchContainer';
import LeftEditProperty from './LeftEditContainer/page';
import { PropertyFormPayload } from '@/schemas/schema';

type PropertyFormProps = {
  defaultValues: PropertyFormPayload;
  id: string | number;
};

const PropertyEdit = ({defaultValues, id}: PropertyFormProps) => {
  return (
    <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(6, 1fr)"}} gap={10}>
      <GridItem colSpan={{base: 1, md: 4}} color="#000048" px="40px">
        <LeftEditProperty defaultValues={defaultValues} id={id}/>
      </GridItem>
      <GridItem colSpan={{base: 1, md: 2}}>
        <RightSearchContainer/>
      </GridItem>
    </Grid>
  )
}

export default PropertyEdit;
