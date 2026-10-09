export const IMAGIN_CUSTOMER_KEY = process.env.NEXT_PUBLIC_IMAGIN_API_KEY || "img";

export interface CarVisualAngle {
  angle: string;
  label: string;
  url: string;
}

export interface CarVisual {
  main: string;
  angle1: string;
  angle2: string;
  angle3: string;
  interior: string;
  angles: CarVisualAngle[];
}

export interface GenerateImageParams {
  brand: string;
  model?: string;
  year?: number;
  angle?: string | number;
  fuelType?: string;
  paintDescription?: string;
}

// Exotic hypercars not present in Imagin Studio's CAD database
export const EXOTIC_STUDIO_CARS: Record<string, CarVisual> = {
  Koenigsegg: {
    main: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80",
    angle1: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80",
    angle2: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    angle3: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
    interior: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80",
    angles: [
      { angle: "01", label: "Açı 01 (Ana Açı)", url: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80" },
      { angle: "23", label: "3/4 Ön Açı", url: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80" },
      { angle: "29", label: "Yüksek Açı", url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80" },
      { angle: "13", label: "3/4 Arka Açı", url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80" },
      { angle: "33", label: "Ön Görünüm", url: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80" },
    ],
  },
  Ferrari: {
    main: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80",
    angle1: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=800&q=80",
    angle2: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
    angle3: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    interior: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80",
    angles: [
      { angle: "01", label: "Açı 01 (Ana Açı)", url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80" },
      { angle: "23", label: "3/4 Ön Açı", url: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=800&q=80" },
      { angle: "29", label: "Yüksek Açı", url: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80" },
      { angle: "13", label: "3/4 Arka Açı", url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80" },
      { angle: "33", label: "Ön Görünüm", url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80" },
    ],
  },
  Lamborghini: {
    main: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80",
    angle1: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    angle2: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80",
    angle3: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
    interior: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80",
    angles: [
      { angle: "01", label: "Açı 01 (Ana Açı)", url: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80" },
      { angle: "23", label: "3/4 Ön Açı", url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80" },
      { angle: "29", label: "Yüksek Açı", url: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80" },
      { angle: "13", label: "3/4 Arka Açı", url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80" },
      { angle: "33", label: "Ön Görünüm", url: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80" },
    ],
  },
  McLaren: {
    main: "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1200&q=80",
    angle1: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
    angle2: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    angle3: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80",
    interior: "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=800&q=80",
    angles: [
      { angle: "01", label: "Açı 01 (Ana Açı)", url: "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1200&q=80" },
      { angle: "23", label: "3/4 Ön Açı", url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80" },
      { angle: "29", label: "Yüksek Açı", url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80" },
      { angle: "13", label: "3/4 Arka Açı", url: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80" },
      { angle: "33", label: "Ön Görünüm", url: "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=800&q=80" },
    ],
  },
  "Aston Martin": {
    main: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80",
    angle1: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    angle2: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
    angle3: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
    interior: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80",
    angles: [
      { angle: "01", label: "Açı 01 (Ana Açı)", url: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80" },
      { angle: "23", label: "3/4 Ön Açı", url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80" },
      { angle: "29", label: "Yüksek Açı", url: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80" },
      { angle: "13", label: "3/4 Arka Açı", url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80" },
      { angle: "33", label: "Ön Görünüm", url: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80" },
    ],
  },
  Bugatti: {
    main: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80",
    angle1: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80",
    angle2: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    angle3: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
    interior: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80",
    angles: [
      { angle: "01", label: "Açı 01 (Ana Açı)", url: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80" },
      { angle: "23", label: "3/4 Ön Açı", url: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80" },
      { angle: "29", label: "Yüksek Açı", url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80" },
      { angle: "13", label: "3/4 Arka Açı", url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80" },
      { angle: "33", label: "Ön Görünüm", url: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80" },
    ],
  },
  Bentley: {
    main: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80",
    angle1: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    angle2: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
    angle3: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
    interior: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
    angles: [
      { angle: "01", label: "Açı 01 (Ana Açı)", url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80" },
      { angle: "23", label: "3/4 Ön Açı", url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80" },
      { angle: "29", label: "Yüksek Açı", url: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80" },
      { angle: "13", label: "3/4 Arka Açı", url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80" },
      { angle: "33", label: "Ön Görünüm", url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80" },
    ],
  },
};

/**
 * Normalizes vehicle make and model family for Imagin Studio catalog
 */
export function normalizeCarParams(brand: string, model: string = ""): { make: string; modelFamily: string } {
  const b = brand.toLowerCase().trim();
  const m = model.toLowerCase().trim();

  let make = b;
  if (b === "mercedes-benz" || b === "mercedes") make = "mercedes";
  if (b === "range rover" || b === "land rover" || b === "land-rover") make = "land-rover";
  if (b === "volkswagen" || b === "vw") make = "volkswagen";

  let modelFamily = "";
  if (m.includes("gt-r")) {
    modelFamily = "gt-r";
  } else if (m.includes("911")) {
    modelFamily = "911";
  } else if (m.includes("taycan")) {
    modelFamily = "taycan";
  } else if (m.includes("panamera")) {
    modelFamily = "panamera";
  } else if (m.includes("cayenne")) {
    modelFamily = "cayenne";
  } else if (m.includes("macan")) {
    modelFamily = "macan";
  } else if (m.includes("e-tron")) {
    modelFamily = "e-tron-gt";
  } else if (m.includes("rs6") || m.includes("rs 6")) {
    modelFamily = "rs6";
  } else if (m.includes("rs7") || m.includes("rs 7")) {
    modelFamily = "rs7";
  } else if (m.includes("rs q8") || m.includes("rsq8") || m.includes("q8")) {
    modelFamily = "q8";
  } else if (m.includes("a6")) {
    modelFamily = "a6";
  } else if (m.includes("a3")) {
    modelFamily = "a3";
  } else if (m.includes("g 63") || m.includes("g-class") || m.startsWith("g ")) {
    modelFamily = "g-class";
  } else if (m.includes("v-class") || m.includes("vito")) {
    modelFamily = "v-class";
  } else if (m.includes("s 580") || m.includes("s 680") || m.includes("s-class") || m.includes("maybach s")) {
    modelFamily = "s-class";
  } else if (m.includes("e 300") || m.includes("e-class") || m.includes("e 200")) {
    modelFamily = "e-class";
  } else if (m.includes("c 200") || m.includes("c-class")) {
    modelFamily = "c-class";
  } else if (m.includes("cla")) {
    modelFamily = "cla";
  } else if (m.includes("amg-gt") || m.includes("amg gt")) {
    modelFamily = "amg-gt";
  } else if (m.includes("m8")) {
    modelFamily = "m8";
  } else if (m.includes("m4")) {
    modelFamily = "m4";
  } else if (m.includes("m3")) {
    modelFamily = "m3";
  } else if (m.includes("i7")) {
    modelFamily = "i7";
  } else if (m.includes("i4")) {
    modelFamily = "i4";
  } else if (m.includes("x7")) {
    modelFamily = "x7";
  } else if (m.includes("x5")) {
    modelFamily = "x5";
  } else if (m.includes("520") || m.includes("5-series")) {
    modelFamily = "5";
  } else if (m.includes("320") || m.includes("3-series")) {
    modelFamily = "3";
  } else if (m.includes("model s")) {
    modelFamily = "model-s";
  } else if (m.includes("model 3")) {
    modelFamily = "model-3";
  } else if (m.includes("model x")) {
    modelFamily = "model-x";
  } else if (m.includes("model y")) {
    modelFamily = "model-y";
  } else if (m.includes("defender")) {
    modelFamily = "defender";
  } else if (m.includes("range rover sport") || m.includes("sport dynamic")) {
    modelFamily = "range-rover-sport";
  } else if (m.includes("range rover") || m.includes("autobiography")) {
    modelFamily = "range-rover";
  } else if (m.includes("spectre")) {
    modelFamily = "spectre";
  } else if (m.includes("ghost")) {
    modelFamily = "ghost";
  } else if (m.includes("xc90")) {
    modelFamily = "xc90";
  } else if (m.includes("xc60")) {
    modelFamily = "xc60";
  } else if (m.includes("mustang")) {
    modelFamily = "mustang";
  } else if (m.includes("supra")) {
    modelFamily = "supra";
  } else if (m.includes("corolla")) {
    modelFamily = "corolla";
  } else if (m.includes("rav4")) {
    modelFamily = "rav4";
  } else if (m.includes("golf")) {
    modelFamily = "golf";
  } else if (m.includes("passat")) {
    modelFamily = "passat";
  } else if (m.includes("tiguan")) {
    modelFamily = "tiguan";
  } else if (m.includes("arteon")) {
    modelFamily = "arteon";
  } else if (m.includes("multivan")) {
    modelFamily = "multivan";
  } else if (m.includes("formentor")) {
    modelFamily = "formentor";
  } else if (m.includes("3008")) {
    modelFamily = "3008";
  } else if (m.includes("508")) {
    modelFamily = "508";
  } else if (m.includes("208")) {
    modelFamily = "208";
  } else if (m.includes("austral")) {
    modelFamily = "austral";
  } else if (m.includes("megane")) {
    modelFamily = "megane";
  } else if (m.includes("clio")) {
    modelFamily = "clio";
  } else if (m.includes("tucson")) {
    modelFamily = "tucson";
  } else if (m.includes("ioniq")) {
    modelFamily = "ioniq-5";
  } else if (m.includes("egea")) {
    modelFamily = "tipo";
  } else if (m.includes("civic")) {
    modelFamily = "civic";
  } else if (m.includes("lm 350") || m.includes("lm")) {
    modelFamily = "lm";
  } else {
    modelFamily = m.split(/[\s-]+/)[0] || "";
  }

  return { make, modelFamily };
}

/**
 * Generates an Imagin Studio dynamic 3D vehicle render URL.
 * Supports different camera angles, trims, powertrains and zoom levels.
 */
export function generateCarImageUrl({
  brand,
  model = "",
  year = 2023,
  angle = "01",
  fuelType,
  paintDescription,
}: GenerateImageParams): string {
  // If exotic brand unsupported by Imagin Studio, return authentic studio photo
  if (EXOTIC_STUDIO_CARS[brand]) {
    const exotic = EXOTIC_STUDIO_CARS[brand];
    const match = exotic.angles.find((a) => a.angle === `${angle}`);
    return match ? match.url : exotic.main;
  }

  const { make, modelFamily } = normalizeCarParams(brand, model);
  const url = new URL("https://cdn.imagin.studio/getImage");

  url.searchParams.append("customer", IMAGIN_CUSTOMER_KEY);
  url.searchParams.append("make", make);
  if (modelFamily) {
    url.searchParams.append("modelFamily", modelFamily);
  }
  if (year) {
    url.searchParams.append("modelYear", `${year}`);
  }

  // PowerTrain mapping from Turkish database values
  if (fuelType) {
    const ft = fuelType.toLowerCase();
    if (ft.includes("elektrik") || ft.includes("electric")) {
      url.searchParams.append("powerTrain", "electric");
    } else if (ft.includes("dizel") || ft.includes("diesel")) {
      url.searchParams.append("powerTrain", "diesel");
    } else if (ft.includes("hibrit") || ft.includes("hybrid")) {
      url.searchParams.append("powerTrain", "hybrid");
    } else if (ft.includes("benzin") || ft.includes("petrol") || ft.includes("gasoline")) {
      url.searchParams.append("powerTrain", "petrol");
    }
  }

  if (paintDescription) {
    url.searchParams.append("paintDescription", paintDescription);
  }

  url.searchParams.append("angle", `${angle}`);
  url.searchParams.append("zoomType", "fullscreen");

  return url.toString();
}

/**
 * Returns a complete set of vehicle angles generated dynamically from Imagin Studio
 * or curated authentic multi-angle studio shots for unsupported exotic hypercars.
 */
export function getCarVisuals(
  brand: string,
  model: string = "",
  year: number = 2023,
  fuelType?: string
): CarVisual {
  if (EXOTIC_STUDIO_CARS[brand]) {
    return EXOTIC_STUDIO_CARS[brand];
  }

  const angles: CarVisualAngle[] = [
    {
      angle: "01",
      label: "Açı 01 (Ana Açı)",
      url: generateCarImageUrl({ brand, model, year, angle: "01", fuelType }),
    },
    {
      angle: "23",
      label: "3/4 Ön Açı",
      url: generateCarImageUrl({ brand, model, year, angle: "23", fuelType }),
    },
    {
      angle: "29",
      label: "Yüksek Açı",
      url: generateCarImageUrl({ brand, model, year, angle: "29", fuelType }),
    },
    {
      angle: "13",
      label: "3/4 Arka Açı",
      url: generateCarImageUrl({ brand, model, year, angle: "13", fuelType }),
    },
    {
      angle: "33",
      label: "Ön Görünüm",
      url: generateCarImageUrl({ brand, model, year, angle: "33", fuelType }),
    },
  ];

  return {
    main: angles[0].url,      // angle 01 default
    angle1: angles[1].url,    // angle 23
    angle2: angles[2].url,    // angle 29
    angle3: angles[3].url,    // angle 13
    interior: angles[4].url,  // angle 33
    angles,
  };
}

/**
 * Fallback image if network or ad blocker blocks loading
 */
export function getFallbackCarImage(brand?: string): string {
  if (brand && EXOTIC_STUDIO_CARS[brand]) {
    return EXOTIC_STUDIO_CARS[brand].main;
  }
  return "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80";
}
