"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchProperties } from "@/lib/features/properties/propertiesSlice";
import { Box, Spinner, Text, Stack, VStack, Button } from "@chakra-ui/react";
import { FeaturedCard } from "@/components/Card";
import { Layout } from "@/components/Layout";
import Link from "next/link";

const SimilarProperties = () => {
  const { data, loading } = useAppSelector((state) => state.filteredProperties);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);
  if (loading) return <Spinner size="xl"/>
  if (!data) return(<Layout><Text w={{ base: "100%", md: "1000px" }} mx="auto" color="#074C98" my="5rem" fontSize="24px">No Property Found.</Text></Layout>);
  return (
    <Stack>
      <Text textAlign="center" fontWeight={600} fontSize="16px">Similar Properties</Text>
      {data.slice(0, 2).map((property, index)=>(
          <Box mb="1rem" key={index} color="#000048" bg="#ECECEC" p="2rem 1rem" w="300px">
              <FeaturedCard key={property.id} props={property} />
          </Box>
      ))}
      <VStack>
        <Link href="/properties">
          <Button bg="#4169E0">
            View More
          </Button>
        </Link>
      </VStack>
    </Stack>
  );
};

export default SimilarProperties;
