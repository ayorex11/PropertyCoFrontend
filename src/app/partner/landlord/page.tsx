"use client";
import { Layout } from "@/components/Layout";
import Tenants from "/public/partner/tenants.jpg"
import FiveK from "/public/partner/5000.jpg"
import Stress from "/public/partner/stress.jpg"
import Service from "/public/partner/service.jpg"
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

const LandlordSection = () => {
  return (
    <Layout>
      <Stack mb="5rem">
        <Text bg="#ECECEC" fontSize="38px" fontWeight={500} p="2rem" textAlign="center">Landlords</Text>
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} py="1rem" gap={10} px={{ base: "1rem", md: "0"}}>
          <GridItem alignItems="center">
            <Stack alignItems={{md: "flex-end"}} gap={10} h="100%" justifyContent="center">
              <Text fontWeight={600} fontSize="28px" lineHeight="22px" textAlign={{md: "right"}}>
                Professional Agency Service
              </Text>
              <Text fontSize="16px" lineHeight="37px" textAlign={{md: "right"}} w={{md: "480px"}}>
                Get the best agency services and consultant advice from industry experts and professionals.
              </Text>
              <Box>
                <Link href="/partner/landlord/partnerForm">
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
              <Image src={Service} fill alt="agent"/>
            </AspectRatio>
          </GridItem>
        </Grid>
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} bg="#EBEBF0" py="1rem" gap={10} px={{ base: "1rem", md: "0"}}>
          <GridItem>
            <Stack flex={1} w="100%" h="100%" alignItems={{md: "flex-end"}}>
              <AspectRatio position="relative" ratio={470/340} w={{md: "470px"}} borderRadius="20px" overflow="hidden" boxShadow="5px 5px 20px #00000033">
                <Image src={Tenants} fill alt="agent"/>
              </AspectRatio>
            </Stack>
          </GridItem>
          <GridItem>
            <Stack gap={10} h="100%" justifyContent="center">
              <Text fontWeight={600} fontSize="28px" lineHeight="22px">
                Find Tenants Quickly
              </Text>
              <Text fontSize="16px" lineHeight="37px" w={{md: "480px"}}>
                Reach thousands of weekly site visitors, and millions of potential home buyers/tenants through our diversified offline and online marketing channels. 
              </Text>
              <Box>
                <Link href="/partner/landlord/partnerForm">
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
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} py="1rem" gap={10} px={{ base: "1rem", md: "0"}}>
          <GridItem>
            <Stack alignItems={{md: "flex-end"}} gap={10} h="100%" justifyContent="center">
              <Text fontWeight={600} fontSize="28px" lineHeight="22px" textAlign={{md: "right"}}>
                5,000 Agency Team
              </Text>
              <Text fontSize="16px" lineHeight="37px" textAlign={{md: "right"}} w={{md: "480px"}}>
                By partnering with us, you automatically get our community of 5,000+ top agents to directly selling and marketing your property. This ensures deeper market reach and guarantees quicker sales/letting time for your property.
              </Text>
              <Box>
                <Link href="/partner/landlord/partnerForm">
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
            <AspectRatio position="relative" ratio={470/340} maxW={{md: "470px"}}>
              <Image src={FiveK} fill alt="5000"/>
            </AspectRatio>
          </GridItem>
        </Grid>
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} py="1rem" gap={10} bg="#EBEBF0" px={{ base: "1rem", md: "0"}}>
          <GridItem>
            <Stack flex={1} w="100%" h="100%" alignItems={{md: "flex-end"}}>
              <AspectRatio position="relative" ratio={470/340} w={{md: "470px"}} borderRadius="20px" overflow="hidden" boxShadow="5px 5px 20px #00000033">
                <Image src={Stress} fill alt="agent"/>
              </AspectRatio>
            </Stack>
          </GridItem>
          <GridItem>
            <Stack gap={10} h="100%" justifyContent="center">
              <Text fontWeight={600} fontSize="28px" lineHeight="22px">
                Stress-free Renting/Sales
              </Text>
              <Text fontSize="16px" lineHeight="37px" w={{md: "480px"}}>
                Partner with us and let our seasoned professionals take the stress of finding your ideal tenant/property buyer off of you.<br/>We handle the process seamlessly from start to finish.
              </Text>
              <Box>
                <Link href="/partner/landlord/partnerForm">
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
      </Stack>
    </Layout>
  );
};
export default LandlordSection;
