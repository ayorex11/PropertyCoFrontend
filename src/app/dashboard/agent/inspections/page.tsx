"use client";

import Pagination from "@/components/Pagination";
import { fetchInspections } from "@/lib/features/inspections/inspectionsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Box, Button, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { InspectionCard } from "@/components/Card";
import Link from "next/link";

const AgentInspections = () => {
  const { data, loading } = useAppSelector((state) => state.inspections.inspections);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchInspections());
  }, [dispatch]);
  return (
    <Box pb="2rem">
      <Text px={{base: "1rem", md: "4rem"}} pt="2rem" fontWeight={500} fontSize="30px">
        Inspections
      </Text>
      <Box px={{base: "1rem", md: "4rem"}} pb="2rem">
        <Link href="/dashboard/agent/inspections/createInspection">
          <Button bg="#258C37" fontWeight={600} fontSize="18px" p="20px">
            Request New Inspection
          </Button>
        </Link>
      </Box>
      <Pagination
        data={data}
        resetTrigger={data.length}
        title="Inspections"
        isLoading={loading}
        emptyMessage="No Inspection available..."
        type="blog"
        render={(inspection) => (
          <Box px={{md: "4rem"}}>
            <InspectionCard inspections={inspection} />
          </Box>
        )}
      />
    </Box>
  );
};

export default AgentInspections;
