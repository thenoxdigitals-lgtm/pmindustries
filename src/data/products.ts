export type Product = {
  name: string;
  slug: string;
  category: "Cable systems" | "Molded components" | "Insulation";
  shortName: string;
  summary: string;
  description: string;
  features: string[];
  applications: string[];
  variants: string[];
  specifications: Record<string, string>;
  image: string;
  legacy: string;
  notes?: string[];
};
export const products: Product[] = [
  {
    name: "Heat Shrinkable Termination Kit",
    shortName: "Cable terminations",
    slug: "heat-shrinkable-termination-kit",
    category: "Cable systems",
    summary:
      "Indoor and outdoor termination systems for low and medium voltage power cables.",
    description:
      "Heat shrinkable termination kits provide insulation, stress control and environmental sealing at the cable end. The PM-Seal range covers single-core and three-core constructions, with options for extruded insulation and paper-insulated lead-covered cables.",
    features: [
      "Stress relief and electrical insulation",
      "Accommodation of cable tolerances and conductor shapes",
      "Weather and UV resistance",
      "Indoor and outdoor configurations",
    ],
    applications: [
      "Cable connections to electrical equipment",
      "Indoor switchgear terminations",
      "Outdoor power distribution connections",
    ],
    variants: [
      "Three-core XLPE / EPR / PVC",
      "Single-core XLPE / EPR / PVC",
      "Three-core PILC",
      "Low voltage PVC cable terminations",
    ],
    specifications: {
      "Published medium voltage range": "11 kV, 22 kV and 33 kV",
      "Published low voltage range": "1.1 kV and 3.3 kV",
      "11 kV tail length": "600 mm outdoor / 450 mm indoor",
      "22 kV tail length": "800 mm outdoor / 550 mm indoor",
      "33 kV tail length": "900 mm outdoor / 700 mm indoor",
    },
    notes: [
      "Special tail lengths and solderless or special-purpose earthing kits can be requested.",
      "Polymeric insulators and T brackets for single-pole installation can be requested.",
      "Published indoor configurations: no rain sheds at 11 kV; one per core at 22 kV; two per core at 33 kV. Confirm the selected kit before ordering.",
    ],
    image: "/images/products/termination.webp",
    legacy: "termination-kit.html",
  },
  {
    name: "Heat Shrinkable Straight Joint",
    shortName: "Straight-through joints",
    slug: "heat-shrinkable-straight-joint",
    category: "Cable systems",
    summary:
      "Jointing systems for continuity of insulation and protection along a power cable.",
    description:
      "PM-Seal straight-through joints connect compatible power cable sections. The heat shrinkable system addresses insulation, electrical stress and environmental sealing for armored and unarmored cable constructions.",
    features: [
      "Insulation and electrical stress control",
      "Environmental sealing",
      "Options for different cable constructions",
      "Accommodation of conductor and cable tolerances",
    ],
    applications: [
      "Power cable jointing",
      "Cable network extensions",
      "Industrial distribution cable connections",
    ],
    variants: [
      "Three-core XLPE / EPR / PVC",
      "Single-core XLPE / EPR / PVC",
      "Three-core PILC",
      "Low voltage PVC straight-through joints",
    ],
    specifications: {
      "Published medium voltage range": "11 kV, 22 kV and 33 kV",
      "Published low voltage range": "1.1 kV and 3.3 kV",
    },
    notes: [
      "The original company overview also lists T-off and transition joints. Contact the team for configuration and availability; no separate technical schedule is published.",
    ],
    image: "/images/products/straight-joint.webp",
    legacy: "straight-join.html",
  },
  {
    name: "Polymer Insulator",
    shortName: "Polymer insulators",
    slug: "polymer-insulator",
    category: "Insulation",
    summary:
      "Composite silicone insulators with a fiberglass core and metal end fittings.",
    description:
      "Composite polymeric insulators combine a fiberglass core with a silicone housing and metal end fittings. The published range includes pin and tension/suspension designs for electrical distribution applications.",
    features: [
      "One-piece injection-molded silicone housing and sheds",
      "Fiberglass reinforced inner core",
      "Hydrophobic silicone housing",
      "Hot-dip galvanized forged-steel end fittings",
    ],
    applications: [
      "Electrical distribution networks",
      "Pin and suspension arrangements",
      "Power infrastructure insulation",
    ],
    variants: [
      "B&S tension / suspension",
      "T&C tension / suspension",
      "Pin type",
    ],
    specifications: {
      "Published nominal voltages": "11 kV, 22 kV and 33 kV",
      Housing: "Silicone rubber",
      Core: "Fiberglass reinforced polymer",
    },
    image: "/images/products/polymer-insulator.webp",
    legacy: "polymer-insulator.html",
  },
  {
    name: "Anti-tracking Cable Breakout",
    shortName: "Anti-tracking breakouts",
    slug: "anti-tracking-cable-breakout",
    category: "Molded components",
    summary: "Heat shrinkable molded breakouts for power cable terminations.",
    description:
      "Anti-tracking cable breakouts provide insulation at the cable branching point. The molded shape is designed for use in power cable termination assemblies.",
    features: ["Anti-tracking material", "UV resistance", "Weather protection"],
    applications: ["Power cable terminations", "Cable core branching"],
    variants: ["Sizes selected to suit the cable construction"],
    specifications: {},
    image: "/images/products/anti-tracking-breakout.webp",
    legacy: "anti-tracking-cable.html",
  },
  {
    name: "Two, Three and Four Way LV Breakout",
    shortName: "LV cable breakouts",
    slug: "lv-cable-breakout",
    category: "Molded components",
    summary:
      "Two, three and four way molded shapes for low voltage cable branching.",
    description:
      "Heat shrinkable LV breakouts insulate and protect the branching point of multi-core power cables. Select the number of outlets and dimensions to match the cable arrangement.",
    features: [
      "Two, three and four way configurations",
      "UV resistance",
      "Weather protection",
    ],
    applications: [
      "Low voltage cable terminations",
      "Multi-core cable branching",
    ],
    variants: ["Two way", "Three way", "Four way"],
    specifications: {},
    image: "/images/products/lv-breakout.webp",
    legacy: "two-three-four-way.html",
  },
  {
    name: "Busbar Insulation Tubing",
    shortName: "Busbar insulation tubing",
    slug: "busbar-insulation-tubing",
    category: "Insulation",
    summary:
      "Cross-linked polyolefin tubing for busbar insulation and protection.",
    description:
      "Heat shrinkable busbar tubing provides insulation and mechanical protection around busbars. The cross-linked polyolefin construction helps protect against moisture, UV radiation and environmental exposure.",
    features: [
      "Cross-linked polyolefin material",
      "Mechanical protection",
      "Moisture and UV protection",
    ],
    applications: ["Busbar insulation", "Switchgear panel assemblies"],
    variants: ["Red", "Brown"],
    specifications: {
      Material: "Cross-linked polyolefin",
      "Published colours": "Red and brown",
    },
    image: "/images/products/busbar-tubing.webp",
    legacy: "busbar-insulation-tubing.html",
  },
  {
    name: "Creepage Extension Shed / Rain-Shed",
    shortName: "Creepage extension sheds",
    slug: "creepage-extension-shed",
    category: "Molded components",
    summary:
      "Molded rain sheds that extend the surface creepage path of cable terminations.",
    description:
      "Heat shrinkable creepage extension sheds increase the surface creepage distance of protected cable cores without extending the termination tail length. Different diameters and thicknesses support different cable arrangements.",
    features: [
      "Extends surface creepage distance",
      "Fits around protected termination cores",
      "Diameter and thickness options",
    ],
    applications: [
      "Electrical distribution terminations",
      "Industrial cable networks",
    ],
    variants: ["Diameter and thickness selected to match the termination"],
    specifications: {},
    image: "/images/products/rain-shed.webp",
    legacy: "creepage-extension-shed.html",
  },
  {
    name: "Heat Shrinkable Right Angle Boot",
    shortName: "Right angle boots",
    slug: "right-angle-boot",
    category: "Molded components",
    summary:
      "Angled insulating boots for cable termination boxes with restricted clearances.",
    description:
      "Heat shrinkable right angle boots provide insulation around angled cable connections in termination boxes. Selection depends on the bushing, cable arrangement and available phase-to-phase and phase-to-earth clearances.",
    features: [
      "Right angle molded form",
      "Insulation around the connection",
      "Sealing properties",
    ],
    applications: ["Cable termination boxes", "Angled bushing connections"],
    variants: ["Right angle configuration"],
    specifications: {},
    image: "/images/products/right-angle-boot.webp",
    legacy: "right-angle-boot.html",
  },
  {
    name: "Heat Shrinkable Straight Boot",
    shortName: "Straight boots",
    slug: "straight-boot",
    category: "Molded components",
    summary: "Straight insulating boots for bushings in cable terminations.",
    description:
      "Heat shrinkable straight boots insulate bushing connections in cable termination assemblies. Their straight, tapered form accommodates the transition around the connection.",
    features: ["Straight molded form", "Bushing insulation"],
    applications: [
      "Cable termination bushings",
      "Straight connection arrangements",
    ],
    variants: ["Straight configuration"],
    specifications: {},
    image: "/images/products/straight-boot.webp",
    legacy: "straight-boot.html",
  },
  {
    name: "Heat Shrinkable End Cap",
    shortName: "Cable end caps",
    slug: "heat-shrinkable-end-cap",
    category: "Molded components",
    summary:
      "Heat shrinkable caps for sealing and protecting unused cable ends.",
    description:
      "Heat shrinkable end caps enclose unused cable ends to help protect against moisture and environmental exposure. This product family is listed in the earlier PM Industries catalog; confirm the current range and supplied construction with the team.",
    features: [
      "Closed-end cable protection",
      "Environmental sealing",
      "Selection to match the cable diameter",
    ],
    applications: [
      "Protection of unused cable ends",
      "Cable storage and handling",
    ],
    variants: ["Size selected to suit cable diameter"],
    specifications: {},
    notes: [
      "Confirm current availability, shrink ratio and temperature ratings before ordering.",
    ],
    image: "/images/products/end-cap.webp",
    legacy: "end-cap.html",
  },
  {
    name: "Heat Shrinkable Busbar Insulation Tape",
    shortName: "Busbar insulation tape",
    slug: "busbar-insulation-tape",
    category: "Insulation",
    summary:
      "Wraparound insulation tape for busbar connections that are difficult to sleeve.",
    description:
      "Heat shrinkable adhesive-coated busbar tape provides a wraparound approach to insulating complex busbar connections where tubing cannot be readily applied. The earlier company catalog describes a cross-linked polyolefin structure with a hot-melt adhesive layer; confirm the current product and application limits with the team.",
    features: [
      "Wraparound application",
      "Adhesive-coated insulation",
      "Conforms around connection contours",
    ],
    applications: [
      "Complex busbar connections",
      "Connections where sleeve installation is impractical",
    ],
    variants: ["Width and length selected for the connection"],
    specifications: {},
    notes: [
      "Confirm current availability, voltage suitability and installation requirements with PM Industries.",
    ],
    image: "/images/products/busbar-tape.webp",
    legacy: "busbar-insulation-tape.html",
  },
];
export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
