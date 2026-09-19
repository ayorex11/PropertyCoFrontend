"use client";

import { PropertyCard } from "@/components/Card";
import Pagination from "@/components/Pagination";
import { fetchSavedProperties } from "@/lib/features/savedProperties/savedPropertiesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Box, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";

const UserSavedProperties = () => {
  const { savedProperties, loading } = useAppSelector((state) => state.savedProperties);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSavedProperties());
  }, [dispatch]);
  return (
    <Box bg="#F5F5F5" pb="2rem">
      <Text p={{base: "2rem 1rem", md: "2rem 4rem"}} fontWeight={500} fontSize="30px">
        Saved Properties
      </Text>
      <Pagination
        data={savedProperties}
        resetTrigger={savedProperties.length}
        title="Saved Properties"
        emptyMessage="No Saved Property available..."
        isLoading={loading}
        render={(savedProperty) => (
          <Box p="2rem 4rem">
            <PropertyCard
              property={savedProperty.prop}
              savePropId={savedProperty.id}
              variant="favorites"
              remove
            />
          </Box>
        )}
      />
    </Box>
  );
};

export default UserSavedProperties;
