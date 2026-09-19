
import Project_Logo from "/public/dark_logo.svg";
import Facebook from "@/lib/icons/facebook.svg";
import Instagram from "@/lib/icons/instagram.svg";
import Linkedin from "@/lib/icons/linkedin.svg";
import X from "@/lib/icons/x.svg";
import {
  Box,
  Text,
  Heading,
  Grid,
  GridItem,
  Stack,
  HStack,
} from "@chakra-ui/react";
import Subscribe from "./subscribe";
import Link from "next/link";
import Image from "next/image";


const Footer = () => {
  return (
    <Box w= {{base: "100%", md: "1100px"}} m="auto" px={{base: "1rem", md: "2rem"}} pb="2rem">
        <Grid templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(6, 1fr)",
        }}
        gap={{ base: 6, md: 10 }}>
          <GridItem colSpan={{ base: 1, sm: 2, md: 3 }}>
            <Stack gap="20px">
              <Box>
                <Image src={Project_Logo} alt="Logo" />
              </Box>
              <Text lineHeight="2.5" color="#8F90A6" fontSize="12px" pr={{ base: 0, md: "3rem" }} textAlign={{ base: "justify", md: "left" }}>
                At PropertyCo, we&apos;re more than just a real estate platform. We&apos;re a
                team of dedicated professionals committed to helping you find your
                ideal home. With our extensive network and personalized approach, we
                strive to make the process of buying or renting a property in
                Nigeria as seamless and enjoyable as possible.
              </Text>
              <HStack gap={8} flexWrap="wrap">
                <Image src={Facebook} alt="Facebook"/>
                <Image src={X} alt="X"/>
                <Image src={Instagram} alt="Instagram"/>
                <Image src={Linkedin} alt="Linkedin"/>
              </HStack>
              <Text color="#8F90A6" fontSize="11px">
                © 2023 . All rights reserved.
              </Text>
            </Stack>

          </GridItem>
          <GridItem>
            <Stack gap={6}>
              <Heading fontWeight={600} color="#110229" fontSize="18px">
                Quick Links
              </Heading>
              <Link href="/sale">
                <Text color="#110229" fontSize="16px">
                  Properties for Sale
                </Text>
              </Link>
              <Link href="/rent">
                <Text color="#110229" fontSize="16px">
                  Properties for Rent
                </Text>
              </Link>
              <Text color="#110229" fontSize="16px">
                Land for Sale
              </Text>
              <Text color="#110229" fontSize="16px">
                Shortlets
              </Text>
            </Stack>
          </GridItem>
          <GridItem>
            <Stack gap={6}>
              <Heading fontWeight={600} color="#110229" fontSize="18px">
                Our Company
              </Heading>
              <Text color="#110229" fontSize="16px">
                Agents
              </Text>
              <Link href="/blog">
                <Text color="#110229" fontSize="16px">
                  Blog          
                </Text>
              </Link>
              <Text color="#110229" fontSize="16px">
                Media
              </Text>
            </Stack>
          </GridItem>
          <GridItem colSpan={{ base: 1, sm: 2, md: 1 }}>
            <Subscribe type="home" />
          </GridItem>
      </Grid>
    </Box>
  );
};

export default Footer;
