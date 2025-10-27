import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const apiKey = searchParams.get('apiKey');
  const endpoint = searchParams.get('endpoint') || 'featured';
  const limit = searchParams.get('limit') || '20';
  const offset = searchParams.get('offset') || '0';
  
  // Add other search parameters
  const city = searchParams.get('city');
  const state = searchParams.get('state');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const bedrooms = searchParams.get('bedrooms');
  const bathrooms = searchParams.get('bathrooms');
  const propertyType = searchParams.get('propertyType');
  const status = searchParams.get('status');

  if (!apiKey) {
    return NextResponse.json({ error: 'API key is required' }, { status: 400 });
  }

  try {
    // For now, return mock data while we configure the correct IDXBroker API endpoint
    // TODO: Replace with actual IDXBroker API call
    const mockData = [
      // Miami Properties
      {
        listingID: "12345",
        address: "123 Main Street",
        city: "Miami",
        state: "FL",
        zipCode: "33101",
        price: 750000,
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1800,
        listingDate: "2024-01-15",
        propertyType: "Single Family",
        status: "Active",
        imageUrl: "/placeholder.jpg"
      },
      {
        listingID: "12346",
        address: "456 Ocean Drive",
        city: "Miami Beach",
        state: "FL",
        zipCode: "33139",
        price: 1200000,
        bedrooms: 4,
        bathrooms: 3,
        squareFeet: 2200,
        listingDate: "2024-01-20",
        propertyType: "Condo",
        status: "Active",
        imageUrl: "/placeholder.jpg"
      },
      {
        listingID: "12347",
        address: "789 Brickell Ave",
        city: "Miami",
        state: "FL",
        zipCode: "33131",
        price: 950000,
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1500,
        listingDate: "2024-01-25",
        propertyType: "Condo",
        status: "Pending",
        imageUrl: "/placeholder.jpg"
      },
      // Los Angeles Properties
      {
        listingID: "12348",
        address: "123 Sunset Blvd",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90028",
        price: 850000,
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1900,
        listingDate: "2024-01-10",
        propertyType: "Single Family",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      },
      {
        listingID: "12349",
        address: "456 Hollywood Hills",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90046",
        price: 1500000,
        bedrooms: 4,
        bathrooms: 3,
        squareFeet: 2500,
        listingDate: "2024-01-12",
        propertyType: "Single Family",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80"
      },
      {
        listingID: "12350",
        address: "789 Beverly Hills",
        city: "Beverly Hills",
        state: "CA",
        zipCode: "90210",
        price: 2500000,
        bedrooms: 5,
        bathrooms: 4,
        squareFeet: 3500,
        listingDate: "2024-01-18",
        propertyType: "Single Family",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      },
      // San Francisco Properties
      {
        listingID: "12353",
        address: "123 Lombard Street",
        city: "San Francisco",
        state: "CA",
        zipCode: "94133",
        price: 1800000,
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1800,
        listingDate: "2024-01-05",
        propertyType: "Condo",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      },
      {
        listingID: "12354",
        address: "456 Castro District",
        city: "San Francisco",
        state: "CA",
        zipCode: "94114",
        price: 1200000,
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1400,
        listingDate: "2024-01-08",
        propertyType: "Condo",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80"
      },
      // San Diego Properties
      {
        listingID: "12355",
        address: "123 La Jolla Shores",
        city: "San Diego",
        state: "CA",
        zipCode: "92037",
        price: 2200000,
        bedrooms: 4,
        bathrooms: 3,
        squareFeet: 2800,
        listingDate: "2024-01-14",
        propertyType: "Single Family",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      },
      {
        listingID: "12356",
        address: "456 Gaslamp Quarter",
        city: "San Diego",
        state: "CA",
        zipCode: "92101",
        price: 950000,
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1600,
        listingDate: "2024-01-16",
        propertyType: "Condo",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      },
      // Sacramento Properties
      {
        listingID: "12357",
        address: "123 Capitol Mall",
        city: "Sacramento",
        state: "CA",
        zipCode: "95814",
        price: 650000,
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1700,
        listingDate: "2024-01-20",
        propertyType: "Single Family",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80"
      },
      {
        listingID: "12358",
        address: "456 Midtown",
        city: "Sacramento",
        state: "CA",
        zipCode: "95816",
        price: 750000,
        bedrooms: 4,
        bathrooms: 3,
        squareFeet: 2100,
        listingDate: "2024-01-22",
        propertyType: "Single Family",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      },
      // Oakland Properties
      {
        listingID: "12359",
        address: "123 Jack London Square",
        city: "Oakland",
        state: "CA",
        zipCode: "94607",
        price: 1100000,
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1900,
        listingDate: "2024-01-25",
        propertyType: "Single Family",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      },
      {
        listingID: "12360",
        address: "456 Lake Merritt",
        city: "Oakland",
        state: "CA",
        zipCode: "94612",
        price: 850000,
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1500,
        listingDate: "2024-01-28",
        propertyType: "Condo",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80"
      },
      // Santa Barbara Properties
      {
        listingID: "12361",
        address: "123 State Street",
        city: "Santa Barbara",
        state: "CA",
        zipCode: "93101",
        price: 1900000,
        bedrooms: 4,
        bathrooms: 3,
        squareFeet: 2400,
        listingDate: "2024-01-30",
        propertyType: "Single Family",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      },
      {
        listingID: "12362",
        address: "456 Montecito",
        city: "Santa Barbara",
        state: "CA",
        zipCode: "93108",
        price: 3200000,
        bedrooms: 5,
        bathrooms: 4,
        squareFeet: 3800,
        listingDate: "2024-02-01",
        propertyType: "Single Family",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      },
      // Fresno Properties
      {
        listingID: "12363",
        address: "123 Tower District",
        city: "Fresno",
        state: "CA",
        zipCode: "93721",
        price: 450000,
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1600,
        listingDate: "2024-02-03",
        propertyType: "Single Family",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80"
      },
      {
        listingID: "12364",
        address: "456 Woodward Park",
        city: "Fresno",
        state: "CA",
        zipCode: "93720",
        price: 520000,
        bedrooms: 4,
        bathrooms: 3,
        squareFeet: 2000,
        listingDate: "2024-02-05",
        propertyType: "Single Family",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      },
      // Long Beach Properties
      {
        listingID: "12365",
        address: "123 Belmont Shore",
        city: "Long Beach",
        state: "CA",
        zipCode: "90803",
        price: 980000,
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1800,
        listingDate: "2024-02-07",
        propertyType: "Single Family",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      },
      {
        listingID: "12366",
        address: "456 Downtown",
        city: "Long Beach",
        state: "CA",
        zipCode: "90802",
        price: 750000,
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1400,
        listingDate: "2024-02-09",
        propertyType: "Condo",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80"
      },
      // New York Properties
      {
        listingID: "12351",
        address: "123 Broadway",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        price: 1200000,
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1200,
        listingDate: "2024-01-22",
        propertyType: "Condo",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80"
      },
      {
        listingID: "12352",
        address: "456 Central Park West",
        city: "New York",
        state: "NY",
        zipCode: "10023",
        price: 1800000,
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1800,
        listingDate: "2024-01-28",
        propertyType: "Condo",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      },
      // Texas Properties
      {
        listingID: "12367",
        address: "123 Main Street",
        city: "Austin",
        state: "TX",
        zipCode: "78701",
        price: 650000,
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1800,
        listingDate: "2024-02-10",
        propertyType: "Single Family",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      },
      {
        listingID: "12368",
        address: "456 South Lamar",
        city: "Austin",
        state: "TX",
        zipCode: "78704",
        price: 850000,
        bedrooms: 4,
        bathrooms: 3,
        squareFeet: 2200,
        listingDate: "2024-02-12",
        propertyType: "Single Family",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      },
      // Dallas Properties
      {
        listingID: "12369",
        address: "123 Uptown",
        city: "Dallas",
        state: "TX",
        zipCode: "75201",
        price: 750000,
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1900,
        listingDate: "2024-02-14",
        propertyType: "Condo",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80"
      },
      {
        listingID: "12370",
        address: "456 Highland Park",
        city: "Dallas",
        state: "TX",
        zipCode: "75205",
        price: 1200000,
        bedrooms: 4,
        bathrooms: 3,
        squareFeet: 2500,
        listingDate: "2024-02-16",
        propertyType: "Single Family",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      },
      // Chicago Properties
      {
        listingID: "12371",
        address: "123 Michigan Avenue",
        city: "Chicago",
        state: "IL",
        zipCode: "60601",
        price: 950000,
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1400,
        listingDate: "2024-02-18",
        propertyType: "Condo",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      },
      {
        listingID: "12372",
        address: "456 Lincoln Park",
        city: "Chicago",
        state: "IL",
        zipCode: "60614",
        price: 1100000,
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 2000,
        listingDate: "2024-02-20",
        propertyType: "Single Family",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      },
      // Seattle Properties
      {
        listingID: "12373",
        address: "123 Capitol Hill",
        city: "Seattle",
        state: "WA",
        zipCode: "98102",
        price: 850000,
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1200,
        listingDate: "2024-02-22",
        propertyType: "Condo",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80"
      },
      {
        listingID: "12374",
        address: "456 Queen Anne",
        city: "Seattle",
        state: "WA",
        zipCode: "98109",
        price: 1300000,
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1800,
        listingDate: "2024-02-24",
        propertyType: "Single Family",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      },
      // Denver Properties
      {
        listingID: "12375",
        address: "123 LoDo",
        city: "Denver",
        state: "CO",
        zipCode: "80202",
        price: 750000,
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1300,
        listingDate: "2024-02-26",
        propertyType: "Condo",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      },
      {
        listingID: "12376",
        address: "456 Cherry Creek",
        city: "Denver",
        state: "CO",
        zipCode: "80206",
        price: 950000,
        bedrooms: 4,
        bathrooms: 3,
        squareFeet: 2200,
        listingDate: "2024-02-28",
        propertyType: "Single Family",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      },
      // Phoenix Properties
      {
        listingID: "12377",
        address: "123 Scottsdale",
        city: "Phoenix",
        state: "AZ",
        zipCode: "85251",
        price: 650000,
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1900,
        listingDate: "2024-03-01",
        propertyType: "Single Family",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80"
      },
      {
        listingID: "12378",
        address: "456 Paradise Valley",
        city: "Phoenix",
        state: "AZ",
        zipCode: "85253",
        price: 1500000,
        bedrooms: 5,
        bathrooms: 4,
        squareFeet: 3500,
        listingDate: "2024-03-03",
        propertyType: "Single Family",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      },
      // Las Vegas Properties
      {
        listingID: "12379",
        address: "123 Summerlin",
        city: "Las Vegas",
        state: "NV",
        zipCode: "89134",
        price: 550000,
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1800,
        listingDate: "2024-03-05",
        propertyType: "Single Family",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      },
      {
        listingID: "12380",
        address: "456 Henderson",
        city: "Las Vegas",
        state: "NV",
        zipCode: "89052",
        price: 750000,
        bedrooms: 4,
        bathrooms: 3,
        squareFeet: 2400,
        listingDate: "2024-03-07",
        propertyType: "Single Family",
        status: "Active",
        imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      }
    ];

    // Filter mock data based on search parameters
    let filteredData = mockData;
    
    console.log("Search parameters:", { city, state, minPrice, maxPrice, bedrooms, bathrooms, propertyType, status });
    console.log("Initial data count:", mockData.length);
    
    if (city) {
      filteredData = filteredData.filter(property => 
        property.city.toLowerCase().includes(city.toLowerCase()) ||
        property.address.toLowerCase().includes(city.toLowerCase())
      );
    }
    
    if (state) {
      filteredData = filteredData.filter(property => 
        property.state.toLowerCase().includes(state.toLowerCase())
      );
    }
    
    if (minPrice) {
      filteredData = filteredData.filter(property => 
        property.price >= parseInt(minPrice)
      );
    }
    
    if (maxPrice) {
      filteredData = filteredData.filter(property => 
        property.price <= parseInt(maxPrice)
      );
    }
    
    if (bedrooms) {
      filteredData = filteredData.filter(property => 
        property.bedrooms >= parseInt(bedrooms)
      );
    }
    
    if (bathrooms) {
      filteredData = filteredData.filter(property => 
        property.bathrooms >= parseInt(bathrooms)
      );
    }
    
    if (propertyType) {
      filteredData = filteredData.filter(property => 
        property.propertyType === propertyType
      );
    }
    
    if (status) {
      filteredData = filteredData.filter(property => 
        property.status === status
      );
    }

    // Apply limit and offset
    const startIndex = parseInt(offset);
    const endIndex = startIndex + parseInt(limit);
    const paginatedData = filteredData.slice(startIndex, endIndex);
    
    console.log("Filtered data count:", filteredData.length);
    console.log("Paginated data count:", paginatedData.length);
    
    return NextResponse.json({
      success: true,
      data: paginatedData,
      count: paginatedData.length
    });

  } catch (error) {
    console.error('IDXBroker API Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch data from IDXBroker API'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { apiKey, endpoint, ...params } = body;

    if (!apiKey) {
      return NextResponse.json({ error: 'API key is required' }, { status: 400 });
    }

    const baseUrl = 'https://middleware.idxbroker.com/mls';
    const url = new URL(`${baseUrl}/${endpoint || 'featured'}`);
    
    // Add query parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString());
      }
    });

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': 'PatronRealEstate/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`IDXBroker API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      data: data,
      count: Array.isArray(data) ? data.length : 1
    });

  } catch (error) {
    console.error('IDXBroker API Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch data from IDXBroker API'
    }, { status: 500 });
  }
}
