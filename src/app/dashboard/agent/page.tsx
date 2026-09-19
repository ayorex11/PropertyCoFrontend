"use client";

import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Icon,
  Span,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { IconType } from "react-icons/lib";
import { LuCalendarClock, LuMessagesSquare } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { fetchAgentProfile } from "@/lib/features/profile/profileSlice";
import AvatarFallback from "@/lib/icons/profile_white.svg";
import Image from "next/image";
import { fetchAgentNotifications } from "@/lib/features/notifications/notificationsSlice";

const AgentDashboard = () => {
  const { agentNotifications, agentNotificationLoading } = useAppSelector(
    (state) => state.notifications
  );
  const { data, loading } = useAppSelector((state) => state.profile.agent);
  const dispatch = useAppDispatch();
  const unreadNotifications = agentNotifications.filter((n) => n.read === false);
  const unreadNotificationsLength = unreadNotifications.length;
  useEffect(() => {
    dispatch(fetchAgentNotifications());
    dispatch(fetchAgentProfile());
  }, [dispatch]);
  if (loading) return <Spinner size="xl" />;
  if (!data) return null;
  return (
    <Box>
      <Stack gap={8}>
        <Box bg="#074C98" p="3rem">
          <HStack
            color="#FFFFFF"
            gap={10}
            flexDir={{ base: "column", md: "row" }}
          >
            {data?.profile_picture ? (
              <Avatar.Root w="150px" h="150px">
                <Avatar.Fallback
                  name={`${data?.first_name} ${data?.last_name}`}
                />
                <Avatar.Image src={data.profile_picture} />
              </Avatar.Root>
            ) : (
              <Box w="150px" h="150px">
                <AspectRatio ratio={1 / 1}>
                  <Image
                    src={AvatarFallback}
                    alt="Preview"
                    fill
                    style={{
                      borderRadius: "10px",
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </AspectRatio>
              </Box>
            )}
            <Stack>
              <Text
                fontWeight={600}
                fontSize="30px"
                textAlign={{ base: "center", md: "left" }}
              >
                Hello, Agent {data?.first_name} {data?.last_name}{" "}
                {data?.agency && (
                  <Span fontWeight={600} fontSize="30px">
                    of {data?.agency}
                  </Span>
                )}
              </Text>
              <Text
                fontWeight={600}
                fontSize="12px"
                textAlign={{ base: "center", md: "left" }}
              >
                You have{" "}
                <Span fontSize="30px">
                  {agentNotificationLoading ? (
                    <Spinner size="lg" />
                  ) : (
                    unreadNotificationsLength
                  )}
                </Span>{" "}
                new notifications
              </Text>
            </Stack>
          </HStack>
        </Box>
        <Box bg="#F5F5F5" p={{ base: "1rem 0rem", md: "1rem 2rem" }}>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(6, 1fr)" }}
            gap={5}
          >
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <DashCard
                label="My Profile"
                action="View/Edit"
                href="/dashboard/agent/profile"
                icon={HiOutlineUserCircle}
              />
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <DashCard
                label="Messages"
                action="View"
                href="/dashboard/agent/messages"
                icon={LuMessagesSquare}
              />
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <DashCard
                label="Subscription"
                action="View"
                href=""
                icon={LuCalendarClock}
              />
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 3 }}>
              <DashCard
                label="My Catalogue"
                action="View"
                href="/dashboard/agent/catalogues"
                icon={IoHomeOutline}
              />
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 3 }}>
              <DashCard
                label="Saved Properties"
                action="View"
                href="/dashboard/agent/savedProperties"
                icon={FaRegHeart}
              />
            </GridItem>
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
};

const DashCard = ({
  label,
  action,
  href,
  icon,
}: {
  label: string;
  action: string;
  href: string;
  icon: IconType;
}) => (
  <Box bg="#E1E1E1" borderRadius="10px" p="3rem 2rem" >
    <HStack justifyContent="space-between" alignItems="flex-end">
      <VStack alignItems={{ base: "flex-start", md: "center" }}>
        <Icon as={icon} boxSize={8} color="#258C37" />
        <Text textAlign={{ base: "left", md: "center" }} fontSize="16px">
          {label}
        </Text>
      </VStack>
      <Link href={href}>
        <Button bg="#4169E0">{action}</Button>
      </Link>
    </HStack>
  </Box>
);

export default AgentDashboard;
