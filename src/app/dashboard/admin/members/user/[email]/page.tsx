"use client"

import { fetchUserDetails } from '@/lib/features/members/membersSlice'
import { openNewAdminMessage } from '@/lib/features/modal/modalSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
// import { formatDateToReadable } from '@/utils/converters'
import { errorToast } from '@/utils/CustomToast'
import { Box, Text, Stack, Spinner, HStack, Avatar, Button, Grid, GridItem } from '@chakra-ui/react'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

const User = () => {
    const { email } = useParams();
    const dispatch = useAppDispatch()
    const user = useAppSelector((state)=>state.members.userDetail)
    const userLoading = useAppSelector((state)=>state.members.loading.userDetail)
    useEffect(() => {
      if(!email){
          errorToast("Invalid Email")
          return;
      }
      const userEmail = Array.isArray(email) ? email[0] : email;
      if (userEmail) {
          dispatch(fetchUserDetails(userEmail));
      }
    }, [email, dispatch]);
  
    if (userLoading) return <Spinner size="xl"/>
    if (!user) return(<Text w={{ base: "100%", md: "1000px" }} mx="auto" color="#074C98" my="2rem" fontSize="24px" px={{base: "1rem", md: "2rem"}}>No User Found.</Text>);
    console.info("details", user)
return (
  <Box pb="2rem">
      <Stack p={{base: "2rem 1rem", md: "2rem 4rem"}}color="#000048" gap={5}>
        <Text fontWeight={500} fontSize="30px">
          Member
        </Text>
        <Stack alignItems={{base: "center", md: "flex-start"}}>
          <Text fontWeight={600} color="#6A6A6A" fontSize="24px">User</Text>
          <HStack pos="relative" gap={5} flexDir={{base: "column", md: "row"}}>
            <Avatar.Root w="150px" h='150px'>
              <Avatar.Fallback name={`${user?.data?.first_name} ${user?.data?.last_name}`} />
              <Avatar.Image src="https://bit.ly/sage-adebayo" />
            </Avatar.Root>
            <Stack>
              <Text fontWeight={500} fontSize="16px" color="#6A6A6A">Member ID: {user?.data?.member_id}</Text>
              <Button
                p="0px"
                w="180px"
                h="40px"
                bg="#258C37"
                color="#EFF3FA"
                m="auto"
                display="block"
                fontWeight={600}
                fontSize="16px"
                onClick={()=>dispatch(openNewAdminMessage(user?.data?.member_id))}
              >
                Send Message
              </Button>
            </Stack>
          </HStack>
        </Stack>
        <Grid templateColumns={{base: "repeat(2, 1fr)", md: "repeat(3, 1fr)"}} gap={10}>
          <GridItem>
            <Stack>
              <Text fontSize="16px" color="#6A6A6A">First Name</Text>
              <Text fontWeight={500} fontSize="16px" color="#6A6A6A">{user?.data?.first_name || "N/A"}</Text>
            </Stack>
          </GridItem>
          <GridItem>
            <Stack>
              <Text fontSize="16px" color="#6A6A6A">Last Name</Text>
              <Text fontWeight={500} fontSize="16px" color="#6A6A6A">{user?.data?.last_name || "N/A"}</Text>
            </Stack>
          </GridItem>
          <GridItem colSpan={{base: 2, md: 1}}>            
            <Stack>
              <Text fontSize="16px" color="#6A6A6A">Email Address</Text>
              <Text fontWeight={500} fontSize="14px" color="#6A6A6A">{user?.data?.email || "N/A"}</Text>
            </Stack>
          </GridItem>
          <GridItem>
            <Stack>
              <Text fontSize="16px" color="#6A6A6A">Phone Number</Text>
              <Text fontWeight={500} fontSize="16px" color="#6A6A6A">Nigeria (+234)</Text>
            </Stack>
          </GridItem>
          <GridItem colSpan={{base: 1, md: 2}}>
            <Stack>
              <Text fontSize="16px" color="#6A6A6A">&nbsp;</Text>
              <Text fontWeight={500} fontSize="16px" color="#6A6A6A">{user?.data?.phone_number || "N/A"}</Text>
            </Stack>
          </GridItem>
          {/* <GridItem>
            <Stack>
              <Text fontSize="16px" color="#6A6A6A">&nbsp;</Text>
              <Text fontWeight={500} fontSize="16px" color="#6A6A6A">{user?.contact_number2 || "N/A"}</Text>
            </Stack>
          </GridItem> */}
          <GridItem colSpan={{base: 2, md: 3}}>
            <Stack>
              <Text fontSize="16px" color="#6A6A6A">Address</Text>
              <Text fontWeight={500} fontSize="16px" color="#6A6A6A">{user?.address || "N/A"}</Text>
            </Stack>
          </GridItem>
          {/* <GridItem>
            <Stack>
              <Text fontSize="16px" color="#6A6A6A">Date Registered</Text>
              <Text fontWeight={500} fontSize="16px" color="#6A6A6A">{formatDateToReadable(String(user?.created_at)) || "N/A"}</Text>
            </Stack>
          </GridItem> */}
        </Grid>
      </Stack>
  </Box>
  )
}

export default User;