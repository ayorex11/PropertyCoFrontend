"use client";

import Pagination from "@/components/Pagination";
import {fetchCatalogues} from "@/lib/features/catalogues/cataloguesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Box, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { PropertyCard } from "@/components/Card";

const AdminCatalogues = () => {
  const { catalogues, loading } = useAppSelector((state) => state.catalogues);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCatalogues());
  }, [dispatch]);
  return (
    <Box pb="2rem">
      <Text p={{base: "2rem 1rem", md: "2rem 4rem"}} fontWeight={500} fontSize="30px">
        Catalogues
      </Text>
        <Pagination
          data={catalogues}
          resetTrigger={catalogues.length}
          title="Catalogues"
          isLoading={loading}
          emptyMessage="No Catalogue available..."
          render={(catalogue) => (
            <Box p={{base: " 1rem 0rem", md: "1rem 4rem"}}>
              <PropertyCard property={catalogue} variant="catalogue"/>
            </Box>
          )}
        />
    </Box>
  );
};

export default AdminCatalogues;