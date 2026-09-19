import BlogList from '@/components/Blog/BlogList'
import { Layout } from '@/components/Layout'
import { Box, Text, Stack} from '@chakra-ui/react'
import React from 'react'

const Blog = () => {
  return (
    <Layout>
        <Box w={{base: "100%", md: "1100px"}} m="auto" mb="5rem">
            <Stack>
                <Box p="1rem" bg="#ECECEC" borderRadius="25px">
                    <Text color="#000048" fontSize="32px" m="auto" pl="40px" fontWeight={500}>Blog</Text>
                </Box>
                <BlogList/>
            </Stack>
        </Box>
    </Layout>
  )
}

export default Blog;