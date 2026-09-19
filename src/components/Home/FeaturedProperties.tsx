"use client";
import {
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { FeaturedCard } from "../Card";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { Property } from "@/lib/types";
import { fetchFeaturedProperties } from "@/lib/features/properties/propertiesSlice";

const FeaturedProperties = () => {
  const { data, loading } = useAppSelector(
    (state) => state.properties.featuredProperties
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFeaturedProperties());
  }, [dispatch]);
  return (
    <Box
      w={{ base: "100%", md: "" }}
      maxW="930px"
      px={{ base: "2rem", md:"3rem"}}
      pt="5rem"
      pb="2rem"
      m="auto"
      justifyContent="center"
      color="#000048"
    >
      <Heading fontWeight={600} fontSize="30px" lineHeight={{base: "30px", md: ""}}>
        Our Featured Properties
      </Heading>
      <Text my="1rem" fontSize="16px">
        Explore our curated collection of premier properties. From cozy
        apartments to luxurious estates, we&apos;ve got something for every
        taste and budget. Start your journey towards finding the perfect place
        to call home today.
      </Text>
      <Box w="100%" mb="2rem">
        {data ? (
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3 }}
            w="100%"
            mt="2rem"
            mx="auto"
            gap={10}
            flexWrap="wrap"
          >
            {data?.slice(0, 3)?.map((eachItem: Property) => (
              <Box key={eachItem.id}>
                <FeaturedCard props={eachItem} />
              </Box>
            ))}
          </SimpleGrid>
        ) : loading ? (
          <Spinner size="xl" />
        ) : (
          <p>No data Available</p>
        )}
      </Box>
      <Link href="/featured">
        <Button
          p="0px"
          w="300px"
          h="40px"
          bg="#258C37"
          color="#EFF3FA"
          m="auto"
          display="block"
          fontWeight={600}
          fontSize="16px"
        >
          View more featured properties
        </Button>
      </Link>
    </Box>
  );
};
export default FeaturedProperties;
