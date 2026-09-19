import {
  Button,
  Icon,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { LuSearch } from "react-icons/lu";
import HouseLogo from "@/lib/icons/house.svg";

const ReqProp = () => {
  return (
    <VStack textAlign="center" color="#000048" bg="#ECECEC" p="2rem 1rem" gap={2}>
      <Icon as={LuSearch} boxSize={20} />
      <Text fontSize="20px">Can&apos;t find what you want?</Text>
      <Button bg="#258C3A">
        <Image src={HouseLogo} alt="House Logo" objectFit="fill" />
        <Stack lineHeight="5px" alignItems="left">
          <Text>Request a Property</Text>
          <Text fontWeight="normal" textAlign="left" fontSize="10px">
            (Free)
          </Text>
        </Stack>
      </Button>
    </VStack>
  );
};

export default ReqProp;
