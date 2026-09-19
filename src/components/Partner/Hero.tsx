"use client";
import { Box, Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export const PartnerHero = () => (
  <Flex align="center" justify="center" minH="40rem" bgImage="/partner/Banner_Image.png" bgSize="cover">
    <Flex gap={10} wrap="wrap" p={8} justify="center">
      {[
        { label: "Agent", image: "/partner/agent.png", link: '/partner/agent' },
        { label: "Property Developers", image: "/partner/developer.png", link: '/partner/developer' },
        { label: "Landlords", image: "/partner/landlord.png", link: '/partner/landlord' }
      ].map((item, i) => (
        <Stack key={i} bg="white" p={8} borderRadius="20px" w="20rem" textAlign="center">
          <Image src={item.image} h="12rem" mx="auto" alt={item.label}/>
          <Text fontSize="24px" my={4}>{item.label}</Text>
          <Box mt="auto">
            <Link href={item.link}>
              <Button color="white" bg="#4169E0" w="full">Get Started</Button>
            </Link>
          </Box>
        </Stack>
      ))}
    </Flex>
  </Flex>
);
