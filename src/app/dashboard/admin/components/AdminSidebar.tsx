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
import { HiOutlineBellAlert } from "react-icons/hi2";
import {
  LuMessagesSquare,
  LuCalendarClock,
  LuUsersRound,
} from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { GrNotes } from "react-icons/gr";
import { handleLogout } from "@/utils/logout";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { fetchAdminMessages } from "@/lib/features/messages/messagesSlice";
import { fetchAdminNotifications } from "@/lib/features/notifications/notificationsSlice";

const AdminSidebar = () => {
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

  return (
    <Box bg="#ECECEC" p="4rem 2rem" borderRadius="30px">
      <VStack align="start" gap={7} m="auto">
        <NavItem href="/dashboard/admin" label="Overview" icon={PiBinoculars} />
        <NavItem
          href="/dashboard/admin/notifications"
          label="Notifications"
          icon={HiOutlineBellAlert}
          count={unreadNotificationsLength}
        />
        <NavItem
          href="/dashboard/admin/messages"
          label="Messages"
          icon={LuMessagesSquare}
          count={unreadMessagesLength}
        />
        <NavItem
          href="/dashboard/admin/savedProperties"
          label="Saved Properties"
          icon={FaRegHeart}
        />
        <NavItem
          href="/dashboard/admin/inspections"
          label="Inspections"
          icon={LuCalendarClock}
        />
        <NavItem
          href="/dashboard/admin/catalogues"
          label="Catalogue"
          icon={IoHomeOutline}
        />
        <NavItem
          href="/dashboard/admin/agentProperties"
          label="Agent Properties"
          icon={IoHomeOutline}
        />
        <NavItem
          href="/dashboard/admin/members"
          label="Members"
          icon={LuUsersRound}
        />
        <NavItem href="/dashboard/admin/blogs" label="Blog" icon={GrNotes} />
        <Separator
          orientation="horizontal"
          borderColor="#074C98"
          variant="solid"
          w="100%"
          my={8}
        />
        <NavItem
          href="/dashboard/admin/security"
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
      position="relative"
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

export default AdminSidebar;
