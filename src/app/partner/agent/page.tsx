"use client";
import { Layout } from "@/components/Layout";
import Agent from "/public/partner/agent.jpg"
import Homes from "/public/partner/homes.jpg"
import Money from "/public/partner/money.jpg"
import World from "/public/partner/world.jpg"
import Transact from "/public/partner/transact.jpg"
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
import { useAppDispatch } from "@/lib/hooks";
import { openSignup } from "@/lib/features/modal/modalSlice";

const AgentSection = () => {
  const dispatch = useAppDispatch()
  return (
    <Layout>
      <Stack mb="5rem">
        <Text bg="#ECECEC" fontSize="38px" fontWeight={500} p="2rem" textAlign="center">Agents</Text>
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} py="1rem" gap={10} px={{ base: "1rem", md: "0"}}>
          <GridItem alignItems="center">
            <Stack alignItems={{md:"flex-end"}} gap={10} h="100%" justifyContent="center">
              <Text fontWeight={600} fontSize="28px" lineHeight="39px" textAlign={{md: "right"}}>
                Join the League of Elite Sellers
              </Text>
              <Text fontSize="16px" lineHeight="37px" textAlign={{md: "right"}} w={{md: "480px"}}>
                Get your listings in front of thousands of weekly visitors and reach hot leads/ready-to-buy clients through our diversified online and offline marketing channels.
              </Text>
              <Box>
                <Button
                  color="white"
                  bg="#4169E0"
                  fontSize="17px"
                  borderRadius="5px"
                  onClick={()=> dispatch(openSignup())}
                >
                  Get Started
                </Button>
              </Box>
            </Stack>
          </GridItem>
          <GridItem>
            <AspectRatio position="relative" ratio={470/340} maxW={{md: "470px"}}>
              <Image src={Agent} fill alt="agent"/>
            </AspectRatio>
          </GridItem>
        </Grid>
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} bg="#EBEBF0" py="1rem" gap={10} px={{ base: "1rem", md: "0"}}>
          <GridItem>
            <Stack flex={1} display={{ base: "block", md: "flex"}} w="100%" h="100%" alignItems="flex-end">
              <AspectRatio position="relative" ratio={470/340} w={{md: "470px"}}>
                <Image src={Homes} fill alt="agent"/>
              </AspectRatio>
            </Stack>
          </GridItem>
          <GridItem>
            <Stack gap={10} h="100%" justifyContent="center">
              <Text fontWeight={600} fontSize="28px" lineHeight="39px">
                Expand Your Property Portfolio and Earn More
              </Text>
              <Text fontSize="16px" lineHeight="37px" w={{md: "480px"}}>
                Sign up to get limitless access to all PropertyCo exclusive listings and earn commissions on Sales.
              </Text>
              <Box>
                <Button
                  color="white"
                  bg="#4169E0"
                  fontSize="17px"
                  borderRadius="5px"
                  onClick={()=> dispatch(openSignup())}
                >
                  Get Started
                </Button>
              </Box>
            </Stack>
          </GridItem>
        </Grid>
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} py="1rem" gap={10} px={{ base: "1rem", md: "0"}}>
          <GridItem>
            <Stack alignItems={{md: "flex-end"}} gap={10} h="100%" justifyContent="center">
              <Text fontWeight={600} fontSize="28px" lineHeight="22px" textAlign={{md: "right"}}>
                Profit Sharing
              </Text>
              <Text fontSize="16px" lineHeight="37px" textAlign={{md: "right"}} w={{md: "480px"}}>
                Join the winning team. Signup for free and get access to listings of 5,000+ agents and enjoy commission sharing on sales..
              </Text>
              <Box>
                <Button
                  color="white"
                  bg="#4169E0"
                  fontSize="17px"
                  borderRadius="5px"
                  onClick={()=> dispatch(openSignup())}
                >
                  Get Started
                </Button>
              </Box>
            </Stack>
          </GridItem>
          <GridItem>
            <AspectRatio position="relative" ratio={470/340} maxW="470px">
              <Image src={Money} fill alt="agent"/>
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
            <Stack gap={10} h="100%" justifyContent="center">
              <Text fontWeight={600} fontSize="28px" lineHeight="22px">
                Expand Your Reach
              </Text>
              <Text fontSize="16px" lineHeight="37px" w={{md: "480px"}}>
                Post your listings and collaborate with 5,000+ agents to take you reach to a larger audience.
              </Text>
              <Box>
                <Button
                  color="white"
                  bg="#4169E0"
                  fontSize="17px"
                  borderRadius="5px"
                  onClick={()=> dispatch(openSignup())}
                >
                  Get Started
                </Button>
              </Box>
            </Stack>
          </GridItem>
        </Grid>
        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} py="1rem" gap={10} px={{ base: "1rem", md: "0"}}>
          <GridItem>
            <Stack alignItems={{md: "flex-end"}} gap={10} h="100%" justifyContent="center">
              <Text fontWeight={600} fontSize="28px" lineHeight="22px" textAlign={{md: "right"}}>
                Close More Deals
              </Text>
              <Text fontSize="16px" lineHeight="37px" textAlign={{md: "right"}} w={{md: "480px"}}>
                With access to listings from Property Co and 5,000+ agents, you can now Successfully respond to 99% of you prospert&apos;s requests, clase more deals, and never lose a sale deal/opportunity again.
              </Text>
              <Box>
                <Button
                  color="white"
                  bg="#4169E0"
                  fontSize="17px"
                  borderRadius="5px"
                  onClick={()=> dispatch(openSignup())}
                >
                  Get Started
                </Button>
              </Box>
            </Stack>
          </GridItem>
          <GridItem>
            <AspectRatio position="relative" ratio={470/340} maxW={{md: "470px"}}>
              <Image src={Transact} fill alt="agent"/>
            </AspectRatio>
          </GridItem>
        </Grid>
      </Stack>
    </Layout>
  );
};
export default AgentSection;
