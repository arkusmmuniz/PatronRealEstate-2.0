// Realistic property data that simulates IDXBroker API structure
// This provides a more realistic fallback when the real API has no data

// Pool of diverse property images from Unsplash
const propertyImagePool = [
  // Modern homes
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  
  // Luxury homes
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  
  // Condos and apartments
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  
  // Suburban homes
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  
  // Waterfront properties
  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  
  // Contemporary designs
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1493663284031-b7e3aaa4cab7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  
  // Traditional homes
  "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
];

// Generate unique images for each property based on its ID
function generateUniqueImages(listingID: string, count: number = 5): string[] {
  // Create a hash from the listing ID for consistent but unique selection
  const hash = listingID.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const images: string[] = [];
  const usedIndices: number[] = [];
  
  for (let i = 0; i < count && i < propertyImagePool.length; i++) {
    let index = Math.abs(hash + i * 17) % propertyImagePool.length;
    
    // Avoid duplicates
    while (usedIndices.includes(index)) {
      index = (index + 1) % propertyImagePool.length;
    }
    
    usedIndices.push(index);
    images.push(propertyImagePool[index]);
  }
  
  return images;
}

export interface RealisticProperty {
  listingID: string;
  address: string;
  streetName: string;
  streetNumber: string;
  cityName: string;
  state: string;
  zipcode: string;
  listingPrice: number;
  bedrooms: number;
  totalBaths: number;
  sqFt: number;
  propStatus: string;
  idxPropType: string;
  remarksConcat: string;
  latitude: number;
  longitude: number;
  acres: number;
  mlsPhotoCount: number;
  image: string;
  mediaData: string[];
  featured: boolean;
  listingDate: string;
}

// Cache for consistent property data across requests
let cachedProperties: RealisticProperty[] | null = null;

// Generate realistic property data that mimics IDXBroker structure
export function generateRealisticProperties(): RealisticProperty[] {
  // Return cached data if already generated
  if (cachedProperties) {
    return cachedProperties;
  }

  // Pre-generate unique images for each property to ensure consistency
  const miamiImages = generateUniqueImages("MLS123456789", 5);
  const laImages = generateUniqueImages("MLS123456790", 5);
  const sfImages = generateUniqueImages("MLS123456791", 5);
  const nyImages = generateUniqueImages("MLS123456792", 5);
  const austinImages = generateUniqueImages("MLS123456793", 5);

  console.log('Generated unique images for properties:', {
    miami: miamiImages[0].substring(miamiImages[0].lastIndexOf('/') + 1, miamiImages[0].indexOf('?')),
    la: laImages[0].substring(laImages[0].lastIndexOf('/') + 1, laImages[0].indexOf('?')),
    sf: sfImages[0].substring(sfImages[0].lastIndexOf('/') + 1, sfImages[0].indexOf('?')),
    ny: nyImages[0].substring(nyImages[0].lastIndexOf('/') + 1, nyImages[0].indexOf('?')),
    austin: austinImages[0].substring(austinImages[0].lastIndexOf('/') + 1, austinImages[0].indexOf('?'))
  });

  const properties: RealisticProperty[] = [
    {
      listingID: "MLS123456789",
      address: "123 Ocean Drive",
      streetName: "Ocean Drive",
      streetNumber: "123",
      cityName: "Miami Beach",
      state: "FL",
      zipcode: "33139",
      listingPrice: 1250000,
      bedrooms: 3,
      totalBaths: 2.5,
      sqFt: 2200,
      propStatus: "Active",
      idxPropType: "Condo",
      remarksConcat: "Stunning oceanfront condo with panoramic views. Recently renovated with modern finishes throughout. Open concept living space with floor-to-ceiling windows. Master suite features walk-in closet and spa-like bathroom. Building amenities include pool, fitness center, and concierge service.",
      latitude: 25.7907,
      longitude: -80.1300,
      acres: 0.1,
      mlsPhotoCount: 8,
      image: miamiImages[0],
      mediaData: miamiImages,
      featured: true,
      listingDate: "2024-01-15"
    },
    {
      listingID: "MLS123456790",
      address: "456 Sunset Boulevard",
      streetName: "Sunset Boulevard",
      streetNumber: "456",
      cityName: "Los Angeles",
      state: "CA",
      zipcode: "90028",
      listingPrice: 1850000,
      bedrooms: 4,
      totalBaths: 3,
      sqFt: 2800,
      propStatus: "Active",
      idxPropType: "Single Family",
      remarksConcat: "Charming Spanish-style home in the heart of Hollywood. Original architectural details preserved while featuring modern updates. Spacious living areas with hardwood floors and crown molding. Private backyard with pool and outdoor kitchen. Walking distance to restaurants and entertainment.",
      latitude: 34.0928,
      longitude: -118.3287,
      acres: 0.15,
      mlsPhotoCount: 12,
      image: laImages[0],
      mediaData: laImages,
      featured: true,
      listingDate: "2024-01-20"
    },
    {
      listingID: "MLS123456791",
      address: "789 Lombard Street",
      streetName: "Lombard Street",
      streetNumber: "789",
      cityName: "San Francisco",
      state: "CA",
      zipcode: "94133",
      listingPrice: 2200000,
      bedrooms: 2,
      totalBaths: 2,
      sqFt: 1800,
      propStatus: "Active",
      idxPropType: "Condo",
      remarksConcat: "Luxury condo in iconic San Francisco location. High-end finishes throughout with gourmet kitchen and marble bathrooms. Floor-to-ceiling windows offer stunning city and bay views. Building features include rooftop deck, fitness center, and 24/7 concierge. One parking space included.",
      latitude: 37.8024,
      longitude: -122.4058,
      acres: 0.05,
      mlsPhotoCount: 10,
      image: sfImages[0],
      mediaData: sfImages,
      featured: true,
      listingDate: "2024-01-25"
    },
    {
      listingID: "MLS123456792",
      address: "321 Broadway",
      streetName: "Broadway",
      streetNumber: "321",
      cityName: "New York",
      state: "NY",
      zipcode: "10001",
      listingPrice: 1950000,
      bedrooms: 2,
      totalBaths: 2,
      sqFt: 1500,
      propStatus: "Active",
      idxPropType: "Condo",
      remarksConcat: "Modern loft-style condo in trendy SoHo district. Exposed brick walls and high ceilings create an industrial-chic aesthetic. Open floor plan perfect for entertaining. Building amenities include roof deck with city views, fitness center, and bike storage. Close to shopping and dining.",
      latitude: 40.7505,
      longitude: -74.0014,
      acres: 0.02,
      mlsPhotoCount: 6,
      image: nyImages[0],
      mediaData: nyImages,
      featured: true,
      listingDate: "2024-01-30"
    },
    {
      listingID: "MLS123456793",
      address: "654 South Lamar",
      streetName: "South Lamar",
      streetNumber: "654",
      cityName: "Austin",
      state: "TX",
      zipcode: "78704",
      listingPrice: 850000,
      bedrooms: 3,
      totalBaths: 2,
      sqFt: 2100,
      propStatus: "Active",
      idxPropType: "Single Family",
      remarksConcat: "Charming bungalow in South Austin's vibrant neighborhood. Recently updated with modern amenities while maintaining original character. Spacious kitchen with quartz countertops and stainless appliances. Large backyard perfect for entertaining. Walking distance to restaurants and music venues.",
      latitude: 30.2672,
      longitude: -97.7431,
      acres: 0.12,
      mlsPhotoCount: 9,
      image: austinImages[0],
      mediaData: austinImages,
      featured: true,
      listingDate: "2024-02-05"
    }
  ];

  // Cache the generated properties
  cachedProperties = properties;
  
  return properties;
}

// Clear the cache (useful for development)
export function clearPropertyCache(): void {
  cachedProperties = null;
}

// Convert realistic property data to IDXBroker format
export function convertToIDXBrokerFormat(properties: RealisticProperty[]): any[] {
  return properties.map(prop => ({
    // IDXBroker standard fields
    listingID: prop.listingID,
    address: prop.address,
    streetName: prop.streetName,
    streetNumber: prop.streetNumber,
    cityName: prop.cityName,
    state: prop.state,
    zipcode: prop.zipcode,
    listingPrice: prop.listingPrice,
    bedrooms: prop.bedrooms,
    totalBaths: prop.totalBaths,
    sqFt: prop.sqFt,
    propStatus: prop.propStatus,
    idxPropType: prop.idxPropType,
    remarksConcat: prop.remarksConcat,
    latitude: prop.latitude,
    longitude: prop.longitude,
    acres: prop.acres,
    mlsPhotoCount: prop.mlsPhotoCount,
    image: prop.image,
    mediaData: prop.mediaData,
    featured: prop.featured,
    listingDate: prop.listingDate,
    
    // Additional fields that might be expected
    idxID: prop.listingID,
    propType: prop.idxPropType,
    status: prop.propStatus,
    price: prop.listingPrice,
    city: prop.cityName,
    zipCode: prop.zipcode,
    squareFeet: prop.sqFt,
    bathrooms: prop.totalBaths,
    description: prop.remarksConcat
  }));
}
