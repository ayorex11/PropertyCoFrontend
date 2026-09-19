import { StarRating } from '@/components/StarRating'
import { Box, Button, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { IoCall } from 'react-icons/io5'
import { AiOutlineMessage } from "react-icons/ai";

const PropCo = () => {
  return (
    <VStack color="#000048" bg="#ECECEC" p="2rem 1rem" gap={4}>
        <Text fontWeight={500} fontSize="23px">PropertyCo</Text>
        <Box color="#F5D111">
          <StarRating rating={4} boxSize={7}/>
        </Box>
        <VStack bg="#DEDEDE" p="1rem" boxShadow="0px 4px 4px #00000040" borderRadius="5px">
            <Text>080X XXX XXXX</Text>
            <Button bg="#4169E0" color="#EFF3FA">
                <IoCall/> Call About Property
            </Button>
        </VStack>
        <VStack bg="#DEDEDE" p="1rem" boxShadow="0px 4px 4px #00000040" borderRadius="5px">
          <Button bg="#4169E0" color="#EFF3FA">
              <AiOutlineMessage/> Message About Property
          </Button>
        </VStack>
    </VStack>
  )
}

export default PropCo
