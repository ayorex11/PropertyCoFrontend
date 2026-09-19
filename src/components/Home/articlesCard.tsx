"use client";
import { Box, Text, Button, AspectRatio, Float, Stack, Icon } from "@chakra-ui/react";
import { LuArrowRight } from "react-icons/lu";
import { Blog } from "@/lib/types";
import Image from "next/image";
import { formatDateDay } from "../../utils/converters";

export const ArticleCard = (props: Blog) => {
  return (
    <Stack position="relative" justifyContent="space-between">
      <Stack gap={5}>
        <AspectRatio ratio={4/3}>
          <Box borderRadius="30px">
              <Image src={props.image} alt="Test_Image" fill/>
              <Float offsetY="5" offsetX="5" placement="top-start">
                <Box
                  bg="white"
                  w="3.5rem"
                  h="3.5rem"
                  borderBottomRadius="0.8rem"
                  position="relative"
                  left="3rem"
                  overflowY="hidden"
                  p="2"
                >
                  {formatDateDay(props.date_created)}
                </Box>
              </Float>
          </Box>
        </AspectRatio>
        <Stack gap={3}>
          <Text color="white" fontSize="25px" lineHeight="30px">
            {props.title}
          </Text>
          <Text color="#D4D4D4" fontSize="14px" lineHeight="26px" truncate>
            {props.body}
          </Text>
        </Stack>
      </Stack>
      <Stack alignItems="flex-end" display={{ base: 'none', md: 'flex' }}>
        <Button
          w="3rem"
          h="3rem"
          borderRadius="100%"
          bg="white"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Icon as={LuArrowRight} color="#3A0CA3" width={7} height={7}/>
        </Button>
      </Stack>
    </Stack>
  );
};
