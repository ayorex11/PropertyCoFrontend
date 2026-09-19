"use client";

import {
  categoryOptions,
  districtOptions,
  paymentPlanOptions,
  propertyTypesOptions,
  subLocationOptions,
} from "@/components/options";
import { reqPropertyApi } from "@/lib/api/propertiesApi";
import { fetchProperties } from "@/lib/features/properties/propertiesSlice";
import { useAppDispatch } from "@/lib/hooks";
import { ApiErrorResponse } from "@/lib/types";
import {
  reqPropertyFormSchema,
  RequestPropFormPayload,
} from "@/schemas/schema";
import { handleNegative } from "@/utils/blocknegative";
import groupBy from "@/utils/categorizer";
import { errorToast, successToast } from "@/utils/CustomToast";
import {
  Box,
  Button,
  createListCollection,
  Field,
  Fieldset,
  Grid,
  GridItem,
  Input,
  InputGroup,
  Portal,
  RadioGroup,
  Select,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const LeftRequestProperty = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RequestPropFormPayload>({
    resolver: zodResolver(reqPropertyFormSchema),
  });
  const propTypes = createListCollection({ items: propertyTypesOptions });
  const categories = Object.entries(
    groupBy(propTypes.items, (item) => item.category)
  );
  const district = watch("sub_location");

  const paymentOptions = createListCollection({ items: paymentPlanOptions });
  const locationOptions = createListCollection({ items: subLocationOptions });
  const selectedAreas = Array.isArray(district)
    ? district.flatMap((sub) => districtOptions[sub] || [])
    : districtOptions[district] || [];
  const areaOptions = createListCollection({ items: selectedAreas });

  const onSubmit = async (data: RequestPropFormPayload) => {
    try {
      await reqPropertyApi(data);
      await dispatch(fetchProperties());
      successToast("Property Requested successfully");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as ApiErrorResponse;
        // Extract first error message
        let firstError = "Unable to request";
        if (typeof data === "string") {
          firstError = data;
        } else if (typeof data.detail === "string") {
          firstError = data.detail;
        } else if (Array.isArray(Object.values(data)[0])) {
          firstError = Object.values(data)[0][0];
        } else {
          firstError = String(Object.values(data)[0]);
        }
        errorToast(firstError);
      } else {
        errorToast("Unexpected error occurred");
      }
    }
  };
  return (
    <Box p="1rem" as="form" onSubmit={handleSubmit(onSubmit)} textAlign="right">
      <Stack gap={10} py={10}>
        <Field.Root>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(7, 1fr)"}}
            color="#000048"
            gap={5}
            w="full"
          >
            <GridItem colSpan={{base: 1, md: 2}} py={2}>
              <Field.Label
                fontWeight={600}
                fontSize="20px"
                w="full"
                lineHeight="28px"
                justifyContent={{md: "right"}}
              >
                Property Type:
              </Field.Label>
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 5 }} py="1rem">
              <Stack gap={5}>
                <Fieldset.Root>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup.Root
                        name={field.name}
                        value={field.value}
                        onValueChange={({ value }) => {
                          field.onChange(value);
                        }}
                        colorPalette="blue"
                      >
                        <Grid
                          gap={{ base: 0, md: 6 }}
                          templateColumns="repeat(3, 1fr)"
                          textAlign="left"
                        >
                          {categoryOptions.map((item) => (
                            <RadioGroup.Item
                              key={item.value}
                              value={item.value}
                            >
                              <RadioGroup.ItemHiddenInput
                                onBlur={field.onBlur}
                              />
                              <RadioGroup.ItemIndicator />
                              <RadioGroup.ItemText>
                                {item.label}
                              </RadioGroup.ItemText>
                            </RadioGroup.Item>
                          ))}
                        </Grid>
                      </RadioGroup.Root>
                    )}
                  />
                </Fieldset.Root>
                <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(4, 1fr)"}} gap={5}>
                  <GridItem colSpan={1}>
                    <Field.Root>
                      <Controller
                        control={control}
                        name="prop_type"
                        render={({ field }) => (
                          <Select.Root
                            name={field.name}
                            value={field.value}
                            onValueChange={({ value }) => field.onChange(value)}
                            onInteractOutside={() => field.onBlur()}
                            collection={propTypes}
                          >
                            <Select.HiddenSelect />
                            <Select.Control borderRadius="10px" bg="#B1CFEF">
                              <Select.Trigger>
                                <Select.ValueText placeholder="Type" />
                              </Select.Trigger>
                              <Select.IndicatorGroup>
                                <Select.Indicator />
                              </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                              <Select.Positioner>
                                <Select.Content>
                                  {categories.map(([category, items]) => (
                                    <Select.ItemGroup key={category}>
                                      <Select.ItemGroupLabel>
                                        <strong>{category}</strong>
                                      </Select.ItemGroupLabel>
                                      {items.map((item) => (
                                        <Select.Item
                                          item={item}
                                          key={item.value}
                                        >
                                          {item.label}
                                          <Select.ItemIndicator />
                                        </Select.Item>
                                      ))}
                                    </Select.ItemGroup>
                                  ))}
                                </Select.Content>
                              </Select.Positioner>
                            </Portal>
                          </Select.Root>
                        )}
                      />
                    </Field.Root>
                  </GridItem>
                  <GridItem>
                    <Input
                      {...register("beds")}
                      type="number"
                      min={0}
                      onKeyDown={handleNegative}
                      placeholder="No of Beds"
                      borderRadius="10px"
                      border="1px solid #1944B4"
                    />
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Field.Root>
                      <Controller
                        control={control}
                        name="payment_plan"
                        render={({ field }) => (
                          <Select.Root
                            name={field.name}
                            value={field.value}
                            onValueChange={({ value }) => field.onChange(value)}
                            onInteractOutside={() => field.onBlur()}
                            collection={paymentOptions}
                          >
                            <Select.HiddenSelect />
                            <Select.Control borderRadius="10px" bg="#B1CFEF">
                              <Select.Trigger>
                                <Select.ValueText placeholder="Payment Plan" />
                              </Select.Trigger>
                              <Select.IndicatorGroup>
                                <Select.Indicator />
                              </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                              <Select.Positioner>
                                <Select.Content>
                                  {paymentOptions.items.map((paymentOpt) => (
                                    <Select.Item
                                      item={paymentOpt}
                                      key={paymentOpt.value}
                                    >
                                      {paymentOpt.label}
                                      <Select.ItemIndicator />
                                    </Select.Item>
                                  ))}
                                </Select.Content>
                              </Select.Positioner>
                            </Portal>
                          </Select.Root>
                        )}
                      />
                    </Field.Root>
                  </GridItem>
                </Grid>
              </Stack>
            </GridItem>
          </Grid>
        </Field.Root>
        <Field.Root>
          <Grid
            templateColumns={{base: "repeat(1, 1fr)", md: "repeat(7, 1fr)"}}
            color="#000048"
            gap={5}
            w="full"
          >
            <GridItem colSpan={{base: 1, md: 2}} py={2}>
              <Field.Label
                fontWeight={600}
                fontSize="20px"
                w="full"
                lineHeight="28px"
                justifyContent={{md: "right"}}
              >
                Location:
              </Field.Label>
            </GridItem>
            <GridItem colSpan={5} py="1rem">
              <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)"}} gap={5}>
                <GridItem colSpan={1}>
                  <Field.Root>
                    <Controller
                      control={control}
                      name="sub_location"
                      render={({ field }) => (
                        <Select.Root
                          name={field.name}
                          value={field.value}
                          onValueChange={({ value }) => field.onChange(value)}
                          onInteractOutside={() => field.onBlur()}
                          collection={locationOptions}
                        >
                          <Select.HiddenSelect />
                          <Select.Control borderRadius="10px" bg="#B1CFEF">
                            <Select.Trigger>
                              <Select.ValueText placeholder="District" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                              <Select.Indicator />
                            </Select.IndicatorGroup>
                          </Select.Control>
                          <Portal>
                            <Select.Positioner>
                              <Select.Content>
                                {locationOptions.items.map((locationOpt) => (
                                  <Select.Item
                                    item={locationOpt}
                                    key={locationOpt.value}
                                  >
                                    {locationOpt.label}
                                    <Select.ItemIndicator />
                                  </Select.Item>
                                ))}
                              </Select.Content>
                            </Select.Positioner>
                          </Portal>
                        </Select.Root>
                      )}
                    />
                  </Field.Root>
                </GridItem>
                <GridItem colSpan={1}>
                  <Field.Root>
                    <Controller
                      control={control}
                      name="district"
                      render={({ field }) => (
                        <Select.Root
                          name={field.name}
                          value={field.value}
                          onValueChange={({ value }) => field.onChange(value)}
                          onInteractOutside={() => field.onBlur()}
                          collection={areaOptions}
                        >
                          <Select.HiddenSelect />
                          <Select.Control borderRadius="10px" bg="#B1CFEF">
                            <Select.Trigger>
                              <Select.ValueText placeholder="Area" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                              <Select.Indicator />
                            </Select.IndicatorGroup>
                          </Select.Control>
                          <Portal>
                            <Select.Positioner>
                              <Select.Content>
                                {areaOptions.items.map((areaOpt) => (
                                  <Select.Item
                                    item={areaOpt}
                                    key={areaOpt.value}
                                  >
                                    {areaOpt.label}
                                    <Select.ItemIndicator />
                                  </Select.Item>
                                ))}
                              </Select.Content>
                            </Select.Positioner>
                          </Portal>
                        </Select.Root>
                      )}
                    />
                  </Field.Root>
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </Field.Root>
        <Field.Root>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)" , md: "repeat(7, 1fr)"}}
            color="#000048"
            gap={5}
            w="full"
          >
            <GridItem colSpan={{base: 1, md: 2}} py={2}>
              <Field.Label
                fontWeight={600}
                fontSize="20px"
                w="full"
                lineHeight="28px"
                justifyContent={{md: "right"}}
              >
                Budget:
              </Field.Label>
            </GridItem>
            <GridItem colSpan={{base: 1, md: 5}}>
              <Controller
                name="budget"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputGroup startElement="₦">
                    <Input
                      {...field}
                      type="text"
                      inputMode="numeric"
                      borderRadius="10px"
                      border="1px solid #1944B4"
                      value={
                        field.value
                          ? Number(field.value).toLocaleString() // format with commas
                          : ""
                      }
                      onChange={(e) => {
                        // Remove commas first, then store raw number in RHF
                        const rawValue = e.target.value.replace(/,/g, "");
                        if (!isNaN(Number(rawValue))) {
                          field.onChange(rawValue);
                        }
                      }}
                      onKeyDown={handleNegative}
                    />
                  </InputGroup>
                )}
              />
            </GridItem>
          </Grid>
        </Field.Root>
        <Field.Root>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(7, 1fr)"}}
            color="#000048"
            gap={5}
            w="full"
          >
            <GridItem colSpan={{ base: 1, md: 2}} py={2}>
              <Field.Label
                fontWeight={600}
                fontSize="20px"
                w="full"
                lineHeight="28px"
                justifyContent={{md: "right"}}
              >
                More Details:
              </Field.Label>
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 5}}>
              <Stack gap={10}>
                <Textarea
                  {...register("description")}
                  borderRadius="10px"
                  border="1px solid #1944B4"
                  resize="none"
                  rows={8}
                  required
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
                    <Text
                      fontWeight="bold"
                      color="red.600"
                      fontSize="xl"
                      mb={2}
                      textAlign="center"
                    >
                      Please fix the following errors:
                    </Text>
                    <VStack gap={1} align="start">
                      {Object.values(errors).map((error, index) => (
                        <Text key={index} fontSize="lg" color="red.500">
                          • {error.message}
                        </Text>
                      ))}
                    </VStack>
                  </Box>
                )}
                <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  loadingText="Submitting..."
                  bg="#4169E0"
                  h="50px"
                >
                  Submit
                </Button>
              </Stack>
            </GridItem>
          </Grid>
        </Field.Root>
      </Stack>
    </Box>
  );
};

export default LeftRequestProperty;
