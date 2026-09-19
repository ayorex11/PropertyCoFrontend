"use client";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  createListCollection,
  Fieldset,
  Grid,
  GridItem,
  HStack,
  Icon,
  Portal,
  Presence,
  Select,
  Separator,
  Stack,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import {
  setFilteredProperties,
  setFilteredPropertiesLoading,
} from "@/lib/features/properties/filteredProperties";
import {
  bedOptions,
  categoryOptions,
  districtOptions,
  paymentPlanOptions,
  prices,
  propertyTypesOptions,
  subLocationOptions,
} from "./options";
import groupBy from "../utils/categorizer";
import Image from "next/image";
import Location from "@/lib/icons/location.svg";
import { MdNavigateNext } from "react-icons/md";
import { LuSearch } from "react-icons/lu";
import Link from "next/link";
import { PropertyCategory } from "@/lib/types";

interface SearchPropertiesProps {
  variant: "home" | "searchbar";
  cat?: ("Rent" | "Sale" | "Joint Venture")[];
}

const SearchProperties: React.FC<SearchPropertiesProps> = ({
  variant = "home",
  cat = ["Rent"],
}) => {
  const selectedFilters = useAppSelector((state) => state.filters);
  const { data, loading } = useAppSelector(
    (state) => state.properties.properties
  );
  const [filters, setFilters] = useState({
    ...selectedFilters,
    category: Array.isArray(cat) ? cat : [cat],
  });
  const { open: searchOpen, onToggle: searchOnToggle } = useDisclosure();
  const { open: amenitiesOpen, onToggle: amenitiesOnToggle } = useDisclosure();
  const { open: paymentPlanOpen, onToggle: paymentPlanOnToggle } =
    useDisclosure();
  const dispatch = useAppDispatch();

  const filteredProperties = data.filter((prop) => {
    const price = prop.price;

    const meetsMin =
      filters.minPrice.length > 0 ? price >= Number(filters.minPrice[0]) : true;
    const meetsMax =
      filters.maxPrice.length > 0 ? price <= Number(filters.maxPrice[0]) : true;

    const meetsCategory =
      filters.category.length > 0
        ? filters.category.some((category) =>
            prop.category?.toLowerCase().includes(category.toLowerCase())
          )
        : true;

    const meetsPropType =
      filters.propType.length > 0
        ? filters.propType.some((type) =>
            prop.prop_type?.toLowerCase().includes(type.toLowerCase())
          )
        : true;

    const meetsBeds =
      filters.beds.length > 0
        ? filters.beds.some((bed) =>
            bed === "6+" ? prop.beds >= 6 : prop.beds === Number(bed)
          )
        : true;

    const meetsSubLocation =
      filters.subLocation.length > 0
        ? filters.subLocation.some((sub) =>
            prop.sub_location?.toLowerCase().includes(sub.toLowerCase())
          )
        : true;

    const meetsDistrict =
      filters.district.length > 0
        ? filters.district.some((d) =>
            prop.district?.toLowerCase().includes(d.toLowerCase())
          )
        : true;

    const meetsServiced = filters.serviced ? prop.serviced : true;

    const meetsEstate = filters.estate ? prop.inside_an_estate : true;

    const meetsSwimPool = filters.swimPool ? prop.swimming_pool : true;

    const meetsGym = filters.gym ? prop.gym : true;

    const meetsElectricity = filters.electricity ? prop.electricity : true;

    const meetsPaymentPlan =
      filters.paymentPlan.length > 0
        ? filters.paymentPlan.some((d) =>
            prop.payment_options?.toLowerCase().includes(d.toLowerCase())
          )
        : true;

    return (
      meetsMin &&
      meetsMax &&
      meetsCategory &&
      meetsPropType &&
      meetsBeds &&
      meetsSubLocation &&
      meetsDistrict &&
      meetsPaymentPlan &&
      meetsServiced &&
      meetsEstate &&
      meetsSwimPool &&
      meetsGym &&
      meetsElectricity
    );
  });

  useEffect(() => {
    dispatch(setFilteredPropertiesLoading(loading));
    dispatch(setFilteredProperties(filteredProperties));
  }, [dispatch, filteredProperties, loading]);
  const propTypes = createListCollection({ items: propertyTypesOptions });
  const categories = Object.entries(
    groupBy(propTypes.items, (item) => item.category)
  );
  const propCategories = createListCollection({ items: categoryOptions });
  const bedOpts = createListCollection({ items: bedOptions });
  const priceOpts = createListCollection({ items: prices });
  const districtOpts = createListCollection({ items: subLocationOptions });
  const selectedAreas =
    filters.subLocation.length > 0
      ? filters.subLocation.flatMap((sub) => districtOptions[sub] || [])
      : [];
  const areaOpts = createListCollection({ items: selectedAreas });
  const allCategories =
    cat.includes("Rent") &&
    cat.includes("Sale") &&
    cat.includes("Joint Venture");

  const handleCategoryChange = (selectedValues: string[]) => {
    // Type guard to ensure only valid categories
    const validCategories = selectedValues.filter(
      (value): value is PropertyCategory =>
        ["Rent", "Sale", "Joint Venture"].includes(value)
    ) as PropertyCategory[];

    setFilters((prev) => ({
      ...prev,
      category: validCategories,
    }));
  };
  return (
    <Box w="100%">
      {variant === "home" && (
        <Tabs.Root
          value={filters.category[0]}
          onValueChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              category: [e.value as "Rent" | "Sale" | "Joint Venture"],
            }))
          }
          variant="plain"
        >
          <Tabs.List gap={5}>
            {categoryOptions.map((category, index) => (
              <Tabs.Trigger
                _selected={{ bg: "#4169E0", color: "#FFFFFF" }}
                color="#074C98"
                bg="#FFFFFF"
                key={index}
                value={category.value}
                borderTopRadius="10px"
                borderBottomRadius="none"
                fontSize="15px"
                fontWeight={500}
              >
                {category.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs.Root>
      )}
      <Box
        p={{ base: "1rem", md: variant === "home" ? "3rem" : "" }}
        pl={variant === "searchbar" ? "40px" : ""}
        bg="#FFFFFFCC"
        color="#000048"
        backdropFilter="blur(1px)"
        borderBottomRadius="15px"
        display={variant === "searchbar" ? { base: "none", md: "block" } : ""}
      >
        <Grid
          templateColumns={allCategories ? "repeat(5, 1fr)" : "repeat(4, 1fr)"}
          display={{ base: "block", md: "grid" }}
        >
          {allCategories && (
            <GridItem borderRight="2px solid #DCDCEB" p="1rem">
                <Fieldset.Root h="full">
                  <CheckboxGroup
                    value={filters.category}
                    onValueChange={handleCategoryChange}
                    colorPalette="blue"
                    h="full"
                    mb={3}
                  >
                    <Fieldset.Content h="full">
                      <Stack justifyContent="space-between" h="full">
                        {propCategories.items.map((item) => (
                          <Checkbox.Root key={item.value} value={item.value}>
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                            <Checkbox.Label>{item.label}</Checkbox.Label>
                          </Checkbox.Root>
                        ))}
                      </Stack>
                    </Fieldset.Content>
                  </CheckboxGroup>
                </Fieldset.Root>
            </GridItem>
          )}
          <GridItem borderRight="2px solid #DCDCEB" p="1rem">
            <Select.Root
              collection={propTypes}
              multiple
              size="sm"
              mb={3}
              value={filters.propType}
              onValueChange={(e) =>
                setFilters((prev) => ({ ...prev, propType: e.value }))
              }
            >
              <Select.HiddenSelect />
              <Select.Label
                fontWeight={600}
                fontSize={variant === "home" ? "20px" : "17px"}
                mb={4}
              >
                {variant === "home" ? "Property Type" : "Type"}
              </Select.Label>
              <Select.Control bg="#B1CFEF" borderRadius="10px">
                <Select.Trigger>
                  <Select.ValueText color="#000048" placeholder="Type" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.ClearTrigger color="#000048" />
                  <Select.Indicator color="#000048" />
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
                          <Select.Item item={item} key={item.value}>
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
            <Select.Root
              collection={bedOpts}
              multiple
              size="sm"
              value={filters.beds}
              onValueChange={(e) =>
                setFilters((prev) => ({ ...prev, beds: e.value }))
              }
            >
              <Select.HiddenSelect />
              <Select.Control
                bg="#B1CFEF"
                borderRadius="10px"
                w={{ md: "9/10" }}
              >
                <Select.Trigger>
                  <Select.ValueText color="#000048" placeholder="No of Beds" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.ClearTrigger color="#000048" />
                  <Select.Indicator color="#000048" />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {bedOpts.items.map((bedOpt) => (
                      <Select.Item item={bedOpt} key={bedOpt.value}>
                        {bedOpt.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </GridItem>
          <GridItem borderRight="2px solid #DCDCEB" p="1rem">
            <Select.Root
              collection={priceOpts}
              size="sm"
              mb={3}
              value={filters.minPrice}
              onValueChange={(e) =>
                setFilters((prev) => ({ ...prev, minPrice: e.value }))
              }
            >
              <Select.HiddenSelect />
              <Select.Label
                fontWeight={600}
                fontSize={variant === "home" ? "20px" : "17px"}
                mb={4}
              >
                Price Range
              </Select.Label>
              <Select.Control
                bg="#B1CFEF"
                borderRadius="10px"
                w={{ md: "9/10" }}
              >
                <Select.Trigger>
                  <Select.ValueText color="#000048" placeholder="Min. price" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.ClearTrigger color="#000048" />
                  <Select.Indicator color="#000048" />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {priceOpts.items.map((priceOpt) => (
                      <Select.Item item={priceOpt} key={priceOpt.value}>
                        {priceOpt.amount}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
            <Select.Root
              collection={priceOpts}
              size="sm"
              value={filters.maxPrice}
              onValueChange={(e) =>
                setFilters((prev) => ({ ...prev, maxPrice: e.value }))
              }
            >
              <Select.HiddenSelect />
              <Select.Control
                bg="#B1CFEF"
                borderRadius="10px"
                w={{ md: "9/10" }}
              >
                <Select.Trigger>
                  <Select.ValueText color="#000048" placeholder="Max. price" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.ClearTrigger color="#000048" />
                  <Select.Indicator color="#000048" />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {priceOpts.items.map((priceOpt) => (
                      <Select.Item item={priceOpt} key={priceOpt.value}>
                        {priceOpt.amount}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </GridItem>
          <GridItem p="1rem">
            <Select.Root
              collection={districtOpts}
              multiple
              size="sm"
              mb={3}
              flex={1}
              value={filters.subLocation}
              onValueChange={(e) =>
                setFilters((prev) => ({ ...prev, subLocation: e.value }))
              }
            >
              <Select.HiddenSelect />
              <Select.Label mb={4}>
                <HStack gap={5}>
                  <Text
                    fontWeight={600}
                    fontSize={variant === "home" ? "20px" : "17px"}
                  >
                    Location
                  </Text>
                  <Image src={Location} alt="Location Icon" />
                </HStack>
              </Select.Label>
              <Select.Control
                bg="#B1CFEF"
                borderRadius="10px"
                w={{ md: "9/10" }}
              >
                <Select.Trigger>
                  <Select.ValueText color="#000048" placeholder="District" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.ClearTrigger color="#000048" />
                  <Select.Indicator color="#000048" />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {districtOpts.items.map((districtOpt) => (
                      <Select.Item item={districtOpt} key={districtOpt.value}>
                        {districtOpt.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
            <Select.Root
              collection={areaOpts}
              multiple
              size="sm"
              mb={3}
              value={filters.district}
              onValueChange={(e) =>
                setFilters((prev) => ({ ...prev, district: e.value }))
              }
            >
              <Select.HiddenSelect />
              <Select.Control
                bg="#B1CFEF"
                borderRadius="10px"
                w={{ md: "9/10" }}
              >
                <Select.Trigger>
                  <Select.ValueText
                    color="#000048"
                    placeholder="Select Areas"
                  />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.ClearTrigger color="#000048" />
                  <Select.Indicator color="#000048" />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {areaOpts.items.map((areaOpt) => (
                      <Select.Item item={areaOpt} key={areaOpt.value}>
                        {areaOpt.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </GridItem>
          <GridItem p="1rem">
            <HStack
              justifyContent="flex-end"
              alignItems="center"
              h="full"
              display={{ base: "block", md: "flex" }}
            >
              <Link
                href={
                  filters.category.length === 1 &&
                  filters.category[0] === "Rent"
                    ? "/rent"
                    : filters.category.length === 1 &&
                      filters.category[0] === "Sale"
                    ? "/sale"
                    : "/properties"
                }
              >
                <Button
                  bg="#4169E0"
                  borderRadius="10px"
                  color="#EFF3FA"
                  w={{ base: "100%", md: "150px" }}
                  onClick={() =>
                    dispatch(setFilteredProperties(filteredProperties))
                  }
                >
                  <LuSearch /> Search
                </Button>
              </Link>
            </HStack>
          </GridItem>
        </Grid>
        {variant === "home" && (
          <Stack display={{ base: "none", md: "flex" }}>
            <HStack gap={4} p="1rem">
              <HStack onClick={searchOnToggle} cursor="pointer">
                <Text fontSize="16px" fontWeight={600}>
                  More Search Options{" "}
                </Text>
                <Icon
                  as={MdNavigateNext}
                  transform={searchOpen ? "rotate(180deg)" : ""}
                  transition=".3s"
                  border="1px solid #292D32"
                  borderRadius="md"
                  fontSize="16px"
                  fontWeight={600}
                />
              </HStack>
              <Presence
                present={searchOpen}
                animationName={{
                  _open: "slide-from-left, fade-in",
                  _closed: "slide-to-left, fade-out",
                }}
                animationDuration="moderate"
              >
                <HStack>
                  <HStack gap={4}>
                    <Checkbox.Root
                      colorPalette="blue"
                      checked={filters.serviced}
                      onCheckedChange={() =>
                        setFilters((prev) => ({ ...prev, serviced: true }))
                      }
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control
                        borderRadius="5px"
                        border="1px solid #667085"
                      />
                      <Checkbox.Label>Serviced</Checkbox.Label>
                    </Checkbox.Root>
                    <Checkbox.Root
                      colorPalette="blue"
                      checked={filters.estate}
                      onCheckedChange={() =>
                        setFilters((prev) => ({ ...prev, estate: true }))
                      }
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control
                        borderRadius="5px"
                        border="1px solid #667085"
                      />
                      <Checkbox.Label>Inside an Estate</Checkbox.Label>
                    </Checkbox.Root>
                    <Separator
                      orientation="vertical"
                      h="7"
                      borderColor="#ABACD4"
                      size="lg"
                    />
                  </HStack>
                  <HStack gap={4} pl="1rem">
                    <HStack onClick={amenitiesOnToggle} cursor="pointer">
                      <Text fontSize="15px" fontWeight={700}>
                        Amenities{" "}
                      </Text>
                      <Icon
                        as={MdNavigateNext}
                        transform={amenitiesOpen ? "rotate(180deg)" : ""}
                        transition=".3s"
                        borderRadius="md"
                        fontSize="16px"
                        fontWeight={600}
                      />
                    </HStack>
                    <Presence
                      present={amenitiesOpen}
                      animationName={{
                        _open: "slide-from-left, fade-in",
                        _closed: "slide-to-left, fade-out",
                      }}
                      animationDuration="moderate"
                    >
                      <HStack gap={4}>
                        <Checkbox.Root
                          colorPalette="blue"
                          checked={filters.swimPool}
                          onCheckedChange={() =>
                            setFilters((prev) => ({ ...prev, swimPool: true }))
                          }
                        >
                          <Checkbox.HiddenInput />
                          <Checkbox.Control
                            borderRadius="5px"
                            border="1px solid #667085"
                          />
                          <Checkbox.Label>Swimming Pool</Checkbox.Label>
                        </Checkbox.Root>
                        <Checkbox.Root
                          colorPalette="blue"
                          checked={filters.gym}
                          onCheckedChange={() =>
                            setFilters((prev) => ({ ...prev, gym: true }))
                          }
                        >
                          <Checkbox.HiddenInput />
                          <Checkbox.Control
                            borderRadius="5px"
                            border="1px solid #667085"
                          />
                          <Checkbox.Label>Gym</Checkbox.Label>
                        </Checkbox.Root>
                        <Checkbox.Root
                          colorPalette="blue"
                          checked={filters.electricity}
                          onCheckedChange={() =>
                            setFilters((prev) => ({
                              ...prev,
                              electricity: true,
                            }))
                          }
                        >
                          <Checkbox.HiddenInput />
                          <Checkbox.Control
                            borderRadius="5px"
                            border="1px solid #667085"
                          />
                          <Checkbox.Label>24/7 Electricity</Checkbox.Label>
                        </Checkbox.Root>
                      </HStack>
                    </Presence>
                  </HStack>
                </HStack>
              </Presence>
            </HStack>
            <HStack gap={4} pl="1rem">
              <HStack onClick={paymentPlanOnToggle} cursor="pointer">
                <Text fontSize="15px" fontWeight={700}>
                  Payment Plan{" "}
                </Text>
                <Icon
                  as={MdNavigateNext}
                  transform={paymentPlanOpen ? "rotate(180deg)" : ""}
                  transition=".3s"
                  border="1px solid #292D32"
                  borderRadius="md"
                  fontSize="16px"
                  fontWeight={600}
                />
              </HStack>
              <Presence
                present={paymentPlanOpen}
                animationName={{
                  _open: "slide-from-left, fade-in",
                  _closed: "slide-to-left, fade-out",
                }}
                animationDuration="moderate"
              >
                <Checkbox.Group
                  value={filters.paymentPlan}
                  onValueChange={(e) =>
                    setFilters((prev) => ({ ...prev, paymentPlan: e }))
                  }
                >
                  <HStack gap={4}>
                    {paymentPlanOptions.map((paymentPlanOption, index) => (
                      <Checkbox.Root
                        key={index}
                        colorPalette="blue"
                        value={paymentPlanOption.value}
                      >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control
                          borderRadius="5px"
                          border="1px solid #667085"
                        />
                        <Checkbox.Label>
                          {paymentPlanOption.label}
                        </Checkbox.Label>
                      </Checkbox.Root>
                    ))}
                  </HStack>
                </Checkbox.Group>
              </Presence>
            </HStack>
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default SearchProperties;
