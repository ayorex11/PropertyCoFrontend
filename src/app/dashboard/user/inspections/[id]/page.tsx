"use client";

import { fetchInspectionById } from "@/lib/features/inspections/inspectionsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { HStack, Spinner, Stack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { errorToast } from "@/utils/CustomToast";
import { formatDateToReadableGB } from "@/utils/converters";
import { timeslotOptions } from "@/components/options";
import { PropertyCard } from "@/components/Card";

const UserInspectionDetails = () => {
    const { id } = useParams()
  const { data, loading } = useAppSelector((state) => state.inspections.inspectionDetail);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if(!id){
        errorToast("Invalid Inspection Id")
        return;
    }
    const inspectionId = Array.isArray(id) ? id[0] : id;
    if (inspectionId) {
        dispatch(fetchInspectionById(inspectionId));
    }
  }, [id, dispatch]);
  if (loading) return <Spinner size="xl"/>
    if (!data) return(<Text w={{ base: "100%", md: "1000px" }} mx="auto" p="2rem 4rem" color="#074C98" my="5rem" fontSize="24px" px={{base: "1rem", md: "0rem"}}>No Inspection Found.</Text>);
  return (
    <Stack p={{base: "2rem 0rem", md: "2rem 4rem"}} gap={10}>
      <Text fontWeight={500} fontSize="30px" textAlign={{base: "center", md: "left"}}>
        Inspection ID {data.inspection_id}
      </Text>
      <HStack gap={10} justifyContent={{base: "center", md: "left"}}>
        <Text fontSize="19px" bg="#B1CFEF" textAlign="center" fontFamily="var(--font-barlow)" p="5px 20px">
            {formatDateToReadableGB(data.date_created)}
        </Text>
        <Text fontSize="22px">
            {timeslotOptions.find((slot) => slot.value === data.timeslot)?.label}
        </Text>
      </HStack>
      <Stack gap={5}>
        {data.prop_1 && (
          <Stack gap={5}>
            <HStack gap={10} justifyContent={{base: "center", md: "left"}}>
              <Text fontWeight={600} fontSize="22px">Property 1</Text>
              <Text fontSize="14px">PID: {data.prop_1.prop.property_id}</Text>
            </HStack>
            <PropertyCard property={data.prop_1.prop} variant="inspection"/>
          </Stack>
        )}
        {data.prop_2 && (
            <Stack gap={5}>
              <HStack gap={10} justifyContent={{base: "center", md: "left"}}>
                <Text fontWeight={600} fontSize="22px">Property 2</Text>
                <Text fontSize="14px">PID: {data.prop_2.prop.property_id}</Text>
              </HStack>
              <PropertyCard property={data.prop_2.prop} variant="inspection"/>
            </Stack>
        )}
        {data.prop_3 && (
            <Stack gap={5}>
              <HStack gap={10} justifyContent={{base: "center", md: "left"}}>
                <Text fontWeight={600} fontSize="22px">Property 3</Text>
                <Text fontSize="14px">PID: {data.prop_3.prop.property_id}</Text>
              </HStack>
              <PropertyCard property={data.prop_3.prop} variant="inspection"/>
            </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default UserInspectionDetails;
