"use client";

import ImageUploaderWithCrop from "@/components/ImageUploader";
import {
  categoryOptions,
  districtOptions,
  paymentPlanOptions,
  priceOptions,
  propertyTypesOptions,
  subLocationOptions,
} from "@/components/options";
import { updatePropertyApi } from "@/lib/api/propertiesApi";
import { fetchProperties } from "@/lib/features/properties/propertiesSlice";
import { useAppDispatch } from "@/lib/hooks";
import { ApiErrorResponse } from "@/lib/types";
import { PropertyFormPayload, propertyFormSchema } from "@/schemas/schema";
import { handleNegative } from "@/utils/blocknegative";
import groupBy from "@/utils/categorizer";
import { errorToast, successToast } from "@/utils/CustomToast";
import { urlToFile } from "@/utils/StringToFile";
import {
  Box,
  Button,
  Checkbox,
  createListCollection,
  Field,
  Fieldset,
  For,
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
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

type PropertyFormProps = {
  defaultValues: PropertyFormPayload;
  id: string | number;
};

const LeftEditProperty = ({ defaultValues, id }: PropertyFormProps) => {
  const dispatch = useAppDispatch();

  const preprocessPictures = async (data: PropertyFormPayload) => {
    const entries = await Promise.all(
      Array.from({ length: 10 }, async (_, i) => {
        const key = `picture${i + 1}` as keyof PropertyFormPayload;
        const value = data[key];

        if (typeof value === "string" && value.startsWith("http")) {
          return [key, await urlToFile(value, `${key}.jpg`)] as const;
        }
        return [key, value] as const;
      })
    );

    return Object.fromEntries(entries) as Partial<PropertyFormPayload>;
  };
  
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFormPayload>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: defaultValues,
  });

  // Reset form when defaults ready
  useEffect(() => {
     const prepare = async () => {
      const pictures = await preprocessPictures(defaultValues);
      reset({ ...defaultValues, ...pictures });
    };
    prepare();
  }, [defaultValues, reset]);

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

  const onSubmit = async (data: PropertyFormPayload) => {
    try {
      if (defaultValues) {
        if (id) {
          await updatePropertyApi(id, data);
          await dispatch(fetchProperties());
          successToast("Property Edited successfully");
        } else {
          errorToast("Unable to edit");
        }
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as ApiErrorResponse;
        // Extract first error message
        let firstError = "Unable to edit";
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
      <Stack gap={5}>
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
                <Grid templateColumns={{base: "repeat(2, 1fr)", md: "repeat(4, 1fr)"}} gap={5}>
                  <GridItem colSpan={{base: 2, md: 1}}>
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
                  <GridItem>
                    <Input
                      {...register("toilets")}
                      type="number"
                      min={0}
                      onKeyDown={handleNegative}
                      placeholder="Toilets"
                      borderRadius="10px"
                      border="1px solid #1944B4"
                    />
                  </GridItem>
                  <GridItem>
                    <Input
                      {...register("bathrooms")}
                      type="number"
                      min={0}
                      onKeyDown={handleNegative}
                      placeholder="Bathrooms"
                      borderRadius="10px"
                      border="1px solid #1944B4"
                    />
                  </GridItem>
                  <GridItem>
                    <Input
                      // {...register("ma")}
                      type="number"
                      min={0}
                      placeholder="Maids/BQ"
                      borderRadius="10px"
                      border="1px solid #1944B4"
                      onKeyDown={handleNegative}
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
                          onKeyDown={handleNegative}
                          />
                        </InputGroup>
                      )}
                    />
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Field.Root>
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
                textAlign={{md: "right"}}
                lineHeight="28px"
                justifyContent={{md: "right"}}
              >
                Location:
              </Field.Label>
            </GridItem>
            <GridItem colSpan={{base: 1, md: 5}} py="1rem">
              <Grid templateColumns="repeat(4, 1fr)" gap={5}>
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
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(7, 1fr)"}}
            color="#000048"
            gap={5}
            w="full"
          >
            <GridItem colSpan={{base: 1 , md: 2}} py={2}>
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
            <GridItem colSpan={{base: 1 , md: 5}}>
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
        <Field.Root>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(7, 1fr)"}}
            color="#000048"
            gap={5}
            w="full"
          >
            <GridItem colSpan={{base: 1 , md: 2}} py={2}>
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
            <GridItem colSpan={{base: 1 , md: 5}}>
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
                        onKeyDown={handleNegative}
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
                        name={field.name}
                        value={field.value}
                        onValueChange={({ value }) => {
                          field.onChange(value);
                        }}
                        colorPalette="blue"
                      >
                        <Grid
                          gap={{base: 0 , md: 6}} 
                          templateColumns={{base: "repeat(2, 1fr)", md: "repeat(3, 1fr)"}}
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
                textAlign={{md: "right"}}
                lineHeight="28px"
                justifyContent={{md: "right"}}
              >
                Media Upload:
              </Field.Label>
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 5}}>
              <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)"}} gap={{base: 0, md: 5}}>
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
                  {(pic) => (
                    <GridItem key={pic}>
                      <ImageUploaderWithCrop
                        name={pic}
                        control={control}
                        aspect="257/350"
                        defaultImage={watch(pic)}
                      />
                    </GridItem>
                  )}
                </For>
              </Grid>
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
            <GridItem colSpan={{base: 1, md: 2}} py={2}>
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
              <Grid templateColumns={{base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap={5}>
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
                          <Field.Root>
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
                        <Field.Root>
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
                <Grid templateColumns={{base: "repeat(2, 1fr)", md: "repeat(3, 1fr)"}}>
                  <GridItem>
                    <Controller
                      control={control}
                      name="off_plan"
                      render={({ field }) => (
                        <Field.Root>
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
                          <Field.Root>
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

export default LeftEditProperty;
