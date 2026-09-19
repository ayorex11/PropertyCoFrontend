"use client";

import { CustomTable } from "@/components/CustomTable";
import { RatingHistory } from "@/lib/types";
import React from "react";
import { columns } from "./columns/ratings";
import { Box } from "@chakra-ui/react";

interface MemberProps { 
  ratings: RatingHistory[]
  loading: boolean
}

const RatingTable = ({ratings, loading}: MemberProps) => {
  return (
    <Box bg="white" color="black" overflowX="scroll">
        <CustomTable<RatingHistory>
          showSerialNumber={false}
          data={ratings}
          columns={columns}
          title="Ratings"
          emptyMessage="No Rating available..."
          isLoading={loading}
          rating
        />
    </Box>
  );
};

export default RatingTable;