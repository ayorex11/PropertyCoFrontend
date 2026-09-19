"use client";
import {
  Box,
  Heading,
  Button,
  SimpleGrid,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { ArticleCard } from "./articlesCard";
import Link from "next/link";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchBlogs } from "@/lib/features/blogs/blogsSlice";

export const Articles = () => {
  const { data, loading } = useAppSelector((state) => state.blogs.blogs);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);
  return (
    <VStack
      gap={10}
      bg="#074C98"
      w={{ base: "100%", md: "1100px" }}
      m="auto"
      mt="4rem"
      mb="5rem"
      borderRadius={{md: "3.125rem"}}
      px={{ base: "3rem", md:"10rem"}}
      py="7rem"
      boxSizing="border-box"
    >
      <VStack mb="2rem" gap={8}>
        <Heading
          textAlign="center"
          color="white"
          fontWeight={500}
          fontSize={{ base: "13px", md: "17px"}}
          letterSpacing="15%"
        >
          WHAT&apos;S TRENDING
        </Heading>
        <Heading
          textAlign="center"
          fontWeight={600}
          color="white"
          fontSize={{ base: "25px", md: "37px"}}
        >
          Latest Blogs & Posts
        </Heading>
      </VStack>
      <Box w="100%" maxW="1000px" mx="auto">
        {data.length > 0 ? (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={5}>
            {data
              ?.slice(0, 3)
              ?.map(
                (blog: {
                  id: number;
                  title: string;
                  body: string;
                  image: string;
                  date_created: string;
                }) => (
                  <ArticleCard
                    id={blog.id}
                    key={blog.id}
                    title={blog.title}
                    body={blog.body}
                    image={blog.image}
                    date_created={blog.date_created}
                  />
                )
              )}
          </SimpleGrid>
        ) : loading ? (
          <VStack>
            <Spinner size="xl" color="white" />
          </VStack>
        ) : (
          <Heading
          textAlign="center"
          color="white"
          fontWeight={500}
          fontSize={{ base: "13px", md: "17px"}}
          letterSpacing="5%"
        >
          No Blogs Yet...
        </Heading>
        )}
      </Box>
      <Link href="/blog">
        <Button p="0" bg="#258C37" color="#EFF3FA" w={{base: "20rem", md: "25rem"}} m="auto">
          Go to Blog Page
        </Button>
      </Link>
    </VStack>
  );
};
