'use client'
import React, { useEffect } from 'react'
import Pagination from '../Pagination'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchProperties } from '@/lib/features/properties/propertiesSlice';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import RightSearchContainer from '../RightSearchContainer';
import { PropertyCard } from '../Card';

const PropertiesSale = () => {
    const {data, loading} = useAppSelector((state) => state.filteredProperties);
    const dispatch = useAppDispatch();
    useEffect(() => {
    dispatch(fetchProperties());
    }, [dispatch]);
  return (
    <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(6, 1fr)"}} gap={10}>
      <GridItem colSpan={{base: 1, md: 4}} color="#000048">
        <Pagination 
        data={data}
        resetTrigger={data.length}
        isLoading={loading}
        render={(property)=> (
          <Box mb="3rem">
            <PropertyCard key={property.id} property={property}/>
          </Box>
        )}
        />
      </GridItem>
      <GridItem colSpan={{base: 1, md: 2}}>
        <RightSearchContainer/>
      </GridItem>
    </Grid>
  )
}

export default PropertiesSale;
