// app/blog/[id]/page.tsx
"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Text, Spinner, Stack, AspectRatio, Box, Button } from "@chakra-ui/react";
import { Layout } from "@/components/Layout";
import Image from "next/image";
import { FaArrowLeftLong } from "react-icons/fa6";
import { formatDateToReadableGB } from "@/utils/converters";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchBlogById } from "@/lib/features/blogs/blogsSlice";
import { errorToast } from "@/utils/CustomToast";
import Link from "next/link";

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch()
  const {data, loading} = useAppSelector((state)=>state.blogs.blogDetail)
  
  useEffect(() => {
    if(!id){
        errorToast("Invalid Blog Id")
        return;
    }
    const blogId = Array.isArray(id) ? id[0] : id;
    if (blogId) {
      dispatch(fetchBlogById(blogId));
    }
  }, [id, dispatch]);

  if (loading) return <Spinner size="xl"/>
  if (!data) return(<Layout><Text w={{ base: "100%", md: "1000px" }} mx="auto" color="#074C98" my="5rem" fontSize="24px" px={{base: "1rem", md: "0rem"}}>No Blog Found.</Text></Layout>);

  return (
    <Layout>
        <Stack w={{ base: "100%", md: "1000px" }} mx="auto" color="#074C98" mt="1rem" mb="5rem" px={{base: "1rem", md: "0rem"}}>
            <Text fontWeight={700} fontSize="38px">
                {data.title}
            </Text>
            <Text fontSize="21px">
                {formatDateToReadableGB(data.date_created)}
            </Text>
            <Box position="relative">
                <AspectRatio ratio={1314/505} position="relative">
                    <Image src={data.image} alt="Blog image" fill style={{ objectFit: "cover", borderRadius: "1.5rem" }}/>
                </AspectRatio>
            </Box>
            <Text fontSize="24px" mb="2rem">
                {data.body}
            </Text>
            <Link href="/blog">
                <Button bg="#D9D9D9" w="fit-content">
                    <FaArrowLeftLong/> Back to Articles
                </Button>
            </Link>
        </Stack>
    </Layout>
  );
};

export default BlogDetails;