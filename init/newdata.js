const sampleListings = [
  {
    title: "Hiroshima Historic Inn",
    description: "Experience the rich history of Hiroshima at this traditional inn. Immerse yourself in Japanese hospitality, visit nearby landmarks, and enjoy a cultural retreat.",
    image: {
      filename: "hiroshima_historic_inn_image",
      url: "https://images.unsplash.com/photo-1590499693710-96113ebb4eb0?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 2500,
    location: "Hiroshima",
    country: "Japan",
    geometry: {
      type: 'Point',
      coordinates: [132.4594, 34.3852],
    },
    tags: ["historic", "inn", "cultural"],
    category: "Apartment",
  },
  
  {
    title: "Sapporo Ski Lodge",
    description: "Embrace winter in Sapporo at this cozy ski lodge. With easy access to slopes, warm fireplaces, and hot cocoa, it's an ideal retreat for snow enthusiasts.",
    image: {
      filename: "sapporo_ski_lodge_image",
      url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 2800,
    location: "Sapporo",
    country: "Japan",
    geometry: {
      type: 'Point',
      coordinates: [141.3544, 43.0621],
    },
    tags: ["ski", "lodge", "winter"],
    category: "Mountains",
  },
  
  {
    title: "Yokohama Bayfront Apartment",
    description: "Enjoy the waterfront lifestyle in Yokohama. This modern apartment offers stunning bay views, proximity to the city, and a vibrant urban experience.",
    image: {
      filename: "yokohama_bayfront_apartment_image",
      url: "https://images.unsplash.com/photo-1655789760445-df8de475021a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 3000,
    location: "Yokohama",
    country: "Japan",
    geometry: {
      type: 'Point',
      coordinates: [139.6368, 35.4449],
    },
    tags: ["bayfront", "apartment", "modern"],
    category: "Apartment",
  },
  
  {
    title: "Fukuoka Beach Villa",
    description: "Experience coastal living in Fukuoka at this beachfront villa. Enjoy sandy shores, ocean breezes, and the tranquility of a seaside escape.",
    image: {
      filename: "fukuoka_beach_villa_image",
      url: "https://images.unsplash.com/photo-1432889490240-84df33d47091?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 2600,
    location: "Fukuoka",
    country: "Japan",
    geometry: {
      type: 'Point',
      coordinates: [130.4181, 33.5904],
    },
    tags: ["beach", "villa", "seaside"],
    category: "Beach",
  }
  
];

module.exports = { data: sampleListings };