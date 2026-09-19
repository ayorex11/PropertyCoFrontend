"use client";
import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Layout } from "@/components/Layout";
import Image from "next/image";

export default function PartnerHome() {
  return (
    <Layout>
      <Text bg="#ECECEC" fontSize="38px" fontWeight={500} p="2rem" textAlign="center" mb="2rem">Partner With Us</Text>
      <Box
        pos="relative"
        w="100%"
        h={{ base: "1200px", md: "600px" }}
        borderRadius={{ base: "none", md: "61.54px" }}
        overflow="hidden"
        mb="6rem"
      >
        <Image
          src="/partner/transact.jpg"
          alt="Banner Pic"
          fill
          objectFit="cover"
        />
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
          <HStack justifyContent="center" flexDir={{ base: "column", md: "row"}}>
            {[
              {
                label: "Agent",
                image: "/partner/agent.jpg",
                link: "/partner/agent",
              },
              {
                label: "Property Developer",
                image: "/partner/developer.jpg",
                link: "/partner/developer",
              },
              {
                label: "Landlords",
                image: "/partner/landlord.jpg",
                link: "/partner/landlord",
              },
            ].map((item, i) => (
              <Stack
                key={i}
                bg="white"
                p={8}
                borderRadius="20px"
                w={{ base: "20rem", md:"25rem"}}
                textAlign="center"
                position="relative"
              >
                <AspectRatio ratio={20/19} pos="relative">
                  <Image src={item.image} fill alt={item.label} objectFit="cover"/>
                </AspectRatio>
                <Text fontSize="28px" fontWeight={600} my={4} color="#000048">
                  {item.label}
                </Text>
                <Box mt="auto">
                  <Link href={item.link}>
                    <Button
                      color="white"
                      bg="#4169E0"
                      fontSize="20px"
                      borderRadius="5px"
                    >
                      Get Started
                    </Button>
                  </Link>
                </Box>
              </Stack>
            ))}
          </HStack>
        </Box>
      </Box>
    </Layout>
  );
}
