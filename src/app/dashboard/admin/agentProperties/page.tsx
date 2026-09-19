"use client";

import { PropertyCard } from "@/components/Card";
import Pagination from "@/components/Pagination";
import { fetchUnapprovedProperties } from "@/lib/features/properties/propertiesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Box, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";

const AdminAgentProperties = () => {
  const { data, loading } = useAppSelector((state) => state.properties.unapprovedProperties);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUnapprovedProperties());
  }, [dispatch]);
  return (
    <Box pb="2rem">
      <Text p={{base: "2rem 1rem", md: "2rem 4rem"}} fontWeight={500} fontSize="30px">
        Agent Properties
      </Text>
      <Pagination
        data={data}
        resetTrigger={data.length}
        title="Properties"
        emptyMessage="No Property available..."
        isLoading={loading}
        render={(prop) => (
          <Box p={{base: "2rem 0rem", md: "2rem 4rem"}}>
            <PropertyCard
              property={prop}
              variant="agentProperties"
            />
          </Box>
        )}
      />
    </Box>
  );
};

export default AdminAgentProperties;
