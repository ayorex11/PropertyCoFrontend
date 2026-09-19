import {
  Button,
  Heading,
  HStack,
  Input,
  InputGroup,
  Span,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LuArrowRight } from "react-icons/lu";

type ISubscribe = {
  type: "search" | "home" | "property";
};
const Subscribe = (props: ISubscribe) => {
  return (
    <Stack gap={6}>
      <Stack gap={1}>
        {props.type === "home" && (
          <Heading fontWeight={600} color="#110229" fontSize="18px">
            Subscribe
          </Heading>
        )}
        {props.type === "search" && (
          <Text color="#000048" fontSize="20px">
            Be the First to see <Span fontWeight={600} fontSize="20px">“What is New”</Span>
          </Text>
        )}
        {props.type === "property" && (
          <Text color="#000048" fontSize="20px">
            Be the First to see <Span fontWeight={600} fontSize="20px">“Our latest Properties”</Span>
          </Text>
        )}
        <Text color="#8F90A6" fontSize={props.type === "home" ? "12px" : "14px"} w="18rem">
          Subscribe to get the latest property and blog news from us
        </Text>

      </Stack>
      <HStack flexDir={{base: props.type === "search" || props.type === "property" ? "column" : "row", md: props.type === "search" ? "column" : "row"}} w="fit-content" gapY={5}>
        {props.type !== "home" && (
          <Input
            border="2px solid #D0D0E3"
            borderRadius="15px"
            h="50px"
            w="18rem"
            placeholder="Name"
            bg="#FFFFFF"
            color="#8F90A6"
          />
        )}
        <InputGroup endElement={props.type !== "property" &&<Button borderRadius="100%" bg="#4169E0" w="30px"><LuArrowRight /></Button>}>
          <Input
            border="2px solid #D0D0E3"
            borderRadius="15px"
            h="50px"
            w="18rem"
            placeholder="Email Address"
            bg="#FFFFFF"
            color="#8F90A6"
          />
        </InputGroup>
      </HStack>
      {props.type === "property" &&<Button bg="#4169E0" w="fit-content">Subscribe</Button>}
    </Stack>
  );
};

export default Subscribe;
