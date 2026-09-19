"use client";

import {
  categoryOptions,
  districtOptions,
  paymentPlanOptions,
  priceOptions,
  propertyTypesOptions,
  subLocationOptions,
} from "@/components/options";
import {
  approvePropertyApi,
  disapprovePropertyApi,
} from "@/lib/api/propertiesApi";
import { fetchProperties } from "@/lib/features/properties/propertiesSlice";
import { useAppDispatch } from "@/lib/hooks";
import { ApiErrorResponse } from "@/lib/types";
import { PropertyFormPayload } from "@/schemas/schema";
import groupBy from "@/utils/categorizer";
import { errorToast, successToast } from "@/utils/CustomToast";
import {
  AspectRatio,
  Box,
  Button,
  Checkbox,
  createListCollection,
  Field,
  Fieldset,
  For,
  Grid,
  GridItem,
  HStack,
  Input,
  InputGroup,
  Portal,
  RadioGroup,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";

type PropertyFormProps = {
  defaultValues: PropertyFormPayload;
  id: string | number;
};

const LeftProperty = ({ defaultValues, id }: PropertyFormProps) => {
  const [reason, setReason] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<PropertyFormPayload>({
    defaultValues: defaultValues,
  });
  const propTypes = createListCollection({ items: propertyTypesOptions });
  const categories = Object.entries(
    groupBy(propTypes.items, (item) => item.category)
  );
  const district = watch("sub_location");
  const propCat = watch("category");

  const paymentOptions = createListCollection({ items: paymentPlanOptions });
  const locationOptions = createListCollection({ items: subLocationOptions });
  const selectedAreas = Array.isArray(district)
    ? district.flatMap((sub) => districtOptions[sub] || [])
    : districtOptions[district] || [];
  const areaOptions = createListCollection({ items: selectedAreas });
  const selectedPriceOptions = Array.isArray(propCat)
    ? propCat.flatMap((sub) => priceOptions[sub] || [])
    : priceOptions[propCat] || [];

  const disapproveProperty = async () => {
    if (reason === "") {
      errorToast("Reason is required");
      return;
    }
    setIsSubmitting(true);
    try {
      if (id) {
        await disapprovePropertyApi(String(id), reason);
        await dispatch(fetchProperties());
        successToast("Property Refused successfully");
      } else {
        errorToast("Unable to refuse");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as ApiErrorResponse;
        // Extract first error message
        let firstError = "Unable to refuse";
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const approveProperty = async () => {
    setIsSubmitting(true);
    try {
      if (id) {
        await approvePropertyApi(String(id));
        await dispatch(fetchProperties());
        successToast("Property Approved successfully");
      } else {
        errorToast("Unable to approve");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as ApiErrorResponse;
        // Extract first error message
        let firstError = "Unable to approve";
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      p="1rem"
      as="form"
      onSubmit={handleSubmit(disapproveProperty)}
      textAlign={{md: "right"}}
    >
      <Stack gap={5}>
        <Field.Root disabled>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(7, 1fr)"}}
            color="#000048"
            gap={5}
            w="full"
          >
            <GridItem colSpan={{base: 1, md: 2}} py={{base: 1, md: 2}}>
              <Field.Label
                fontWeight={600}
                fontSize="20px"
                w="full"
                textAlign={{md: "right"}}
                lineHeight="28px"
                justifyContent={{md: "right"}}
              >
                Headline:
              </Field.Label>
            </GridItem>
            <GridItem colSpan={{base: 1, md: 5}}>
              <Input
                {...register("name")}
                borderRadius="10px"
                border="1px solid #1944B4"
                required
              />
            </GridItem>
          </Grid>
        </Field.Root>
        <Field.Root disabled>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(7, 1fr)"}}
            color="#000048"
            gap={5}
            w="full"
          >
            <GridItem colSpan={{base: 1, md: 2}} py={{base: 1, md: 2}}>
              <Field.Label
                fontWeight={600}
                fontSize="20px"
                w="full"
                textAlign={{md: "right"}}
                lineHeight="28px"
                justifyContent={{md: "right"}}
              >
                Property Description:
              </Field.Label>
            </GridItem>
            <GridItem colSpan={{base: 1, md: 5}}>
              <Textarea
                {...register("description")}
                borderRadius="10px"
                border="1px solid #1944B4"
                resize="none"
                rows={8}
                required
              />
            </GridItem>
          </Grid>
        </Field.Root>
        <Field.Root disabled>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(7, 1fr)"}}
            color="#000048"
            gap={5}
            w="full"
          >
            <GridItem colSpan={{base: 1, md: 2}} py={{base: 1, md: 2}}>
              <Field.Label
                fontWeight={600}
                fontSize="20px"
                w="full"
                textAlign={{md: "right"}}
                lineHeight="28px"
                justifyContent={{md: "right"}}
              >
                More Details:
              </Field.Label>
            </GridItem>
            <GridItem colSpan={{base: 1, md: 5}}>
              <Textarea
                {...register("more_details")}
                borderRadius="10px"
                border="1px solid #1944B4"
                resize="none"
                rows={8}
                required
              />
            </GridItem>
          </Grid>
        </Field.Root>
        <Field.Root disabled>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(7, 1fr)"}}
            color="#000048"
            gap={5}
            w="full"
          >
            <GridItem colSpan={{base: 1, md: 2}} py={{base: 1, md: 2}}>
              <Field.Label
                fontWeight={600}
                fontSize="20px"
                w="full"
                textAlign={{md: "right"}}
                lineHeight="28px"
                justifyContent={{md: "right"}}
              >
                Property Type:
              </Field.Label>
            </GridItem>
            <GridItem colSpan={{base: 1, md: 5}} py="1rem">
              <Stack gap={5}>
                <Fieldset.Root>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup.Root
                        disabled
                        name={field.name}
                        value={field.value}
                        onValueChange={({ value }) => {
                          field.onChange(value);
                        }}
                        colorPalette="blue"
                      >
                        <Grid
                          gap={{ base: 0, md: 6}}
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
                <Grid templateColumns={{base: "repeat(2, 1fr)", md: "repeat(4, 1fr)"}} gap={5}>
                  <GridItem colSpan={{base: 2, md: 1}}>
                    <Field.Root disabled>
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
                      placeholder="No of Beds"
                      borderRadius="10px"
                      border="1px solid #1944B4"
                    />
                  </GridItem>
                  <GridItem>
                    <Input
                      {...register("toilets")}
                      type="number"
                      placeholder="Toilets"
                      borderRadius="10px"
                      border="1px solid #1944B4"
                    />
                  </GridItem>
                  <GridItem>
                    <Input
                      {...register("bathrooms")}
                      type="number"
                      placeholder="Bathrooms"
                      borderRadius="10px"
                      border="1px solid #1944B4"
                    />
                  </GridItem>
                  <GridItem>
                    <Input
                      // {...register("ma")}
                      type="number"
                      placeholder="Maids/BQ"
                      borderRadius="10px"
                      border="1px solid #1944B4"
                    />
                  </GridItem>
                  <GridItem>
                    <Controller
                      name="initial_deposit"
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
                          />
                        </InputGroup>
                      )}
                    />
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Field.Root disabled>
                      <Controller
                        control={control}
                        name="payment_options"
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
        <Field.Root disabled>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(7, 1fr)"}}
            color="#000048"
            gap={5}
            w="full"
          >
            <GridItem colSpan={{base: 1, md: 2}} py={{base: 1, md: 2}}>
              <Field.Label
                fontWeight={600}
                fontSize="20px"
                w="full"
                textAlign={{md: "right"}}
                lineHeight="28px"
                justifyContent={{md: "right"}}
              >
                Location:
              </Field.Label>
            </GridItem>
            <GridItem colSpan={{base: 1, md: 5}} py="1rem">
              <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(4, 1fr)"}} gap={5}>
                <GridItem colSpan={1}>
                  <Field.Root disabled>
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
                  <Field.Root disabled>
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
        <Field.Root disabled>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(7, 1fr)"}}
            color="#000048"
            gap={5}
            w="full"
          >
            <GridItem colSpan={{base: 1, md: 2}} py={{base: 1, md: 2}}>
              <Field.Label
                fontWeight={600}
                fontSize="20px"
                w="full"
                textAlign={{md: "right"}}
                lineHeight="28px"
                justifyContent={{md: "right"}}
              >
                Address or Suburb:
              </Field.Label>
            </GridItem>
            <GridItem colSpan={{base: 1, md: 5}}>
              <Textarea
                {...register("address")}
                borderRadius="10px"
                border="1px solid #1944B4"
                resize="none"
                rows={5}
              />
            </GridItem>
          </Grid>
        </Field.Root>
        <Field.Root disabled>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(7, 1fr)"}}
            color="#000048"
            gap={5}
            w="full"
          >
            <GridItem colSpan={{base: 1, md: 2}} py={{base: 1, md: 2}}>
              <Field.Label
                fontWeight={600}
                fontSize="20px"
                w="full"
                textAlign={{md: "right"}}
                lineHeight="28px"
                justifyContent={{md: "right"}}
              >
                Price:
              </Field.Label>
            </GridItem>
            <GridItem colSpan={{base: 1, md: 5}}>
              <Stack gap={5}>
                <Controller
                  name="price"
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
                      />
                    </InputGroup>
                  )}
                />
                <Fieldset.Root invalid={!!errors.price_options}>
                  <Controller
                    name="price_options"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup.Root
                        disabled
                        name={field.name}
                        value={field.value}
                        onValueChange={({ value }) => {
                          field.onChange(value);
                        }}
                        colorPalette="blue"
                      >
                        <Grid
                          gap={{ base: 0, md: 6}}
                          templateColumns="repeat(3, 1fr)"
                          textAlign="left"
                        >
                          {selectedPriceOptions.map((priceOpt) => (
                            <GridItem key={priceOpt.value}>
                              <RadioGroup.Item value={priceOpt.value}>
                                <RadioGroup.ItemHiddenInput
                                  onBlur={field.onBlur}
                                />
                                <RadioGroup.ItemIndicator />
                                <RadioGroup.ItemText>
                                  {priceOpt.label}
                                </RadioGroup.ItemText>
                              </RadioGroup.Item>
                            </GridItem>
                          ))}
                        </Grid>
                      </RadioGroup.Root>
                    )}
                  />
                </Fieldset.Root>
              </Stack>
            </GridItem>
          </Grid>
        </Field.Root>
        <Field.Root disabled>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(7, 1fr)"}}
            color="#000048"
            gap={5}
            w="full"
          >
            <GridItem colSpan={{base: 1, md: 2}} py={{base: 1, md: 2}}>
              <Field.Label
                fontWeight={600}
                fontSize="20px"
                w="full"
                textAlign={{md: "right"}}
                lineHeight="28px"
                justifyContent={{md: "right"}}
              >
                Media Upload:
              </Field.Label>
            </GridItem>
            <GridItem colSpan={{base: 1, md: 5}}>
              <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)"}} gap={5}>
                <For
                  each={[
                    "picture1",
                    "picture2",
                    "picture3",
                    "picture4",
                    "picture5",
                    "picture6",
                    "picture7",
                    "picture8",
                    "picture9",
                    "picture10",
                  ]}
                >
                  {(pic) =>
                    watch(pic) && (
                      <GridItem key={pic}>
                        <HStack gap={{base: 1, md: 2}} alignItems="flex-end">
                          <AspectRatio ratio={1 / 1} flex={1}>
                            <Image src={String(watch(pic))} alt={pic} fill />
                          </AspectRatio>
                          <Link href={String(watch(pic))} target="_blank">
                            <Button bg="#258C37" fontSize="18px">
                              View Media
                            </Button>
                          </Link>
                        </HStack>
                      </GridItem>
                    )
                  }
                </For>
              </Grid>
            </GridItem>
          </Grid>
        </Field.Root>
        <Field.Root disabled>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(7, 1fr)"}}
            color="#000048"
            gap={5}
            w="full"
          >
            <GridItem colSpan={{base: 1, md: 2}} py={{base: 1, md: 2}}>
              <Field.Label
                fontWeight={600}
                fontSize="20px"
                w="full"
                textAlign={{md: "right"}}
                lineHeight="28px"
                justifyContent={{md: "right"}}
              >
                Facilities:
              </Field.Label>
            </GridItem>
            <GridItem colSpan={{base: 1, md: 5}} py="1rem">
              <Grid templateColumns="repeat(3, 1fr)" gap={5}>
                <For
                  each={[
                    { key: "furnished", label: "Furnished" },
                    { key: "swimming_pool", label: "Swimming Pool" },
                    { key: "newly_built", label: "Newly Built" },
                    { key: "gym", label: "Gym" },
                    { key: "car_park", label: "Car Park" },
                    { key: "electricity", label: "24/7 Electricity" },
                    { key: "shared", label: "Shared" },
                  ]}
                >
                  {(facility) => (
                    <GridItem key={facility.key}>
                      <Controller
                        control={control}
                        name={
                          facility.key as
                            | "furnished"
                            | "swimming_pool"
                            | "newly_built"
                            | "gym"
                            | "car_park"
                            | "electricity"
                            | "shared"
                        }
                        render={({ field }) => (
                          <Field.Root disabled>
                            <Checkbox.Root
                              checked={field.value}
                              onCheckedChange={({ checked }) =>
                                field.onChange(checked)
                              }
                              colorPalette="blue"
                            >
                              <Checkbox.HiddenInput />
                              <Checkbox.Control />
                              <Checkbox.Label>{facility.label}</Checkbox.Label>
                            </Checkbox.Root>
                          </Field.Root>
                        )}
                      />
                    </GridItem>
                  )}
                </For>
              </Grid>
            </GridItem>
          </Grid>
        </Field.Root>
        <Field.Root disabled>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(7, 1fr)"}}
            color="#000048"
            gap={5}
            w="full"
          >
            <GridItem colSpan={{base: 1, md: 2}} py={{base: 1, md: 2}}>
              <Field.Label
                fontWeight={600}
                fontSize="20px"
                w="full"
                textAlign={{md: "right"}}
                lineHeight="28px"
                justifyContent={{md: "right"}}
              >
                Other Amenities:
              </Field.Label>
            </GridItem>
            <GridItem colSpan={{base: 1, md: 5}}>
              <Stack gap={5}>
                <Input
                  {...register("other_amenities")}
                  borderRadius="10px"
                  border="1px solid #1944B4"
                />
                <Grid templateColumns={{base: "repeat(2, 1fr)", md: "repeat(3, 1fr)"}}>
                  <GridItem colSpan={{base: 2, md: 3}}>
                    <Controller
                      control={control}
                      name="video_available_on_request"
                      render={({ field }) => (
                        <Field.Root disabled>
                          <Checkbox.Root
                            checked={field.value}
                            onCheckedChange={({ checked }) =>
                              field.onChange(checked)
                            }
                            colorPalette="blue"
                          >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                            <Checkbox.Label>Video Available on Request</Checkbox.Label>
                          </Checkbox.Root>
                        </Field.Root>
                      )}
                    />
                  </GridItem>
                </Grid>
                <Grid templateColumns="repeat(3, 1fr)">
                  <GridItem>
                    <Controller
                      control={control}
                      name="off_plan"
                      render={({ field }) => (
                        <Field.Root disabled>
                          <Checkbox.Root
                            checked={field.value}
                            onCheckedChange={({ checked }) =>
                              field.onChange(checked)
                            }
                            colorPalette="blue"
                          >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                            <Checkbox.Label>Off-Plan</Checkbox.Label>
                          </Checkbox.Root>
                        </Field.Root>
                      )}
                    />
                  </GridItem>
                  {/* <GridItem>
                    <Controller
                        control={control}
                        name="off_plan"
                        render={({ field }) => (
                          <Field.Root disabled>
                            <Checkbox.Root
                              checked={field.value}
                              onCheckedChange={({ checked }) =>
                                field.onChange(checked)
                              }
                              colorPalette="blue"
                            >
                              <Checkbox.HiddenInput />
                              <Checkbox.Control />
                              <Checkbox.Label>Agents</Checkbox.Label>
                            </Checkbox.Root>
                          </Field.Root>
                        )}
                      />
                  </GridItem> */}
                </Grid>
              </Stack>
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
            <GridItem colSpan={{base: 1, md: 2}} py={{base: 1, md: 2}}>
              <Field.Label
                fontWeight={600}
                fontSize="20px"
                w="full"
                textAlign={{md: "right"}}
                lineHeight="28px"
                justifyContent={{md: "right"}}
              >
                Admin Note:
              </Field.Label>
            </GridItem>
            <GridItem colSpan={{base: 1, md: 5}}>
              <HStack>
                <Textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  borderRadius="10px"
                  border="1px solid #1944B4"
                  resize="none"
                  rows={5}
                  placeholder="*compulsory for Denial"
                />
                <Stack gap={5}>
                  <Button
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    bg="#4169E0"
                    onClick={approveProperty}
                  >
                    Approve
                  </Button>
                  <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    bg="#FF1111"
                  >
                    Refuse
                  </Button>
                </Stack>
              </HStack>
            </GridItem>
          </Grid>
        </Field.Root>
      </Stack>
    </Box>
  );
};

export default LeftProperty;
