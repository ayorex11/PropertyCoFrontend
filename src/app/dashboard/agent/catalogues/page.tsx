"use client";

import { Box, Button, Grid, GridItem, Stack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import Add from "@/lib/icons/add.svg"
import Pend from "@/lib/icons/pend.svg"
import Live from "@/lib/icons/live.svg"
import Link from "next/link"

const AgentCatalogues = () => {
  const cards = [
    {label: "Post a Property", link: "/postProperty", button: "Post a Property", color: "#258C37", icon: Add},
    {label: "Pending Approval", link: "/dashboard/agent/catalogues/pendingCatalogues", button: "View Pending Posts", color: "#074C98", icon: Pend},
    {label: "Live Properties", link: "/dashboard/agent/catalogues/liveCatalogues", button: "Live Properties", color: "#258C37", icon: Live},
  ]
  return (
    <Box pb="2rem">
      <Text p="2rem 4rem" fontWeight={500} fontSize="30px">
        Catalogues
      </Text>
      <Box p="2rem 4rem" color="#000048">
        <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(3, 1fr)"}} gap={10}>
          {cards.map((card, index)=>(
            <GridItem key={index}>
              <Stack gap={10}>
                <Link href={card.link}>
                  <VStack h="300px" bg="#E1E1E1" w={{base: "100%", md: "200px"}} justifyContent="center" cursor="pointer" p="3rem">
                    <Image src={card.icon} alt="Add Property"/>
                    <Text fontSize="23px" textAlign="center">{card.label}</Text>
                  </VStack>
                </Link>
                <Link href={card.link}>                
                  <Button bg={card.color} fontSize="14px" w="full">
                    {card.button}
                  </Button>
                </Link>
              </Stack>
            </GridItem>

          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default AgentCatalogues;