"use client";

import Pagination from "@/components/Pagination";
import {fetchAgentNotifications} from "@/lib/features/notifications/notificationsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Box, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { NotificationCard } from "@/components/Card";

const AgentNotifications = () => {
  const { agentNotifications, agentNotificationLoading } = useAppSelector((state) => state.notifications);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAgentNotifications());
  }, [dispatch]);
  return (
    <Box pb="2rem">
      <Text p={{base: "2rem 1rem", md: "2rem 4rem"}} fontWeight={500} fontSize="30px">
        Notifications
      </Text>
        <Pagination
          data={agentNotifications}
          resetTrigger={agentNotifications.length}
          title="Notifications"
          emptyMessage="No Notification available..."
          isLoading= {agentNotificationLoading}
          type="blog"
          render={(notification) => (
            <Box px={{md: "4rem"}}>
              <NotificationCard notifications={notification} />
            </Box>
          )}
        />
    </Box>
  );
};

export default AgentNotifications;
