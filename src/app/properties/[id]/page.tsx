"use client"

import { Layout } from '@/components/Layout'
import PropertyDetails from '@/components/Properties/PropertyInfo/PropertyDetails'
import SearchProperties from '@/components/SearchProperties'
import { fetchPropertyById } from '@/lib/features/properties/propertiesSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { errorToast } from '@/utils/CustomToast'
import { Box, Text, Stack, Grid, GridItem, Spinner } from '@chakra-ui/react'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

const Property = () => {
  const { id } = useParams();
    const dispatch = useAppDispatch()
    const {data, loading} = useAppSelector((state)=>state.properties.propertyDetail)
    
    useEffect(() => {
      if(!id){
          errorToast("Invalid Property Id")
          return;
      }
      const propertyId = Array.isArray(id) ? id[0] : id;
      if (propertyId) {
        dispatch(fetchPropertyById(propertyId));
      }
    }, [id, dispatch]);
  
    if (loading) return <Spinner size="xl"/>
    if (!data) return(<Layout><Text w={{ base: "100%", md: "1000px" }} mx="auto" color="#074C98" my="5rem" fontSize="24px" px={{base: "1rem", md: "0rem"}}>No Property Found.</Text></Layout>);
  return (
    <Layout>
        <Box w={{ base: "100%", md: "1100px" }} m="auto" mb="5rem">
            <Stack>
                <Grid templateColumns="repeat(3, 1fr)" display="none">
                  <GridItem colSpan={2}>
                    <SearchProperties variant="searchbar" cat={['Sale', 'Rent', 'Joint Venture']}/>
                  </GridItem>
                  <GridItem/>
                </Grid>
                <PropertyDetails property={data}/>
            </Stack>
        </Box>
    </Layout>
  )
}

export default Property;