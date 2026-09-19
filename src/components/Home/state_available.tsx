"use client";
import { Box, Heading, Text, Grid, GridItem } from "@chakra-ui/react";
import Link from "next/link";
import LagosBg from '/public/home/lagos_bg.png'
import AbujaBg from '/public/home/abuja_bg.png'
import OgunBg from '/public/home/ogun_bg.png'
import PhBg from '/public/home/port_harcourt_bg.png'
import Image from "next/image";

export const StateAvailable = () => {
  const locations = [
    {title:"LAGOS", content: "", image: LagosBg, link: ""},
    {title:"ABUJA", content: "COMING SOON", image: AbujaBg, link: ""},
    {title:"OGUN", content: "COMING SOON", image: OgunBg, link: ""},
    {title:"PORT HARCOURT", content: "COMING SOON", image: PhBg, link: ""},
  ]
  return (
    <Box w = {{base: ("100%"), md: ("930px")}} m="auto">
      <Heading fontWeight={600} p={{base: "2rem", md: "3rem"}} fontSize="2rem" m ="auto"color="#000048">
        We are available in ...
      </Heading>
      <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)"}} gap={7} p={{base: "2rem", md: ""}}>
        {locations.map((location, index)=>(
          <GridItem key={index}>
            <Link href={location.link}>
              <Box
                h={{ base: "16rem", md: "26.6rem"}}
                backgroundSize="100% 100%"
                borderRadius="1.5rem"
                position="relative"
                color="#000048"
              >
                {location.title !== "LAGOS" && <Box pos="absolute" w="100%" h="100%" bg="#00000080" borderRadius="1.5rem" zIndex={3}/>}
                <Image src={location.image} fill alt="Lagos Bg"/>
                <Box
                  textAlign="center"
                  position="relative"
                  top="2rem"
                  fontWeight={600}
                  fontSize="22px"
                  letterSpacing="20%"
                >
                  {location.title}
                {location.content && (<Text mt="1rem" letterSpacing="20%">{location.content}</Text>)}
                </Box>
              </Box>
            </Link>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};
