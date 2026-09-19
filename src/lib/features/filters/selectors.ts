import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";

export const selectFilteredProperties = createSelector(
  (state: RootState) => state.properties.properties.data,
  (state: RootState) => state.filters,
  (properties, filters) => {
    return properties.filter((prop) => {
      const price = prop.price;

      const meetsMin =
        filters.minPrice.length > 0 ? price >= Number(filters.minPrice[0]) : true;
      const meetsMax =
        filters.maxPrice.length > 0 ? price <= Number(filters.maxPrice[0]) : true;

      const meetsCategory = filters.category.length > 0
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
  }
);
