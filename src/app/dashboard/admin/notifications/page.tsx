"use client";

import Pagination from "@/components/Pagination";
import {fetchAdminNotifications} from "@/lib/features/notifications/notificationsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Box, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { NotificationCard } from "@/components/Card";

const AdminNotifications = () => {
  const { notifications, loading } = useAppSelector((state) => state.notifications);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAdminNotifications());
  }, [dispatch]);
  return (
    <Box pb="2rem">
      <Text p={{base: "2rem 1rem", md: "2rem 4rem"}} fontWeight={500} fontSize="30px">
        Notifications
      </Text>
        <Pagination
          data={notifications}
          resetTrigger={notifications.length}
          title="Notifications"
          emptyMessage="No Notification available..."
          isLoading= {loading}
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

export default AdminNotifications;
