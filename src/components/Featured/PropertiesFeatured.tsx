"use client";
import React, { useEffect } from "react";
import Pagination from "../Pagination";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchFeaturedProperties } from "@/lib/features/properties/propertiesSlice";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import RightSearchContainer from "../RightSearchContainer";
import { FeaturedCard } from "../Card";

const PropertiesFeatured = () => {
  const { data, loading } = useAppSelector(
    (state) => state.properties.featuredProperties
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFeaturedProperties());
  }, [dispatch]);
  return (
    <Grid
      templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(6, 1fr)" }}
      gap={10}
    >
      <GridItem colSpan={{ base: 1, md: 4 }} color="#000048">
        <Pagination
          type="featured"
          data={data}
          resetTrigger={data.length}
          title="Properties"
          emptyMessage="No Property available..."
          isLoading={loading}
          render={(property) => (
            <Box px="0rem">
              <FeaturedCard key={property.id} props={property} />
            </Box>
          )}
        />
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 2 }}>
        <RightSearchContainer />
      </GridItem>
    </Grid>
  );
};

export default PropertiesFeatured;
