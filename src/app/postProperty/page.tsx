import { Layout } from '@/components/Layout'
import PropertyPost from '@/components/Properties/PostProperty/page'
import { Box, Text, Stack } from '@chakra-ui/react'
import React from 'react'

const PostProperty = () => {
  return (
    <Layout>
        <Box w={{ base: "100%", md: "1100px"}} m="auto" mb="5rem">
            <Stack>
                <Box p="1rem" bg="#ECECEC" borderRadius="25px">
                    <Text color="#000048" fontSize="32px" m="auto" pl="40px" fontWeight={500}>Post Property</Text>
                </Box>
                <PropertyPost/>
            </Stack>
        </Box>
    </Layout>
  )
}

export default PostProperty;