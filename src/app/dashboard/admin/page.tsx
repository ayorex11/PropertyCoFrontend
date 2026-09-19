'use client'

import { Box, Button, Grid, GridItem, HStack, Icon, Span, Spinner, Stack, Text, VStack } from '@chakra-ui/react'
import LogoIcon from '@/lib/icons/logo_icon.svg'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { FaRegCircleUser, FaRegHeart } from 'react-icons/fa6'
import { IconType } from 'react-icons/lib'
import { LuCalendarClock, LuMessagesSquare } from 'react-icons/lu'
import { IoHomeOutline } from 'react-icons/io5'
import { GrNotes } from 'react-icons/gr'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { fetchAdminNotifications } from '@/lib/features/notifications/notificationsSlice'

const AdminDashboard = () => {
  const {notifications, loading } = useAppSelector((state)=> state.notifications);
  const dispatch = useAppDispatch();
  const unreadNotifications = notifications.filter((n) => n.read === false);
  const unreadNotificationsLength = unreadNotifications.length;
  useEffect(()=>{
    dispatch(fetchAdminNotifications());
  },[dispatch])
  return (
    <Box>
      <Stack gap={8}>
        <Box bg="#424242" p="3rem">
          <HStack color="#FFFFFF" gap={10} flexDir={{base: "column", md: "row"}}>
            <Image src={LogoIcon} objectFit='fill' alt='Logo Icon'/>
            <Stack>
              <Text fontWeight={600} fontSize="30px" textAlign={{base: "center", md: "left"}}>Hello, Admin</Text>
              <Text fontWeight={600} fontSize="12px" textAlign={{base: "center", md: "left"}}>
                You have{" "}
                <Span fontSize="30px">{loading ? <Spinner size="lg"/> : unreadNotificationsLength}</Span>
                {" "}new notifications
              </Text>
            </Stack>
          </HStack>
        </Box>
        <Box bg="#F5F5F5" p={{base: "1rem 0rem", md: "1rem 2rem"}}>
          <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(6, 1fr)"}} gap={5}>
            <GridItem colSpan={{base: 1, md: 2}}>
              <DashCard label='Notifications' action='View/Edit' href='/dashboard/admin/notifications' icon={FaRegCircleUser}/>
            </GridItem>
            <GridItem colSpan={{base: 1, md: 2}}>
              <DashCard label='Messages' action='View' href="/dashboard/admin/messages" icon={LuMessagesSquare}/>
            </GridItem>
            <GridItem colSpan={{base: 1, md: 2}}>
              <DashCard label='Inspections' action='View' href="/dashboard/admin/inspections" icon={LuCalendarClock}/>
            </GridItem>
            <GridItem colSpan={{base: 1, md: 3}}>
              <DashCard label='Catalogue' action='View' href="/dashboard/admin/catalogues" icon={FaRegHeart}/>
            </GridItem>
            <GridItem colSpan={{base: 1, md: 3}}>
              <DashCard label='Saved Properties' action='View' href="/dashboard/admin/savedProperties" icon={IoHomeOutline}/>
            </GridItem>
            <GridItem colSpan={{base: 1, md: 2}}>
              <DashCard label='Blog' action='View' href="/dashboard/admin/blogs" icon={GrNotes}/>
            </GridItem>
          </Grid>
        </Box>
      </Stack>
    </Box>
  )
}

const DashCard = ({label, action, href, icon}: {label:string, action: string, href: string, icon:IconType}) => (
  <Box bg="#E1E1E1" borderRadius="10px" p="3rem 2rem">
    <HStack justifyContent="space-between" alignItems="flex-end">
      <VStack alignItems={{base: "flex-start", md: "center"}}>
        <Icon as={icon} boxSize={8} color="#258C37"/>
        <Text textAlign={{base: "left", md: "center"}} fontSize="16px">{label}</Text>
      </VStack>
      <Link href={href}>
        <Button bg="#4169E0">
          {action}
        </Button>
      </Link>
    </HStack>
  </Box>
)

export default AdminDashboard
