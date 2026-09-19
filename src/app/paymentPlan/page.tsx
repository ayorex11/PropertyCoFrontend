import AllProperties from '@/components/AllProperties'
import { Layout } from '@/components/Layout'
import SearchProperties from '@/components/SearchProperties'
import { Box, Text, Stack, Grid, GridItem } from '@chakra-ui/react'
import React from 'react'

const PaymentPlan = () => {
  return (
    <Layout>
        <Box w={{base: "100%", md: "1100px"}} m="auto" mb="5rem">
            <Stack>
                <Box p="1rem" bg="#ECECEC" borderRadius="25px">
                    <Text color="#000048" fontSize="32px" m="auto" pl="40px" fontWeight={500}>Payment Plan</Text>
                </Box>
                <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(3, 1fr)"}}>
                  <GridItem colSpan={{base: 1, md: 2}}>
                    <SearchProperties variant="searchbar" cat={['Rent', 'Sale', 'Joint Venture']}/>
                  </GridItem>
                </Grid>
                <AllProperties/>
            </Stack>
        </Box>
    </Layout>
  )
}

export default PaymentPlan;
