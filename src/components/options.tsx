export const prices = [
  { amount: "₦100, 000", value: 100000 },
  { amount: "₦200, 000", value: 200000 },
  { amount: "₦300, 000", value: 300000 },
  { amount: "₦400, 000", value: 400000 },
  { amount: "₦500, 000", value: 500000 },
  { amount: "₦600, 000", value: 600000 },
  { amount: "₦700, 000", value: 700000 },
  { amount: "₦800, 000", value: 800000 },
  { amount: "₦900, 000", value: 900000 },
  { amount: "₦1 million", value: 1000000 },
  { amount: "₦2 million", value: 2000000 },
  { amount: "₦3 million", value: 3000000 },
  { amount: "₦5 million", value: 5000000 },
  { amount: "₦8 million", value: 8000000 },
  { amount: "₦10 million", value: 10000000 },
  { amount: "₦20 million", value: 20000000 },
  { amount: "₦30 million", value: 30000000 },
  { amount: "₦40 million", value: 40000000 },
  { amount: "₦50 million", value: 50000000 },
  { amount: "₦60 million", value: 60000000 },
  { amount: "₦80 million", value: 80000000 },
  { amount: "₦100 million", value: 100000000 },
  { amount: "₦150 million", value: 150000000 },
  { amount: "₦200 million", value: 200000000 },
  { amount: "₦250 million", value: 250000000 },
  { amount: "₦300 million", value: 300000000 },
  { amount: "₦350 million", value: 350000000 },
  { amount: "₦400 million", value: 400000000 },
  { amount: "₦500 million", value: 500000000 },
  { amount: "₦600 million", value: 600000000 },
  { amount: "₦700 million", value: 700000000 },
  { amount: "₦800 million", value: 800000000 },
  { amount: "₦900 million", value: 900000000 },
  { amount: "₦1 Billion", value: 1000000000 },
  { amount: "₦2 Billion", value: 2000000000 },
  { amount: "₦5 Billion", value: 5000000000 },
  { amount: "₦10 Billion", value: 10000000000 },
  { amount: "₦20 Billion", value: 20000000000 },
];

export const categoryOptions = [
    {label: "For Rent", value: "Rent"},
    {label: "For Sale", value: "Sale"},
    {label: "Joint Venture", value: "Joint Venture"},
]

export const propertyTypesOptions = [
  { category: "", label: "Flat/Apartment", value: "Flat/Apartment" },
  { category: "Land", label: "Residential Land", value: "Residential Land" },
  { category: "Land", label: "Commercial Land", value: "Commercial Land" },
  { category: "Land", label: "Mixed-Use Land", value: "Mixed use Land" },
  { category: "Bungalow", label: "Detached Bungalow", value: "Detached Bungalow" },
  { category: "Bungalow", label: "Semi-Detached Bungalow", value: "Semi-Detached Bungalow" },
  { category: "Bungalow", label: "Terrace Bungalow", value: "Terrace Bungalow" },
  { category: "Duplexes", label: "Detached Duplex", value: "Detached Duplex" },
  { category: "Duplexes", label: "Semi-Detached Duplex", value: "Semi-Detached Duplex" },
  { category: "Duplexes", label: "Terrace Duplex", value: "Terrace Duplex" },
  { category: "Commercial", label: "Shop", value: "Shop" },
  { category: "Commercial", label: "Office Space", value: "Office Space" },
  { category: "Commercial", label: "WareHouse", value: "WareHouse" },
  { category: "Commercial", label: "Factory", value: "Factory" },
  { category: "Commercial", label: "Complex", value: "Complex" },
  { category: "Commercial", label: "Filling Station", value: "Filling Station" },
  { category: "Commercial", label: "Tank Farm", value: "Tank Farm" },
  { category: "Commercial", label: "Hotel", value: "Hotel" },
  { category: "Commercial", label: "School", value: "School" },
  { category: "Commercial", label: "Church", value: "Church" },
  { category: "Commercial", label: "Hostel", value: "Hostel" },
  { category: "Commercial", label: "Restaurant", value: "Restaurant" },
];

export const bedOptions = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
  { label: "6+", value: "6+" },
];

export const bathroomOptions = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
  { label: "6+", value: "6+" },
];

export const toiletOptions = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
  { label: "6+", value: "6+" },
];

export const maidsBQ = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4+", value: "4+" },
];

export const paymentPlanOptions = [
    { label: "6 months", value: "6 months" },
    { label: "12 months", value: "12 months" },
    { label: "18 months", value: "18 months" },
    { label: "24 months", value: "24 months" },
    { label: "36 months", value: "36 months" },
    { label: "48 months", value: "48 months" },
]

export const priceOptions: Record<string, { label: string; value: string }[]> = {
  "Sale": [
    { label: "Asking Price", value: "Asking Price" },
    { label: "Slightly Negotiable", value: "Slightly Negotiable" },
    { label: "Net Price", value: "Net Price" },
    { label: "Best Price", value: "Best Price" },
    { label: "Per Square Meter", value: "Per Square Meter" },
  ],
  "Rent": [
    { label: "Per Annum", value: "Per Annum" },
    { label: "Per Month", value: "Per Month" },
    { label: "Per Square Meter", value: "Per Square Meter" },
  ],
};

export const subLocationOptions = [
    {label: 'Lagos Mainland', value: "Lagos Mainland"},
    {label: 'Lagos Island', value: "Lagos Island"},
]

export const districtOptions: Record<string, { label: string; value: string }[]> = {
  "Lagos Mainland": [
    { label: "Apapa", value: "Apapa" },
    { label: "Agege", value: "Agege" },
    { label: "Alimosho/Ipaja", value: "Alimosho/Ipaja" },
    { label: "Abule Egba/Agbado", value: "Abule Egba/Agbado" },
    { label: "Ikeja", value: "Ikeja" },
    { label: "Ogba/Ojodu/Berger", value: "Ogba/Ojodu/Berger" },
    { label: "Magodo/Isheri/Arepo", value: "Magodo/Isheri/Arepo" },
    { label: "Ojota/Ogudu", value: "Ojota/Ogudu" },
    { label: "Maryland-Jibowu", value: "Maryland-Jibowu" },
    { label: "Gbagada/Bariga/Somolu", value: "Gbagada/Bariga/Somolu" },
    { label: "Yaba/Ebute Meta/Oyingbo", value: "Yaba/Ebute Meta/Oyingbo" },
    { label: "Surulere/Iganmu", value: "Surulere/Iganmu" },
    { label: "Oshodi/Isolo", value: "Oshodi/Isolo" },
    { label: "Ojo/Mile 2/Mebamu", value: "Ojo/Mile 2/Mebamu" },
    { label: "Ijaniki/Agbara", value: "Ijaniki/Agbara" },
    { label: "Badagry/Araromi", value: "Badagry/Araromi" },
    { label: "Ketu/Mile 12", value: "Ketu/Mile 12" },
    { label: "Ikorodu", value: "Ikorodu" },
    { label: "Sango Ota", value: "Sango Ota" },
  ],
  "Lagos Island": [
    { label: "Lagos Island", value: "Lagos Island" },
    { label: "Ikoyi", value: "Ikoyi" },
    { label: "VI", value: "VI" },
    { label: "Lekki Phase1/Ikate", value: "Lekki Phase1/Ikate" },
    { label: "Jakande/Agungi/Chevron", value: "Jakande/Agungi/Chevron" },
    { label: "Orchid/Ikota/VGC", value: "Orchid/Ikota/VGC" },
    { label: "Ajah", value: "Ajah" },
    { label: "Sangotedo", value: "Sangotedo" },
    { label: "Abijo/Ibeju Lekki", value: "Abijo/Ibeju Lekki" },
    { label: "Epe", value: "Epe" },
  ],
};

export const timeslotOptions = [
  {value: "8am-12pm", label: "8am - 12pm"},
  {value:"1pm-5pm", label: "1pm - 5pm"}
]