"use client";

import Pagination from "@/components/Pagination";
import { fetchCatalogues } from "@/lib/features/catalogues/cataloguesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Box, HStack, Icon, Span, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { PropertyCard } from "@/components/Card";
import { FaPlay } from "react-icons/fa6";

const AgentLiveCatalogues = () => {
  const { catalogues, loading } = useAppSelector((state) => state.catalogues);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCatalogues());
  }, [dispatch]);
  return (
    <Box pb="2rem">
      <HStack p={{base: "2rem 1rem", md: "2rem 4rem"}} flexDir={{base: "column", md: "row"}} gap={5}>
        <Text fontWeight={500} fontSize="30px">
          My Catalogue
        </Text>
        <Span>
          <Icon as={FaPlay} boxSize={5} />
        </Span>
        <Text fontWeight={500} fontSize="30px">
          Live Properties
        </Text>
      </HStack>
      <Pagination
        data={catalogues}
        resetTrigger={catalogues.length}
        title="Catalogues"
        isLoading={loading}
        emptyMessage="No Catalogue available..."
        render={(catalogue) => (
          <Box p={{base: "0.5rem 0rem", md: "0.5rem 4rem"}}>
            <PropertyCard property={catalogue} />
          </Box>
        )}
      />
    </Box>
  );
};

export default AgentLiveCatalogues;
