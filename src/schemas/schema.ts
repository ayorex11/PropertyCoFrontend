import { z } from "zod";

export const adminMessageSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  body: z.string().min(1, "Body  is required"),
  receiver: z.string().min(1, "Receiver  is required")
});

export type adminMessagePayload = z.infer<typeof adminMessageSchema>;


export const blogSchema = z.object({
  title: z.string().min(3, "Title is required"),
  body: z.string().min(10, "Body must be at least 10 characters"),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Image is required")
    .optional().nullable(),
});

export type BlogFormPayload= z.infer<typeof blogSchema>;


export const propertyFormSchema = z.object({
  name: z.string().min(1, "Headline is required").max(200),
  picture1: z.union([z.string(), z.instanceof(File, { message: "Picture 1 is required!" }).refine((file) => file.size > 0, { message: "Image is required" })]),
  picture2: z.union([z.string(), z.instanceof(File, { message: "Picture 2 is required!" }).refine((file) => file.size > 0, { message: "Image is required" })]),
  picture3: z.union([z.string(), z.instanceof(File, { message: "Picture 3 is required!" }).refine((file) => file.size > 0, { message: "Image is required" })]),
  picture4: z.union([z.string(), z.instanceof(File, { message: "Picture 4 is required!" }).refine((file) => file.size > 0, { message: "Image is required" })]),
  picture5: z.union([z.string(), z.instanceof(File)]).optional().nullable(),
  picture6: z.union([z.string(), z.instanceof(File)]).optional().nullable(),
  picture7: z.union([z.string(), z.instanceof(File)]).optional().nullable(),
  picture8: z.union([z.string(), z.instanceof(File)]).optional().nullable(),
  picture9: z.union([z.string(), z.instanceof(File)]).optional().nullable(),
  picture10: z.union([z.string(), z.instanceof(File)]).optional().nullable(),

  beds: z.string().min(1, "No of Beds is required!"),
  bathrooms: z.string().min(1, "Bathrooms is required!"),
  toilets: z.string().min(1, "Toilets is required!"),

  description: z.string().max(5000).optional(),
  proposal: z.string().max(5000).optional(),
  premium: z.string().max(5000).optional(),
  sharing_ratio: z.string().max(5000).optional(),
  facilitator_fee: z.string().max(5000).optional(),
  more_details: z.string().max(1000).optional(),

  // location: z.string().min(1).max(5000),
  sub_location: z.array(z.string(), "District is required!"),
  district: z.array(z.string(), "Area is required!"),

  address: z.string().min(1, "Address is required!").max(500),

  category: z.string().min(1, "Category is required!"),
  prop_type: z.array(z.string(), "Property Type is required!"),

  price: z.string().min(1, "Price is required!"),
  price_options: z.string().min(1, "Price Option is required|"),

  furnished: z.boolean(),
  newly_built: z.boolean(),
  car_park: z.boolean(),
  shared: z.boolean(),
  swimming_pool: z.boolean(),
  gym: z.boolean(),
  electricity: z.boolean(),
  under_contract: z.boolean(),
  off_plan: z.boolean(),

  serviced: z.boolean(),
  inside_an_estate: z.boolean(),
  payment_options: z.array(z.string(), "Payment Plan is required!"),
  initial_deposit: z.string().max(200).optional(),

  video_available_on_request: z.boolean(),
  other_amenities: z.string().max(5000).nullable(),
});


export type PropertyFormPayload = z.infer<typeof propertyFormSchema>;


export const reqPropertyFormSchema = z.object({
  beds: z.string().min(1, "No of Beds is required!"),
  description: z.string().max(5000).optional(),
  // location: z.string().min(1).max(5000),
  sub_location: z.array(z.string(), "District is required!"),
  district: z.array(z.string(), "Area is required!"),
  category: z.string().min(1, "Category is required!"),
  prop_type: z.array(z.string(), "Property Type is required!"),
  budget: z.string().min(1, "Price is required!"),
  payment_plan: z.array(z.string(), "Payment Plan is required!"),
});


export type RequestPropFormPayload = z.infer<typeof reqPropertyFormSchema>;


export const agentMessageSchema = z.object({
  property_id: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  body: z.string().min(1, "Body is required"),
});

export type agentMessagePayload= z.infer<typeof agentMessageSchema>;


export const userProfileSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  contact_number: z.string().optional(),
  profile_picture: z.instanceof(File).optional().nullable(),
  address: z.string().optional(),
});

export type userProfilePayload= z.infer<typeof userProfileSchema>;


export const agentProfileSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  contact_number: z.string().optional(),
  contact_number2: z.string().optional(),
  profile_picture: z.instanceof(File).optional().nullable(),
  agency: z.string().optional(),
  bank_name: z.string().optional().nullable(),
  name_on_account: z.string().optional().nullable(),
  account_number: z.string().optional().nullable(),
  address: z.string().optional(),
});

export type agentProfilePayload= z.infer<typeof agentProfileSchema>;

export const inspectionSchema = z.object({
  prop_1: z.string().optional(),
  prop_2: z.string().optional(),
  prop_3: z.string().optional(),
  timeslot: z.string().optional(),
  date: z.string().min(1, "Date is required"),
});

export type inspectionPayload= z.infer<typeof inspectionSchema>;

export const partnerSchema = z.object({
  first_name: z.string().nonempty("First name is required"),
  last_name: z.string().nonempty("Last name is required"),
  phone_number: z.string().nonempty("Phone number is required"),
  email: z.string().email("Invalid email"),
});

export type PartnerFormPayload = z.infer<typeof partnerSchema>;

export const ratingSchema = z.object({
  rating: z.string().optional(),
  member_id: z.string().nonempty("Member Id is required"),
  reason: z.string().nonempty("Reason is required"),
})

export type RatingFormPayload = z.infer<typeof ratingSchema>;

export const documentSchema = z.object({
  identity_card: z.instanceof(File).refine((file) => file.size > 0, "ID is required").optional().nullable(),
  CAC: z.instanceof(File).refine((file) => file.size > 0, "CAC is required").optional().nullable(),
})

export type DocumentFormPayload = z.infer<typeof documentSchema>;