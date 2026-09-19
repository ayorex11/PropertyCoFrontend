"use client";

import { Controller, useForm } from "react-hook-form";
import { closeModals, openLogin } from "@/lib/features/modal/modalSlice";
// import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { ApiErrorResponse, countriesData, OptionType } from "@/lib/types";
import {
  Box,
  Button,
  CloseButton,
  Field,
  Float,
  HStack,
  Input,
  InputGroup,
  RadioGroup,
  Span,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CiUser, CiMail } from "react-icons/ci";
import { PasswordInput } from "../ui/password-input";
import Select from "react-select";
import { errorToast, successToast } from "@/utils/CustomToast";
import { RegisterPayload, registerSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { signupApi } from "@/lib/api/authApi";

export default function SignupModal() {
  const dispatch = useAppDispatch();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterPayload>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      country_code: "NG",
      account_type: "User",
    },
  });
  // 👇 Watch the email field
  const email = watch("email");

  useEffect(() => {
    if (email) {
      setValue("username", email, { shouldValidate: true });
    }
  }, [email, setValue]);

  const onSubmit = async (data: RegisterPayload) => {
    const countryCode =
      typeof data.country_code === "string"
        ? data.country_code
        : data.country_code?.value;

    const payload = {
      ...data,
      country_code: countryCode,
    };
    try {
      await signupApi(payload);
      successToast("Check your inbox for verification");
      dispatch(closeModals());
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as ApiErrorResponse;
        // Extract first error message
        const firstError =
          Object?.values(data)?.[0]?.[0] ?? "Something went wrong";
        errorToast(firstError);
      } else {
        errorToast("Unexpected error occurred");
      }
    }
  };

  const roles = [
    { value: "Agent", label: "Agent" },
    { value: "User", label: "User" },
  ];
  console.log("countries data", countriesData)
  return (
    <VStack
      position="fixed"
      w="100%"
      h="100vh"
      justifyContent="center"
      zIndex={30}
      bg="#FFFFFFA2"
      backdropFilter="blur(5px)"
    >
      <Box bg="#FFFFFF" maxW="lg" p="2rem" maxH="100vh" overflowY="auto" borderRadius="20px" pos="relative">
        <Float offset={10}>
          <CloseButton onClick={() => dispatch(closeModals())} />
        </Float>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <VStack color="#000048" gap={5}>
            <VStack gap={0}>
              <Text fontWeight={500} fontSize="35px">
                Welcome!
              </Text>
              <Text fontWeight={500} fontSize="15px">
                Create an account to enjoy all our services
              </Text>
            </VStack>
            <HStack>
              <InputGroup endElement={<CiUser />}>
                <Input
                  {...register("first_name")}
                  placeholder="First Name"
                  border="1px solid #1944B4"
                  borderRadius="10px"
                />
              </InputGroup>
              <InputGroup endElement={<CiUser />}>
                <Input
                  {...register("last_name")}
                  placeholder="Last Name"
                  border="1px solid #1944B4"
                  borderRadius="10px"
                />
              </InputGroup>
            </HStack>
            <InputGroup endElement={<CiMail />}>
              <Input
                {...register("email")}
                placeholder="Email address"
                border="1px solid #1944B4"
                borderRadius="10px"
              />
            </InputGroup>
            <PasswordInput
              {...register("password1")}
              placeholder="Password"
              border="1px solid #1944B4"
              borderRadius="10px"
              size="md"
              onPaste={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
            />
            <PasswordInput
              {...register("password2")}
              placeholder="Confirm Password"
              border="1px solid #1944B4"
              borderRadius="10px"
              size="md"
              onPaste={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
            />
            <Field.Root invalid={!!errors.country_code}>
              <Controller
                name="country_code"
                control={control}
                rules={{ required: 'Country code is required' }}
                render={({ field }) => (
                  <Select
                    placeholder="Country/Location"
                    options={countriesData}
                    getOptionLabel={(option: OptionType) => option.name}
                    getOptionValue={(option: OptionType) => option.id}
                    onChange={(selectedOption) => field.onChange((selectedOption as OptionType)?.id)}
                    value={countriesData.find(option => option.id === field.value)}
                    className="w-full"
                  />
                )}
              />
              <Field.ErrorText>{errors.country_code?.message}</Field.ErrorText>
            </Field.Root>
            <HStack w="100%">
              <Field.Root invalid={!!errors.phone_number}>
                <Controller
                  name="phone_number"
                  control={control}
                  rules={{
                    required: 'phone number is required',
                    minLength: { value: 10, message: 'Too short' },
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      country={'ng'}
                      value={field.value}
                      onChange={(value) => field.onChange(`+${value}`)}
                      inputClass="!w-full !h-10 !border !border-secondary-grey2 !text-sm"
                      placeholder="Phone Number"
                      countryCodeEditable={false}
                    />
                  )}
                />

                <Field.ErrorText>
                  {errors.phone_number?.message}
                </Field.ErrorText>
              </Field.Root>
            </HStack>
            <Controller
              name="account_type"
              control={control}
              render={({ field }) => (
                <RadioGroup.Root
                  name={field.name}
                  value={field.value}
                  onValueChange={({ value }) => {
                    field.onChange(value);
                  }}
                >
                  <HStack gap="6">
                    {roles.map((role) => (
                      <RadioGroup.Item key={role.value} value={role.value} colorPalette="blue">
                        <RadioGroup.ItemHiddenInput onBlur={field.onBlur} />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText fontSize="15px">{role.label}</RadioGroup.ItemText>
                      </RadioGroup.Item>
                    ))}
                  </HStack>
                </RadioGroup.Root>
              )}
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
                <VStack gap={1} align="start">
                  {Object.values(errors).map((error, index) => (
                    <Text key={index} fontSize="15px" color="red.500">
                      • {error.message}
                    </Text>
                  ))}
                </VStack>
              </Box>
            )}
            <Text textAlign="center">
              By clicking “Create Account”, you confirm that
              <br />
              you agree to our Terms of Use
            </Text>
            <Button type="submit" bg="#4169E0" borderRadius="10px" w="250px" disabled={isSubmitting} loading={isSubmitting}>
              Create Account
            </Button>
          </VStack>
        </form>
        <Box color="#000000" mt={4} fontWeight={500} textAlign="center" fontSize="15px">
          Already have an account?{" "}
          <Span onClick={() => dispatch(openLogin())} color="#0F3DDE" cursor="pointer" fontSize="15px">
            Login
          </Span>
        </Box>
      </Box>
    </VStack>
  );
}
