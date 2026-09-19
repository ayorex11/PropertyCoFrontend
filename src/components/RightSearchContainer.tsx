"use client";
import { Box, Button, Stack, Text, VStack } from "@chakra-ui/react";
import HouseLogo from "@/lib/icons/house.svg";
import React from "react";
import Subscribe from "./subscribe";
import { LuSearch } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";

const RightSearchContainer = () => {
  return (
    <Stack gap={10}>
      <Box px="2rem" py="4rem" bg="#ECECEC">
        <Subscribe type="search" />
      </Box>
      <VStack bg="#ECECEC" py="2rem">
        <LuSearch size="50px" />
        <Text fontSize="20px" color="#000048">
          Can&apos;t find what you want?
        </Text>
        <Link href="/requestProperty">
          <Button bg="#258C3A" px="10px" h="40px">
            <Image src={HouseLogo} alt="House Logo" objectFit="fill" />
            <Stack lineHeight="10px" alignItems="left">
              <Text fontWeight={600} fontSize="16px">
                Request a Property
              </Text>
              <Text fontWeight="normal" textAlign="left" fontSize="10px">
                (Free)
              </Text>
            </Stack>
          </Button>
        </Link>
      </VStack>
    </Stack>
  );
};

export default RightSearchContainer;
