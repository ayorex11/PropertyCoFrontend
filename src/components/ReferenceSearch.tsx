"use client"
import { Group, Input, Button, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchProperties } from "@/lib/features/properties/propertiesSlice";

const ReferenceSearch = () => {
  const[refId, setRefId] = useState<string>("")
  const[propId, setPropId] = useState<number | undefined>(0)
  const {data, loading} = useAppSelector((state) => state.properties.properties)

  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(fetchProperties());
  }, [dispatch])
  
  useEffect(()=>{
    if(refId){
      const id = data.find((prop) => prop.property_id === refId)?.id
      setPropId(id)
    }
  },[data, refId])
  if(loading) return <Spinner size="xl"/>
  if(!data) return null;
  return (
    <Group attached w={{base: "100%", md: "sm"}} maxW={{base: "100%", md: "sm"}} flex={1}>
      <Input
        flex="1"
        placeholder="Enter Property Ref. No."
        bg="#FFFFFF"
        color="#000048"
        border="2px solid #4169E0"
        borderLeftRadius="10px"
        value={refId}
        onChange={(e)=>setRefId(e.target.value)}
      />
      <Link href={refId ? `/properties/${propId}` : "/properties"}>
        <Button
          bg="#4169E0"
          variant="plain"
          border="2px solid #4169E0"
          borderLeftRadius="0px"
          borderRightRadius="10px"
        >
          <LuSearch color="#FFFFFF" />
        </Button>
      </Link>
    </Group>
  );
};

export default ReferenceSearch;
