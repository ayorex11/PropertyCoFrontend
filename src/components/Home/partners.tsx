"use client";
import Image from 'next/image';
import Logo from '/public/logo.svg';
import { Box, Text, Stack } from "@chakra-ui/react";

export const Partners = () => {
  return (
    <Stack
      px="1rem"
      pb="1rem"
      w={{base: "100%", md: ("200px")}}
      m="auto"
      bg="#EBEBEB"
      alignItems="center"
    >
      <Text
        textAlign="center"
        ml="auto"
        mr="auto"
        mt="1rem"
        color="#808080"
        fontWeight="500"
        fontSize="12px"
      >
        Trusted by Partners and Agents
      </Text>
      <Box>
          <Image src={Logo} alt="Logo" />
      </Box>
    </Stack>
  );
};
