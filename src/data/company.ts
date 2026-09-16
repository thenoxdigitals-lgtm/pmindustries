export const company = {
  name: "PM Industries",
  established: "2011",
  url: "https://www.pmindustriessolapur.com",
  phone: "+91-9890114253",
  phoneHref: "tel:+919890114253",
  whatsapp: "https://wa.me/919890114253",
  emails: ["pmhsindustries@gmail.com", "info@pmindustriessolapur.com"],
  address: {
    line1: "175/2, Shidheshwar Nagar",
    line2: "Near Regal Hotel, Nai Zindagi Chowk",
    city: "Solapur",
    postalCode: "413003",
    state: "Maharashtra",
    country: "India",
  },
};
export const address = `${company.address.line1}, ${company.address.line2}, ${company.address.city} – ${company.address.postalCode}, ${company.address.state}, ${company.address.country}`;
