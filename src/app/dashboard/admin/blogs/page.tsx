"use client";

import { fetchBlogs, fetchDrafts } from "@/lib/features/blogs/blogsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Box, Button, HStack, Tabs, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Blogs from "./components/Blogs";
import { openBlogModal } from "@/lib/features/modal/modalSlice";

const AdminBlogs = () => {
  const { data: blogData, loading:blogLoading } = useAppSelector((state) => state.blogs.blogs);
  const { data: draftData, loading:draftLoading } = useAppSelector((state) => state.blogs.drafts);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBlogs());
    dispatch(fetchDrafts());
  }, [dispatch]);
  return (
    <Box pb="2rem">
      <Text px={{base: "1rem", md: "4rem"}} pt="2rem" pb="1rem" fontWeight={500} fontSize="30px">
        Articles
      </Text>
      <Tabs.Root defaultValue="live" variant="enclosed" colorPalette="blue">
        <Box px={{base: "1rem", md: "4rem"}} pb="2rem">
          <HStack gap={10}>
            <Tabs.List>
              <Tabs.Trigger fontWeight={600} fontSize="18px" bg="#FFFFFF" p="1.5rem 2rem" color="#074C98" _selected={{bg: "#074C98", color: "#FFFFFF"}} value="live">Live</Tabs.Trigger>
              <Tabs.Trigger fontWeight={600} fontSize="18px" bg="#FFFFFF" p="1.5rem 2rem" color="#074C98" _selected={{bg: "#074C98", color: "#FFFFFF"}} value="draft">Drafts</Tabs.Trigger>
            </Tabs.List>
            <Button
              bg="#258C37"
              onClick={() => {
                dispatch(openBlogModal({ isEdit: false }));
              }}
            >
              New Article
            </Button>
          </HStack>
        </Box>
        <Tabs.Content
          value="live"
        >
          <Blogs data={blogData} loading={blogLoading}/>
        </Tabs.Content>
        <Tabs.Content
          value="draft"
        >
          <Blogs data={draftData} loading={draftLoading} draft/>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export default AdminBlogs;
