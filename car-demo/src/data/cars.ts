import { Car } from '../types';

export const carsData: Car[] = [
  {
    id: 1,
    make: 'Tesla',
    model: 'Model S',
    year: 2023,
    price: 89990,
    mileage: 0,
    exteriorColor: 'Midnight Silver',
    interiorColor: 'Black',
    fuelType: 'Electric',
    transmission: 'Automatic',
    engine: 'Dual Motor',
    horsepower: 670,
    images: [
      'https://images.pexels.com/photos/12179283/pexels-photo-12179283.jpeg',
      'https://images.pexels.com/photos/15777566/pexels-photo-15777566/free-photo-of-car-vehicle-luxury-transport.jpeg',
    ],
    features: [
      'Autopilot',
      '17" Touchscreen Display',
      'Heated Seats',
      'Premium Audio',
      'Wireless Charging',
      'Dual Motor All-Wheel Drive'
    ],
    description: 'The Tesla Model S is an all-electric five-door liftback sedan produced by Tesla, Inc. The Model S features a dual motor all-wheel drive, incredible performance, and the longest range of any electric vehicle. With a sleek design and luxurious interior, it delivers an exceptional driving experience.'
  },
  {
    id: 2,
    make: 'BMW',
    model: '5 Series',
    year: 2023,
    price: 56000,
    mileage: 5000,
    exteriorColor: 'Alpine White',
    interiorColor: 'Cognac',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    engine: '3.0L Inline-6',
    horsepower: 335,
    images: [
      'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
      'https://images.pexels.com/photos/9252054/pexels-photo-9252054.jpeg',
    ],
    features: [
      'Leather Interior',
      'Navigation System',
      'Bluetooth Connectivity',
      'Sunroof',
      'Parking Sensors',
      'Keyless Entry'
    ],
    description: 'The BMW 5 Series is a luxury midsize sedan known for its blend of performance and comfort. It offers a refined driving experience with precise handling and a smooth ride. The interior is crafted with high-quality materials and cutting-edge technology.'
  },
  {
    id: 3,
    make: 'Mercedes-Benz',
    model: 'E-Class',
    year: 2023,
    price: 62000,
    mileage: 3000,
    exteriorColor: 'Obsidian Black',
    interiorColor: 'Macchiato Beige',
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    engine: '3.0L V6',
    horsepower: 362,
    images: [
      'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg',
      'https://images.pexels.com/photos/11996473/pexels-photo-11996473.jpeg',
    ],
    features: [
      'Heated Leather Seats',
      'Panoramic Sunroof',
      'Premium Sound System',
      'Driver Assistance Package',
      'Ambient Lighting',
      '12.3" Digital Instrument Cluster'
    ],
    description: 'The Mercedes-Benz E-Class is the embodiment of modern luxury. It combines sophisticated style with cutting-edge technology to create a driving experience that\'s both comfortable and exhilarating. The interior is a testament to meticulous craftsmanship with premium materials throughout.'
  },
  {
    id: 4,
    make: 'Porsche',
    model: '911',
    year: 2023,
    price: 116000,
    mileage: 1500,
    exteriorColor: 'Racing Yellow',
    interiorColor: 'Black',
    fuelType: 'Gasoline',
    transmission: 'PDK',
    engine: '3.0L Flat-6',
    horsepower: 443,
    images: [
      'https://images.pexels.com/photos/12202031/pexels-photo-12202031.jpeg',
      'https://images.pexels.com/photos/11242293/pexels-photo-11242293.jpeg',
    ],
    features: [
      'Sport Chrono Package',
      'Adaptive Sport Seats',
      'Bose Surround Sound',
      'Lane Change Assist',
      'Sport Exhaust System',
      'Adaptive Suspension'
    ],
    description: 'The Porsche 911 is a true icon in the sports car world. Its distinctive silhouette has remained largely unchanged since its debut, while constantly evolving under the surface. It delivers exhilarating performance with everyday usability and reliability that few sports cars can match.'
  },
  {
    id: 5,
    make: 'Audi',
    model: 'Q7',
    year: 2023,
    price: 72000,
    mileage: 8000,
    exteriorColor: 'Navarra Blue',
    interiorColor: 'Rock Gray',
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    engine: '3.0L V6',
    horsepower: 335,
    images: [
      'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg',
      'https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg',
    ],
    features: [
      'Virtual Cockpit',
      'Quattro All-Wheel Drive',
      'Panoramic Sunroof',
      'Adaptive Air Suspension',
      'Bang & Olufsen Sound System',
      '7-Passenger Seating'
    ],
    description: 'The Audi Q7 is a premium seven-seat SUV that combines versatility, comfort, and advanced technology. It offers exceptional build quality, a refined interior, and a smooth, powerful driving experience. With its Quattro all-wheel drive system, it provides confidence in all driving conditions.'
  },
  {
    id: 6,
    make: 'Lexus',
    model: 'RX',
    year: 2023,
    price: 58000,
    mileage: 4000,
    exteriorColor: 'Matador Red',
    interiorColor: 'Parchment',
    fuelType: 'Hybrid',
    transmission: 'CVT',
    engine: '2.5L I-4',
    horsepower: 308,
    images: [
      'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg',
      'https://images.pexels.com/photos/9252227/pexels-photo-9252227.jpeg',
    ],
    features: [
      'Lexus Safety System+',
      'Leather-Trimmed Interior',
      'Power Rear Door',
      'Mark Levinson Audio',
      'Head-Up Display',
      'Wireless Charging'
    ],
    description: 'The Lexus RX combines bold styling with exceptional comfort and refinement. This luxury crossover offers a smooth ride, whisper-quiet cabin, and impressive fuel efficiency with its available hybrid powertrain. Inside, you\'ll find premium materials and intuitive technology throughout.'
  }
];

export const users = [
  {
    email: 'user@example.com',
    password: 'password123'
  }
];