export type EditorialPage = {
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  imageAlt: string;
  sections: { title: string; body: string[]; items?: string[] }[];
  links?: { title: string; description: string; href: string }[];
};
export const editorial: Record<string, EditorialPage> = {
  company: {
    title: "Material expertise.\nManufacturing purpose.",
    eyebrow: "ABOUT PM INDUSTRIES",
    description:
      "Heat shrinkable cable accessories, developed and manufactured in Solapur since 2011.",
    image: "/images/products/anti-tracking-breakout.webp",
    imageAlt: "Molded anti-tracking cable breakouts",
    sections: [
      {
        title: "Focused on the connection.",
        body: [
          "PM Industries manufactures heat shrinkable power cable accessories, including cable terminations, straight-through joints, breakouts, rain sheds and tubing. The company’s work combines heat shrink compound development with the manufacture of molded components.",
          "The PM-Seal product range serves cable insulation and connection requirements. Product development responds to customer specifications, cable construction and the conditions in which the accessory will be used.",
        ],
      },
      {
        title: "From material to application.",
        body: [
          "Manufacturing is supported by product design, development and quality assurance. The team also provides technical discussions and practical cable jointing training to help customers become familiar with PM-Seal products.",
        ],
      },
    ],
    links: [
      {
        title: "Engineering & manufacturing",
        description: "Compound development and molded product manufacture.",
        href: "/company/manufacturing",
      },
      {
        title: "Our team",
        description:
          "Experience across materials, product design and installation.",
        href: "/company/team",
      },
      {
        title: "Quality",
        description:
          "Product requirements, quality assurance and documentation.",
        href: "/company/quality",
      },
      {
        title: "Jointer training",
        description: "Practical knowledge of PM-Seal products.",
        href: "/company/jointer-training",
      },
    ],
  },
  "company/manufacturing": {
    title: "The material matters.\nSo does the process.",
    eyebrow: "ENGINEERING & MANUFACTURING",
    description:
      "Compound development and molded cable accessories, built around the application.",
    image: "/images/products/lv-breakout.webp",
    imageAlt: "Black molded cable breakouts in several sizes",
    sections: [
      {
        title: "Heat shrink compound development",
        body: [
          "PM Industries has developed its own heat shrink compound to address technical and customer requirements. Product research and development informs improvements to the molded accessory range.",
        ],
      },
      {
        title: "Molded shapes and cable systems",
        body: [
          "Manufacturing includes breakouts, skirts or rain sheds, and tubes used in heat shrinkable power cable accessories. Termination and joint selection considers cable construction, dimensional tolerances, insulation and electrical stress requirements.",
        ],
        items: [
          "Molded breakout and insulating shapes",
          "Cable termination and joint accessories",
          "Application-led product development",
        ],
      },
      {
        title: "Composite polymeric insulators",
        body: [
          "The published polymer insulator range uses direct injection molding at high pressure and temperature. A fiberglass core supports the silicone housing, with metal end fittings at the connection points.",
        ],
      },
    ],
    links: [
      {
        title: "Explore molded components",
        description: "Find breakouts, boots, tubing and rain sheds.",
        href: "/products",
      },
      {
        title: "Discuss a requirement",
        description: "Share your cable construction and application.",
        href: "/request-quote",
      },
    ],
  },
  "company/quality": {
    title: "Quality begins\nwith the requirement.",
    eyebrow: "QUALITY & TECHNICAL CONFIDENCE",
    description:
      "A focus on material selection, product development and consistent manufacturing.",
    image: "/images/products/polymer-insulator.webp",
    imageAlt: "Silicone polymer insulator with metal end fittings",
    sections: [
      {
        title: "Quality through development and manufacture",
        body: [
          "The company describes a quality assurance system that covers design, development and manufacturing. Its stated priorities include repeatable product performance, timely delivery and responsive technical enquiry handling.",
        ],
      },
      {
        title: "Technical documentation for your project",
        body: [
          "The published PM-Seal literature refers to IS 13573 (2011), IEC 60502-4, IEEE 48 / 404 and CENELEC HD 629.1 / VDE 0278 for terminations and joints. The polymer insulator page refers to IEC 61109. These are references in the existing company literature, not downloadable certificates on this website.",
          "Ask the team for the current, product-specific test report or certificate and the applicable edition of the standard for your project. Published catalog performance tables are available on the relevant product pages.",
        ],
      },
      {
        title: "Confirm the selected configuration",
        body: [
          "Quality requirements are application-specific. Include the voltage class, cable type, dimensions, installation conditions and documentation requirements when requesting a quotation.",
        ],
      },
    ],
    links: [
      {
        title: "Technical resources",
        description: "Find published schedules and selection information.",
        href: "/resources",
      },
      {
        title: "Request documentation",
        description: "Ask about test reports for your selected product.",
        href: "/request-quote",
      },
    ],
  },
  "company/team": {
    title: "Knowledge behind\nevery component.",
    eyebrow: "OUR TEAM",
    description:
      "Experience in heat shrink materials, molded products and cable accessory applications.",
    image: "/images/products/straight-joint.webp",
    imageAlt: "Studio presentation of cable joint assemblies",
    sections: [
      {
        title: "Materials, design and application",
        body: [
          "The PM Industries team works across heat shrink compounds, molded product manufacturing, product design and the installation of cable joints and terminations. These areas of experience inform both product development and customer discussions.",
        ],
      },
      {
        title: "Talk to the technical team",
        body: [
          "For product selection or installation-related enquiries, share the cable details and project requirements. The team can discuss suitable product configurations and the information needed to prepare a quotation.",
        ],
      },
    ],
    links: [
      {
        title: "Contact PM Industries",
        description: "Connect with the team in Solapur.",
        href: "/contact",
      },
      {
        title: "Jointer training",
        description: "Technical seminars and practical sessions.",
        href: "/company/jointer-training",
      },
    ],
  },
  "company/jointer-training": {
    title: "Product knowledge.\nPractical understanding.",
    eyebrow: "JOINTER TRAINING",
    description:
      "Technical seminars and cable jointing practice for engineers and jointers.",
    image: "/images/products/termination.webp",
    imageAlt: "Three-core termination with red rain sheds",
    sections: [
      {
        title: "Learning through theory and practice",
        body: [
          "PM Industries describes technical seminars and practical cable jointing sessions for customer engineers and new jointers. Sessions cover familiarity with PM-Seal products and can take place in-house or at site.",
        ],
      },
      {
        title: "PM-Seal installation authorization",
        body: [
          "The company’s published training information states that jointers who pass its practical tests can receive company authorization for installing PM-Seal kits. This is a manufacturer authorization, not a substitute for any statutory qualification or site requirement.",
          "Installation assistance by company jointers may be available at an additional charge, separate from kit prices. Contact the team to confirm current arrangements.",
        ],
      },
      {
        title: "Arrange a training discussion",
        body: [
          "Tell the team which kit or cable system you use, the proposed location and the number of participants. Dates, scope and charges are confirmed directly.",
        ],
        items: [
          "Product familiarization",
          "Technical theory and practical jointing",
          "In-house or site-based sessions, subject to arrangement",
        ],
      },
    ],
    links: [
      {
        title: "Enquire about training",
        description: "Discuss your team’s requirements.",
        href: "/contact",
      },
    ],
  },
  "technology/heat-shrink": {
    title: "A material memory.\nA precise fit.",
    eyebrow: "HEAT SHRINK TECHNOLOGY",
    description:
      "Polymeric materials that recover towards their original shape when heated.",
    image: "/images/products/rain-shed.webp",
    imageAlt: "Molded heat shrinkable creepage extension sheds",
    sections: [
      {
        title: "How heat shrink works",
        body: [
          "Heat shrink technology uses the shape-memory behavior of specially processed polymeric materials. An expanded component is positioned over the connection and recovers when heated under the conditions specified for that product.",
          "The company applies this technology to extruded and molded cable accessories, including tubing, breakouts and rain sheds.",
        ],
      },
      {
        title: "Different components. Different functions.",
        body: [
          "A cable connection brings together several requirements. The selected accessory system must suit the cable and the installation.",
        ],
        items: [
          "Insulation at the cable connection",
          "Electrical stress control in the applicable kit",
          "Environmental sealing and mechanical protection",
          "Creepage extension where rain sheds are required",
        ],
      },
      {
        title: "Selection and installation",
        body: [
          "Recovery temperature, heating method and installation sequence depend on the exact component. Use the instructions supplied with the selected kit and a qualified jointer. Contact PM Industries for application-specific guidance.",
        ],
      },
    ],
    links: [
      {
        title: "Explore the product range",
        description: "Find components for your cable system.",
        href: "/products",
      },
      {
        title: "Jointer training",
        description: "Discuss practical product familiarization.",
        href: "/company/jointer-training",
      },
    ],
  },
  resources: {
    title: "Clear information.\nBetter specifications.",
    eyebrow: "TECHNICAL RESOURCES",
    description:
      "Ordering guidance, published product data and a direct route to technical support.",
    image: "/images/products/busbar-tubing.webp",
    imageAlt: "Red insulated busbar assemblies",
    sections: [
      {
        title: "Start with the cable details",
        body: [
          "The voltage class alone does not identify a kit. Cable insulation, core count, conductor cross-section, screen and armor arrangement, and installation conditions all help define the requirement.",
        ],
      },
      {
        title: "Published product schedules",
        body: [
          "Termination kits, straight joints and polymer insulators have published technical tables on their product pages. Molded components include the original dimensional reference sheets. Treat these as catalog references and confirm the selected size and code when ordering.",
        ],
      },
      {
        title: "Project-specific documentation",
        body: [
          "For test reports, installation instructions or a current product sheet, contact the team with your selected product and required documentation.",
        ],
      },
    ],
    links: [
      {
        title: "Ordering information",
        description: "The details to include in an enquiry.",
        href: "/resources/ordering-information",
      },
      {
        title: "Product directory",
        description: "Browse technical information by product.",
        href: "/products",
      },
      {
        title: "Downloads & document requests",
        description: "Request a current product document.",
        href: "/resources/downloads",
      },
    ],
  },
  "resources/ordering-information": {
    title: "Specify with clarity.\nEnquire with confidence.",
    eyebrow: "ORDERING INFORMATION",
    description:
      "A few precise cable details help the team identify the right product configuration.",
    image: "/images/products/straight-joint.webp",
    imageAlt: "Heat shrinkable straight-through cable joints",
    sections: [
      {
        title: "01 / Identify the cable",
        body: [
          "Include the operating voltage class and the cable manufacturer’s details where available.",
        ],
        items: [
          "Insulation type: XLPE, EPR, PVC or PILC",
          "Single-core or multi-core construction",
          "Conductor cross-section in mm²",
          "Armored or unarmored; screen and sheath arrangement",
        ],
      },
      {
        title: "02 / Describe the installation",
        body: [
          "State whether you need a termination, joint or separate molded component.",
        ],
        items: [
          "Indoor or outdoor termination",
          "Connection geometry and available clearances",
          "Required tail length and any earthing accessories",
          "Site conditions, quantity and delivery location",
        ],
      },
      {
        title: "03 / Confirm the product code",
        body: [
          "Use the published product schedules as a reference. Send the proposed kit code with your cable details so PM Industries can confirm suitability and availability.",
          "Some legacy schedules contain inconsistent codes. The team’s confirmed quotation and product documentation should define the supply. Do not infer a code from a nearby table row.",
        ],
      },
    ],
    links: [
      {
        title: "Prepare a quote request",
        description: "Send your product and cable details.",
        href: "/request-quote",
      },
      {
        title: "Browse ordering tables",
        description: "Open the relevant product’s technical section.",
        href: "/products",
      },
    ],
  },
  "resources/downloads": {
    title: "The right document.\nFor your requirement.",
    eyebrow: "DOWNLOADS & DOCUMENTATION",
    description:
      "Request current product sheets, installation information and project-specific documentation.",
    image: "/images/products/right-angle-boot.webp",
    imageAlt: "Heat shrinkable right angle insulating boot",
    sections: [
      {
        title: "Documents available by enquiry",
        body: [
          "There are no verified downloadable PDF documents available in this catalog. For a current product sheet, installation instructions or applicable test documentation, contact PM Industries with the product name and your requirements.",
          "Published technical tables and dimensional references remain available on individual product pages.",
        ],
      },
    ],
    links: [
      {
        title: "Request a document",
        description: "Tell us which product and document you need.",
        href: "/contact",
      },
      {
        title: "View product information",
        description: "Access the published technical references.",
        href: "/products",
      },
    ],
  },
  privacy: {
    title: "Your enquiry.\nHandled with care.",
    eyebrow: "PRIVACY",
    description: "How information submitted through this website is used.",
    image: "/images/products/straight-boot.webp",
    imageAlt: "Heat shrinkable straight insulating boot",
    sections: [
      {
        title: "Information you provide",
        body: [
          "Contact and quote forms collect your name, contact details, company, product interest and requirement. PM Industries uses this information to respond to your enquiry and discuss your requested products or services.",
        ],
      },
      {
        title: "How enquiries are handled",
        body: [
          "Submitted enquiries are transmitted through the website’s server and stored in a Google Spreadsheet accessible to authorized company personnel. Google processes that storage as the service provider. Technical request information may be processed by the hosting provider to operate and protect the website.",
          "This website does not include advertising trackers or marketing signup forms. Information you submit is intended for your enquiry, not public display.",
        ],
      },
      {
        title: "Questions or corrections",
        body: [
          "To ask about your submitted information, request a correction or request deletion, contact PM Industries using the contact details on this website. Please avoid including sensitive personal information in a product enquiry.",
        ],
      },
    ],
    links: [
      {
        title: "Contact PM Industries",
        description: "Questions about your enquiry or information.",
        href: "/contact",
      },
    ],
  },
};
