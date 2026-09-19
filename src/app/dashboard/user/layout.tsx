import ProtectedRoute from '@/components/ProtectedRoute'
import { Box, Grid, GridItem, Text, VStack } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import Logo from "/public/coloured_logo.svg";
import Link from 'next/link';
import Image from 'next/image';
import UserSidebar from './components/UserSidebar';
import MobileUserSidebar from './components/MobileUserSidebar';

const UserLayout = ({children}: { children: ReactNode }) => {
  return (
    <ProtectedRoute allowedRoles={["User"]}>
        <Box py="3rem" position="relative">
            <Box pos="absolute" display={{base: "block", md: "none"}} bg="white">
                <MobileUserSidebar />
            </Box>
            <VStack w={{ base: "100%", md: "1200px" }} m="auto">
                <VStack>
                    <Link href="/">
                        <Image src={Logo} alt="Logo" />
                    </Link>
                    <Text textAlign="center" fontWeight={500} fontSize="22px">User Dashboard</Text>
                </VStack>
                <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(6, 1fr)" }} w="100%" gap={10}>
                    <GridItem colSpan={2} display={{ base: "none", md: "block" }}>
                        <UserSidebar/>
                    </GridItem>
                    <GridItem colSpan={{ base: 1, md: 4 }} bg="#F5F5F5" textAlign={{base: "center", md: "left"}}>
                        {children}
                    </GridItem>
                </Grid>
            </VStack>
        </Box>
    </ProtectedRoute>
  )
}

export default UserLayout
