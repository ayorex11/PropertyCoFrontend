"use client";

import { inspectionPayload, inspectionSchema } from "@/schemas/schema";
import { Box, Button, Field, HStack, RadioGroup, Separator, Spinner, Stack, Text } from "@chakra-ui/react";
import Select from "react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ApiErrorResponse, InspectionOptionType, Property } from "@/lib/types";
import { fetchSavedProperties } from "@/lib/features/savedProperties/savedPropertiesSlice";
import { PropertyCard } from "@/components/Card";
import { fetchSinglePropertyApi } from "@/lib/api/propertiesApi";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { formatDateToReadableGB } from "@/utils/converters";
import { timeslotOptions } from "@/components/options";
import { errorToast, successToast } from "@/utils/CustomToast";
import axios from "axios";
import { fetchInspections } from "@/lib/features/inspections/inspectionsSlice";
import { createInspectionsApi } from "@/lib/api/inspectionsApi";
import { format, parseISO } from "date-fns";

const CreateAgentInspection = () => {
  const dispatch = useAppDispatch();
  const { savedProperties, loading } = useAppSelector(
    (state) => state.savedProperties
  );
  // Local state for the details of each property
  const [propDetails, setPropDetails] = useState<{
    prop_1: Property | null;
    prop_2: Property | null;
    prop_3: Property | null;
  }>({
    prop_1: null,
    prop_2: null,
    prop_3: null,
  });
  const [propLoading, setPropLoading] = useState<{
    prop_1: boolean;
    prop_2: boolean;
    prop_3: boolean;
  }>({
    prop_1: false,
    prop_2: false,
    prop_3: false,
  })
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<inspectionPayload>({ resolver: zodResolver(inspectionSchema) });

  const propertyOptions: InspectionOptionType[] = savedProperties.map(
    (property) => ({
      id: String(property.id),
      name: property.prop.name,
      idprop: String(property.prop.id),
    })
  );

  useEffect(() => {
    dispatch(fetchSavedProperties());
  }, [dispatch]);

  const prop1 = watch("prop_1");
  const prop2 = watch("prop_2");
  const prop3 = watch("prop_3");

  const filteredOptions1 = propertyOptions.filter(
    (opt) => opt.id !== prop2 && opt.id !== prop3
  );

  const filteredOptions2 = propertyOptions.filter(
    (opt) => opt.id !== prop1 && opt.id !== prop3
  );

  const filteredOptions3 = propertyOptions.filter(
    (opt) => opt.id !== prop1 && opt.id !== prop2
  );

  // Generic fetcher for a given property
  const propDetailsRef = useRef(propDetails);
  useEffect(() => {
    propDetailsRef.current = propDetails;
  }, [propDetails]);
  
  const fetchAndSet = useCallback(
  async (id: string | undefined, slot: keyof typeof propDetails) => {
    if (!id?.trim()) {
      setPropDetails(prev => ({ ...prev, [slot]: null }));
      return;
    }

    const matched = propertyOptions.find(prop => prop.id === id);
    if (!matched?.idprop) return;

    // Avoid re-fetch if same property already loaded
    if (String(propDetailsRef.current[slot]?.id) === matched.idprop) return;

    try {
      setPropLoading(prev => ({ ...prev, [slot]: true }));
      const data = await fetchSinglePropertyApi(matched.idprop);
      if (!data) throw new Error("Failed to fetch");
      setPropDetails(prev => ({ ...prev, [slot]: data }));
      propDetailsRef.current = {
        ...propDetailsRef.current,
        [slot]: data
      };
    } catch (error) {
      console.error(`Error fetching property for ${slot}`, error);
    } finally {
      setPropLoading(prev => ({ ...prev, [slot]: false }));
    }
  },
  [propertyOptions] // no propDetails dependency here
);

  // Watch all three values and fetch separately
  useEffect(() => {
    if (prop1?.trim()) {
      fetchAndSet(prop1, "prop_1");
    }
  }, [prop1, fetchAndSet]);

  useEffect(() => {
    if (prop2?.trim()) {
      fetchAndSet(prop2, "prop_2");
    }
  }, [prop2, fetchAndSet]);

  useEffect(() => {
    if (prop3?.trim()) {
      fetchAndSet(prop3, "prop_3");
    }
  }, [prop3, fetchAndSet]);

  const onSubmit = async(data: inspectionPayload)=> {
    console.log("data", data)
    try {
      await createInspectionsApi(data);
      await dispatch(fetchInspections());
      successToast("Inspection Created successfully");
    } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const data = err.response?.data as ApiErrorResponse;
      // Extract first error message
      let firstError = "Unable to create inspection";
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
  }

  return (
    <Box>
      <Text px={{md: "4rem"}} textAlign={{base: "center", md: "left"}} py="2rem" fontWeight={500} fontSize="30px">
        Create Inspection
      </Text>
      <Text
        p={{base: "2rem 1rem", md: "2rem 4rem"}}
        textAlign={{base: "justify", md: "left"}}
        fontWeight={500}
        fontSize="16px"
        color="#FF1111"
        bg="#FFFFFF"
      >
        Multiple property inspections per time are only allowed for properties
        within the same District
      </Text>
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack p={{base: "2rem 0rem", md: "2rem 4rem"}} gap={5}>
          <Field.Root>
            <Stack w="full" gap={5}>
              <Controller
                name="prop_1"
                control={control}
                render={({ field }) => (
                  <HStack gap={5} flexDir={{ base: "column", md: "row"}}>
                    <Field.Label fontWeight={600} fontSize="22px" flexShrink={0}>
                      Property 1
                    </Field.Label>
                    <Select
                      placeholder="Select from Saved Properties"
                      options={filteredOptions1}
                      isClearable
                      isLoading={loading}
                      getOptionLabel={(option: InspectionOptionType) =>
                        option.name
                      }
                      getOptionValue={(option: InspectionOptionType) => option.id}
                      onChange={(selectedOption) =>
                        field.onChange(
                          (selectedOption as InspectionOptionType)?.id
                        )
                      }
                      value={propertyOptions.find(
                        (option) => option.id === field.value
                      )}
                      className="w-full"
                    />
                  </HStack>
                )}
              />
              {propLoading.prop_1 ? <Spinner size="xl"/> : propDetails.prop_1 && prop1 && (
                <PropertyCard property={propDetails.prop_1} variant="inspection"/>
              )}
            </Stack>
          </Field.Root>
          <Field.Root>
            <Stack w="full" gap={5}>
              <Controller
                name="prop_2"
                control={control}
                render={({ field }) => (
                  <HStack gap={5} flexDir={{ base: "column", md: "row"}}>
                    <Field.Label fontWeight={600} fontSize="22px" flexShrink={0}>
                      Property 2
                    </Field.Label>
                    <Select
                      placeholder="Select from Saved Properties"
                      options={filteredOptions2}
                      isClearable
                      isLoading={loading}
                      getOptionLabel={(option: InspectionOptionType) =>
                        option.name
                      }
                      getOptionValue={(option: InspectionOptionType) => option.id}
                      onChange={(selectedOption) =>
                        field.onChange(
                          (selectedOption as InspectionOptionType)?.id
                        )
                      }
                      value={propertyOptions.find(
                        (option) => option.id === field.value
                      )}
                      className="w-full"
                    />
                  </HStack>
                )}
              />
              {propLoading.prop_2 ? <Spinner size="xl"/> : propDetails.prop_2 && prop2 && (
                <PropertyCard property={propDetails.prop_2} variant="inspection"/>
              )}
            </Stack>
          </Field.Root>
          <Field.Root>
            <Stack w="full" gap={5}>
              <Controller
                name="prop_3"
                control={control}
                render={({ field }) => (
                  <HStack gap={5} flexDir={{ base: "column", md: "row"}}>
                    <Field.Label fontWeight={600} fontSize="22px" flexShrink={0}>
                      Property 3
                    </Field.Label>
                    <Select
                      placeholder="Select from Saved Properties"
                      options={filteredOptions3}
                      isClearable
                      isLoading={loading}
                      getOptionLabel={(option: InspectionOptionType) =>
                        option.name
                      }
                      getOptionValue={(option: InspectionOptionType) => option.id}
                      onChange={(selectedOption) =>
                        field.onChange(
                          (selectedOption as InspectionOptionType)?.id
                        )
                      }
                      value={propertyOptions.find(
                        (option) => option.id === field.value
                      )}
                      className="w-full"
                    />
                  </HStack>
                )}
              />
              {propLoading.prop_3 ? <Spinner size="xl"/> : propDetails.prop_3 && prop3 && (
                <PropertyCard property={propDetails.prop_3} variant="inspection"/>
              )}
            </Stack>
          </Field.Root>
        </Stack>
        <Separator border="10px solid #FFFFFF"/>
        <HStack p={{base: "2rem 0rem", md: "2rem 4rem"}} alignItems="flex-start" flexDir={{ base: "column", md: "row"}} gapY={5}>
          <Field.Root flex={1} invalid={!!errors.date}>
            <Field.Label fontWeight={600} fontSize="22px" mb={5} justifyContent={{base: "center", md: "flex-start"}} w="full">
              Date
            </Field.Label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <Stack w="full">
                  <Box bg="#FFFFFF" p="1rem">
                    <DayPicker
                      mode="single"
                      selected={field.value ? parseISO(String(field.value)) : undefined}
                      onSelect={(date) => {
                        if (!date) {
                          field.onChange("");
                          return;
                        }
                        // store as "YYYY-MM-DD"
                        field.onChange(format(date, "yyyy-MM-dd"));
                      }}
                      disabled={{ before: new Date(new Date().setDate(new Date().getDate() + 1)) }}
                    />
                  </Box>
                  {field.value && (
                    <Text fontSize="19px" bg="#B1CFEF" textAlign="center" fontFamily="var(--font-barlow)" p="5px">
                      {formatDateToReadableGB(String(field.value))}
                    </Text>
                  )}
                  {errors.date && (
                    <Field.ErrorText fontSize="16px" fontWeight={500} color="#FF1111">{errors.date.message}</Field.ErrorText>
                  )}
                </Stack>
              )}
            />
          </Field.Root>
          <Field.Root flex={1}>
            <Field.Label fontWeight={600} fontSize="22px" mb={5} justifyContent={{base: "center", md: "flex-start"}} w="full">Time</Field.Label>
            <Controller
              name="timeslot"
              control={control}
              render={({ field }) => (
                <RadioGroup.Root
                  name={field.name}
                  colorPalette="blue"
                  value={field.value}
                  onValueChange={({ value }) => {
                    field.onChange(value)
                  }}
                  w="full"
                >
                  <Stack gap="6" w="full"  alignItems={{base: "center", md: "flex-start"}}>
                    {timeslotOptions.map((slot) => (
                      <RadioGroup.Item key={slot.value} value={slot.value}>
                        <RadioGroup.ItemHiddenInput onBlur={field.onBlur} />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText fontSize="22px">{slot.label}</RadioGroup.ItemText>
                      </RadioGroup.Item>
                    ))}
                  </Stack>
                </RadioGroup.Root>
              )}
            />
          </Field.Root>
        </HStack>
        <Stack bg="#FFFFFF" gap={5}>
          <Text
            p={{base: "2rem 1rem", md: "2rem 4rem"}}
            textAlign={{base: "justify", md: "left"}}
            fontWeight={500}
            fontSize="16px"
            color="#FF1111"
          >
            Multiple property inspections per time are only allowed for properties
            within the same District
          </Text>
          <Text
            p={{base: "2rem 1rem", md: "2rem 4rem"}}
            textAlign={{base: "justify", md: "left"}}
            fontWeight={500}
            fontSize="16px"
            color="#FF1111"
          >
            After submitting, a member of staff would reach out to you. Please be aware that there i s a one-time administration fee of ₦5,000 that would be required.
          </Text>
          <Button type="submit" bg="#258C37" fontWeight={600} fontSize="21px" disabled={isSubmitting} loading={isSubmitting} loadingText="Creating..." w={{md: "380px"}} h="50px">
            Create
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default CreateAgentInspection;
