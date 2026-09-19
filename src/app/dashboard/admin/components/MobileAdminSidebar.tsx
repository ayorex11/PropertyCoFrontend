"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import HamburgerIcon from "@/lib/icons/hamburger.svg";
import {
  Drawer,
  Portal,
  Stack,
  Box,
  Button,
  CloseButton,
  Icon,
  Circle,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { handleLogout } from "@/utils/logout";
import { PiBinoculars } from "react-icons/pi";
import { HiOutlineBellAlert } from "react-icons/hi2";
import {
  LuCalendarClock,
  LuMessagesSquare,
  LuUsersRound,
} from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { GrNotes } from "react-icons/gr";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { fetchAdminMessages } from "@/lib/features/messages/messagesSlice";
import { fetchAdminNotifications } from "@/lib/features/notifications/notificationsSlice";

const MobileAdminSidebar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const LogOut = async () => {
    await handleLogout(dispatch, router);
  };
  useEffect(() => {
    dispatch(fetchAdminMessages());
    dispatch(fetchAdminNotifications());
  }, [dispatch]);

  const notifications = useAppSelector(
    (state) => state.notifications.notifications
  );
  const unreadNotifications = notifications.filter((n) => n.read === false);
  const unreadNotificationsLength = unreadNotifications.length;

  const messages = useAppSelector((state) => state.messages.adminMessages.data);
  const unreadMessages = messages.filter((n) => n.read === false);
  const unreadMessagesLength = unreadMessages.length;

  const [open, setOpen] = useState(false);
  const NavElements = [
    { href: "/dashboard/admin", name: "Overview", icon: PiBinoculars },
    {
      href: "/dashboard/admin/notifications",
      name: "Notifications",
      icon: HiOutlineBellAlert,
      count: unreadNotificationsLength,
    },
    {
      href: "/dashboard/admin/messages",
      name: "Messages",
      icon: LuMessagesSquare,
      count: unreadMessagesLength,
    },
    {
      href: "/dashboard/admin/savedProperties",
      name: "Saved Properties",
      icon: FaRegHeart,
    },
    {
      href: "/dashboard/admin/inspections",
      name: "Inspections",
      icon: LuCalendarClock,
    },
    {
      href: "/dashboard/admin/catalogues",
      name: "Catalogue",
      icon: IoHomeOutline,
    },
    {
      href: "/dashboard/admin/agentProperties",
      name: "Agent Properties",
      icon: IoHomeOutline,
    },
    { href: "/dashboard/admin/members", name: "Members", icon: LuUsersRound },
    { href: "/dashboard/admin/blogs", name: "Blog", icon: GrNotes },
    { href: "/dashboard/admin/security", name: "Security", icon: FiSettings },
    { href: "", color: "", name: "Log Out", onClick: LogOut, icon: FiLogOut },
  ];
  const pathname = usePathname();
  return (
    <Drawer.Root
      size="xs"
      placement="start"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Drawer.Trigger asChild>
        <Button variant="ghost" size="lg">
          <Image src={HamburgerIcon} alt="Menu" />
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content bg="#074C98">
            <Drawer.Header>
              <Drawer.Title></Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <Stack gap={5}>
                {NavElements.map((eachElement, index) => {
                  const isActive = pathname === eachElement.href;
                  return (
                    <Box key={index} onClick={() => setOpen(false)}>
                      {eachElement.href !== "" ? (
                        <Link href={eachElement.href}>
                          <Button
                            bg={isActive ? "white" : "none"}
                            mr="0.5rem"
                            key={index}
                            p="10px 10px"
                            h="30px"
                            w="100%"
                            color={isActive ? "#258C37" : "#FFFFFF"}
                            transition="background-color 0.2s ease"
                            justifyContent={{ base: "left", md: "center" }}
                          >
                            <Box>
                              <HStack>
                                <>
                                  <Icon
                                    as={eachElement.icon}
                                    boxSize={8}
                                    mr={4}
                                    color={isActive ? "#258C37" : "#FFFFFF"}
                                    transition="all 0.2s ease-in-out"
                                  />
                                  {eachElement.name}
                                </>
                                {eachElement.count
                                  ? eachElement.count > 0 && (
                                      <Circle size="5" bg="red" color="white">
                                        {eachElement.count}
                                      </Circle>
                                    )
                                  : null}
                              </HStack>
                            </Box>
                          </Button>
                        </Link>
                      ) : (
                        <Button
                          bg="none"
                          mr="0.5rem"
                          key={index}
                          p="10px 10px"
                          h="30px"
                          onClick={eachElement.onClick}
                          w="100%"
                          color="#ff0000"
                          transition="background-color 0.2s ease"
                          justifyContent={{ base: "left", md: "center" }}
                        >
                          <Box fontSize="14px" fontWeight={600}>
                            <Icon as={FiLogOut} boxSize={8} mr={4} />
                            {eachElement.name}
                          </Box>
                        </Button>
                      )}
                    </Box>
                  );
                })}
              </Stack>
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="lg" color="#FFFFFF" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default MobileAdminSidebar;
