"use client";

import { useForm } from "react-hook-form";
import { closeModals, openSignup } from "@/lib/features/modal/modalSlice";
// import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { ApiErrorResponse } from "@/lib/types";
import {
  AspectRatio,
  Box,
  Button,
  CloseButton,
  Float,
  Grid,
  GridItem,
  Input,
  InputGroup,
  Span,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CiUser } from "react-icons/ci";
import { PasswordInput } from "../ui/password-input";
import { errorToast, successToast } from "@/utils/CustomToast";
import { LoginPayload, loginSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { loginUser } from "@/lib/features/auth/authSlice";
import { loginApi } from "@/lib/api/authApi";

export default function LoginModal() {
  const dispatch = useAppDispatch();
  // const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginPayload) => {
    try {
      const res = await loginApi(data);
      dispatch(loginUser(res));
      successToast("Logged in successfully");
      dispatch(closeModals());
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as ApiErrorResponse;
        // Extract first error message
        const firstError =
      typeof data === "string"
        ? data
        : Object?.values(data)?.[0]?.[0] ?? "Invalid login details";
        errorToast(firstError);
      } else {
        errorToast("Unexpected error occurred");
      }
    }
  };
  return (
    <VStack
      position="fixed"
      w="100%"
      h="100vh"
      justifyContent="center"
      zIndex={30}
      bg="#FFFFFFA2"
      backdropFilter="blur(5px)"
      overflowY="auto"
    >
      <Box bg="#FFFFFF" w={{base: "90%", md: "4xl"}} borderRadius="20px" maxH="100vh" overflowY="auto" pos="relative" overflow="hidden">
        <Float offset={10} zIndex={30}>
          <CloseButton onClick={() => dispatch(closeModals())} color={{ base: "#000000", md: "white"}}/>
        </Float>
        <Grid templateColumns={{base: "1", md: "repeat(2, 1fr)"}}>
          <GridItem px={{base: "", md: "2rem"}}>
            <VStack h="100%" justifyContent="center" py="2rem">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <VStack color="#000048" gap={5} textAlign="center">
                  <VStack gap={0}>
                    <Text fontWeight={500} fontSize="33px">
                      Welcome back!
                    </Text>
                    <Text fontWeight={500} fontSize="15px">
                      Enter your credentials to access your account
                    </Text>
                  </VStack>
                  <InputGroup endElement={<CiUser />}>
                    <Input
                      {...register("username")}
                      placeholder="Enter your email address"
                      border="1px solid #1944B4"
                      borderRadius="10px"
                    />
                  </InputGroup>
                  <PasswordInput
                    {...register("password")}
                    placeholder="Enter your Password"
                    border="1px solid #1944B4"
                    borderRadius="10px"
                    onPaste={(e) => e.preventDefault()}
                    onCopy={(e) => e.preventDefault()}
                  />
                  {Object.values(errors).length > 0 && (
                    <Box
                      mt={4}
                      bg="red.50"
                      p={3}
                      borderRadius="md"
                      border="1px solid"
                      borderColor="red.200"
                    >
                      <Text fontWeight="bold" color="red.600" mb={2} fontSize="15px">
                        Please fix the following errors:
                      </Text>
                      <VStack gap={1} align="start" fontSize="15px">
                        {Object.values(errors).map((error, index) => (
                          <Text key={index} fontSize="sm" color="red.500">
                            • {error.message}
                          </Text>
                        ))}
                      </VStack>
                    </Box>
                  )}
                  <Button type="submit" bg="#4169E0" borderRadius="10px" w="140px" disabled={isSubmitting} loading={isSubmitting}>
                    Login
                  </Button>
                </VStack>
              </form>
              <Box color="#000000" mt={4} fontWeight={500} textAlign="center" fontSize="15px">
                Don&apos;t have an account?{" "}
                <Span onClick={() => dispatch(openSignup())} color="#0F3DDE" cursor="pointer" fontSize="15px">
                  Create One
                </Span>
              </Box>
            </VStack>
          </GridItem>
          <GridItem position="relative" display={{base: "none", md:"grid"}}>
            <AspectRatio ratio={480/640}>
              <Image src="/modal/auth_modal_bg.png" fill alt="Modal bg"/>
            </AspectRatio>
          </GridItem>
        </Grid>
      </Box>
    </VStack>
  );
}
