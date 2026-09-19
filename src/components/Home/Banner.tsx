"use client";
import { Box, HStack, Text, Stack } from "@chakra-ui/react";
import BannerBg from "/public/home/banner_bg.png";
import Image from "next/image";
import React from "react";
import SearchProperties from "../SearchProperties";
import ReferenceSearch from "../ReferenceSearch";

const Banner = () => {
  return (
    <Box
      pos="relative"
      w="100%"
      h={{ base: "800px",md: "600px"}}
      borderRadius={{ base:"none", md: "61.54px"}}
      overflow="hidden"
    >
      <Image src={BannerBg} alt="Banner Pic" fill objectFit="cover" />
      <Box
        pos="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        bg="#074C9899"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="white"
      >
        <Stack w={{md:"940px"}} px={{ base: "2rem", md: ""}}>
          <HStack w="100%" alignItems={{base: "start", md: "end"}} flexDir={{base: "column", md: "row"}}>
            <Stack lineHeight={{base: "35px", md: "70px"}} flex={1}>
              <Text fontWeight={600} fontSize={{ base: "30px", md: "58px"}}>
                Find the
              </Text>
              <Text fontWeight={600} fontSize={{base: "30px", md: "58px"}} mt={{base: "-10px", md: "-25px"}}>
                Perfect Property
              </Text>
            </Stack>
            <HStack flex={1} display={{ base: "block", md: "flex"}}>
              <Text flex={1} fontWeight={500} fontSize="14px" textAlign={{md:"right"}}>
                Search by Reference Number
              </Text>
              <ReferenceSearch />
            </HStack>
          </HStack>
          <SearchProperties variant="home" cat={["Rent"]} />
          <Box display={{base: "none", md: "block"}}>
            <Text fontSize="20px">
              We provide a complete service for the sale,
            </Text>
            <Text fontSize="20px">
              purchase or rental of property in Nigeria.
            </Text>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Banner;
