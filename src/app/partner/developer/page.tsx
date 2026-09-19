"use client";
import { Layout } from "@/components/Layout";
import World from "/public/partner/world.jpg"
import Grow from "/public/partner/grow.jpg"
import Sale from "/public/partner/sale.jpg"
import {
  AspectRatio,
  Box,
  Button,
  Grid,
  GridItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const DeveloperSection = () => {
  return (
    <Layout>
      <Stack mb="5rem">
        <Text bg="#ECECEC" fontSize="38px" fontWeight={500} p="2rem" textAlign="center">Developers</Text>
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} py="1rem" gap={10} px={{ base: "1rem", md: "0"}}>
          <GridItem>
            <Stack alignItems={{md: "flex-end"}} justifyContent="center" gap={10} h="100%">
              <Text fontWeight={600} fontSize="28px" lineHeight="22px" textAlign={{md: "right"}}>
                Sell More
              </Text>
              <Text fontSize="16px" lineHeight="37px" textAlign={{md: "right"}} w={{md: "480px"}}>
                Partner with us and onboard our 5,000+ partner agents community to know sell for you.
              </Text>
              <Box>
                <Link href="/partner/developer/partnerForm">
                  <Button
                    color="white"
                    bg="#4169E0"
                    fontSize="17px"
                    borderRadius="5px"
                  >
                    Get Started
                  </Button>
                </Link>
              </Box>
            </Stack>
          </GridItem>
          <GridItem>
            <AspectRatio position="relative" ratio={470/340} maxW={{md: "470px"}} borderRadius="20px" overflow="hidden">
              <Image src={Sale} fill alt="agent"/>
            </AspectRatio>
          </GridItem>
        </Grid>
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} py="1rem" gap={10} px={{ base: "1rem", md: "0"}}>
          <GridItem>
            <Stack flex={1} display={{ base: "block", md: "flex"}} w="100%" h="100%" alignItems="flex-end">
              <AspectRatio position="relative" ratio={470/340} w={{md: "470px"}}>
                <Image src={World} fill alt="agent"/>
              </AspectRatio>
            </Stack>
          </GridItem>
          <GridItem>
            <Stack justifyContent="center" gap={10} h="100%">
              <Text fontWeight={600} fontSize="28px" lineHeight="22px">
                Bigger Reach
              </Text>
              <Text fontSize="16px" lineHeight="37px" w={{md: "480px"}}>
                Reach 100,000 weekly site visitors both in Nigeria and in the diaspora.
              </Text>
              <Box>
                <Link href="/partner/developer/partnerForm">
                  <Button
                    color="white"
                    bg="#4169E0"
                    fontSize="17px"
                    borderRadius="5px"
                  >
                    Get Started
                  </Button>
                </Link>
              </Box>
            </Stack>
          </GridItem>
        </Grid>
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} bg="#ECECEC" py="1rem" gap={10} px={{ base: "1rem", md: "0"}}>
          <GridItem>
            <Stack alignItems={{md: "flex-end"}} justifyContent="center" gap={10} h="100%">
              <Text fontWeight={600} fontSize="28px" lineHeight="22px" textAlign={{md: "right"}}>
                Grow Your Brand
              </Text>
              <Text fontSize="16px" lineHeight="37px" textAlign={{md: "right"}} w={{md: "480px"}}>
                Reach millions of potential clients with your products monthly through our diversified online and offline marketing channels.
              </Text>
              <Box>
                <Link href="/partner/developer/partnerForm">
                  <Button
                    color="white"
                    bg="#4169E0"
                    fontSize="17px"
                    borderRadius="5px"
                  >
                    Get Started
                  </Button>
                </Link>
              </Box>
            </Stack>
          </GridItem>
          <GridItem>
            <AspectRatio position="relative" ratio={470/340} maxW={{md: "470px"}} borderRadius="20px" overflow="hidden" boxShadow="5px 5px 20px #00000033">
              <Image src={Grow} fill alt="agent"/>
            </AspectRatio>
          </GridItem>
        </Grid>
      </Stack>
    </Layout>
  );
};
export default DeveloperSection;
