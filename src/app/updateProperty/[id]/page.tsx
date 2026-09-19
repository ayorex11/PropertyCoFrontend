"use client"

import { Layout } from '@/components/Layout'
import PropertyEdit from '@/components/Properties/EditProperty/page'
import { fetchPropertyById } from '@/lib/features/properties/propertiesSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { mapPropertyToFormPayload } from '@/lib/types'
import { errorToast } from '@/utils/CustomToast'
import { Box, Text, Stack, Spinner } from '@chakra-ui/react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const EditProperty = () => {
    const [propId, setPropId] = useState<string>("")
    const { id } = useParams()
    const { data, loading } = useAppSelector((state) => state.properties.propertyDetail)
    const propData = mapPropertyToFormPayload(data!)
    const dispatch = useAppDispatch()
    useEffect(()=>{
        if(!id){
            errorToast("Invalid Property Id")
            return;
        }
        const propertyId = Array.isArray(id) ? id[0] : id;
        if (propertyId) {
            dispatch(fetchPropertyById(propertyId));
            setPropId(propertyId);
        }
    },[dispatch, id])
    if (loading) return <Spinner size="xl"/>
    if (!data) return <Text w={{ base: "100%", md: "1000px" }} mx="auto" color="#074C98" my="5rem" fontSize="24px" px={{base: "1rem", md: "0rem"}}>No Property Found.</Text>;
  return (
    <Layout>
        <Box w={{ base: "100%", md: "1100px"}} m="auto" mb="5rem">
            <Stack>
                <Box p="1rem" bg="#ECECEC" borderRadius="25px">
                    <Text color="#000048" fontSize="32px" m="auto" pl="40px" fontWeight={500}>Edit Property</Text>
                </Box>
                <PropertyEdit defaultValues={propData} id={propId}/>
            </Stack>
        </Box>
    </Layout>
  )
}

export default EditProperty;