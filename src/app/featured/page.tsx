import PropertiesFeatured from '@/components/Featured/PropertiesFeatured'
import { Layout } from '@/components/Layout'
import { Box, Text, Stack } from '@chakra-ui/react'
import React from 'react'

const Featured = () => {
  return (
    <Layout>
        <Box w={{base: "100%", md: "1100px"}} m="auto" mb="5rem">
            <Stack gap={5}>
                <Box p="1rem" bg="#ECECEC" borderRadius="25px">
                    <Text color="#000048" fontSize="32px" m="auto" pl="40px" fontWeight={500}>Featured Properties</Text>
                </Box>
                <PropertiesFeatured/>
            </Stack>
        </Box>
    </Layout>
  )
}

export default Featured;
