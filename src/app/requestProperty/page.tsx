import { Layout } from '@/components/Layout'
import PropertyRequest from '@/components/Properties/RequestProperty/page'
import { Box, Text, Stack } from '@chakra-ui/react'
import React from 'react'

const RequestProperty = () => {
  return (
    <Layout>
        <Box w={{ base: "100%", md: "1100px"}} m="auto" mb="5rem">
            <Stack>
                <Box p="1rem" bg="#ECECEC" borderRadius="25px">
                    <Text color="#000048" fontSize="32px" m="auto" pl="40px" fontWeight={500}>Request Property</Text>
                </Box>
                <PropertyRequest/>
            </Stack>
        </Box>
    </Layout>
  )
}

export default RequestProperty;