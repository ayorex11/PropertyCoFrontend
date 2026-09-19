"use client";

import {
  VStack,
  Link,
  Icon,
  Separator,
  HStack,
  Box,
  Circle,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { IconType } from "react-icons/lib";
import { PiBinoculars } from "react-icons/pi";
import { HiOutlineBellAlert, HiOutlineUserCircle } from "react-icons/hi2";
import { LuMessagesSquare, LuCalendarClock } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { handleLogout } from "@/utils/logout";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { fetchAgentMessages } from "@/lib/features/messages/messagesSlice";
import { fetchAgentNotifications } from "@/lib/features/notifications/notificationsSlice";

const AgentSidebar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const LogOut = async () => {
    await handleLogout(dispatch, router);
  };
  useEffect(() => {
    dispatch(fetchAgentMessages());
    dispatch(fetchAgentNotifications());
  }, [dispatch]);

  const notifications = useAppSelector(
    (state) => state.notifications.agentNotifications
  );
  const unreadNotifications = notifications.filter((n) => n.read === false);
  const unreadNotificationsLength = unreadNotifications.length;

  const messages = useAppSelector((state) => state.messages.messages.data);
  const unreadMessages = messages.filter((n) => n.read === false);
  const unreadMessagesLength = unreadMessages.length;

  return (
    <Box bg="#ECECEC" p="4rem 2rem" borderRadius="30px">
      <VStack align="start" gap={7} m="auto">
        <NavItem href="/dashboard/agent" label="Overview" icon={PiBinoculars} />
        <NavItem
          href="/dashboard/agent/profile"
          label="Profile"
          icon={HiOutlineUserCircle}
        />
        <NavItem
          href="/dashboard/agent/notifications"
          label="Notifications"
          icon={HiOutlineBellAlert}
          count={unreadNotificationsLength}
        />
        <NavItem
          href="/dashboard/agent/savedProperties"
          label="Saved Properties"
          icon={IoHomeOutline}
        />
        <NavItem
          href="/dashboard/agent/inspections"
          label="Inspections"
          icon={LuCalendarClock}
        />
        <NavItem
          href="/dashboard/agent/catalogues"
          label="My Catalogue"
          icon={FaRegHeart}
        />
        <NavItem
          href="/dashboard/agent/messages"
          label="Messages"
          icon={LuMessagesSquare}
          count={unreadMessagesLength}
        />
        <Separator
          orientation="horizontal"
          borderColor="#074C98"
          variant="solid"
          w="100%"
          my={8}
        />
        <NavItem
          href="/dashboard/agent/security"
          label="Security"
          icon={FiSettings}
        />
        <HStack
          color="#ff0000"
          _hover={{ color: "#FFFFFF", bg: "#ff0000" }}
          fontSize="24px"
          w="full"
          px="1rem"
          transition="all 0.2s ease-in-out"
          cursor="pointer"
          onClick={LogOut}
        >
          <Icon as={FiLogOut} boxSize={8} mr={4} />
          Log Out
        </HStack>
        <Link
          as={NextLink}
          href="/"
          bg="#4169E0"
          fontWeight={600}
          fontSize="14px"
          color="#EFF3FA"
          w="full"
          h="46px"
          justifyContent="center"
          borderRadius="5px"
          mt="auto"
        >
          Back to Home
        </Link>
      </VStack>
    </Box>
  );
};

const NavItem = ({
  href,
  label,
  icon,
  count,
}: {
  href: string;
  label: string;
  icon: IconType;
  count?: number;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      as={NextLink}
      href={href}
      display="flex"
      alignItems="center"
      color={isActive ? "#FFFFFF" : "#074C98"}
      bg={isActive ? "#074C98" : ""}
      _hover={{ color: "#FFFFFF", bg: "#074C98" }}
      fontSize="24px"
      w="full"
      px="1rem"
      transition="all 0.2s ease-in-out"
      textDecoration="none"
    >
      <HStack fontSize="inherit">
        <Icon
          as={icon}
          boxSize={8}
          mr={4}
          color={isActive ? "#FFFFFF" : "#258C37"}
          transition="all 0.2s ease-in-out"
        />
        {label}
        {count
          ? count > 0 && (
              <Circle size="10" bg="red" color="white" fontSize="inherit">
                {count}
              </Circle>
            )
          : null}
      </HStack>
    </Link>
  );
};

export default AgentSidebar;
