import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Search, Phone, Clock, Star, Heart, ArrowUpRight, Loader2 } from "lucide-react";
import { toast } from "sonner"; // Assuming you have sonner toasts

// IMPORTANT: Replace with your actual Google Maps API Key
const GOOGLE_MAPS_API_KEY = "AIzaSyDHfBDvY6UgWfDRb_HI_VPBoIV9ojo58YI";

// Mock data for nearby hospitals with approximate coordinates
const hospitals = [
  {
    id: 1,
    name: "General Hospital",
    address: "123 Main Street, Cityville",
    distance: "1.2 miles",
    rating: 4.5,
    phone: "(555) 123-4567",
    hours: "Open 24 hours",
    services: ["Emergency", "Cardiology", "Pediatrics", "Orthopedics"],
    isFavorite: false,
    lat: 34.052235, // Example Latitude (Los Angeles)
    lng: -118.243683, // Example Longitude (Los Angeles)
  },
  {
    id: 2,
    name: "Community Medical Center",
    address: "456 Oak Avenue, Townsburg",
    distance: "2.8 miles",
    rating: 4.2,
    phone: "(555) 987-6543",
    hours: "7:00 AM - 9:00 PM",
    services: ["Family Medicine", "Radiology", "Laboratory", "Physical Therapy"],
    isFavorite: true,
    lat: 34.052235 + 0.02, // Slightly different location
    lng: -118.243683 + 0.03,
  },
  {
    id: 3,
    name: "Children's Hospital",
    address: "789 Pine Road, Villagetown",
    distance: "4.5 miles",
    rating: 4.8,
    phone: "(555) 456-7890",
    hours: "Open 24 hours",
    services: ["Pediatric Emergency", "Neonatal Care", "Child Psychology", "Pediatric Surgery"],
    isFavorite: false,
    lat: 34.052235 - 0.01,
    lng: -118.243683 - 0.04,
  }
];

const Hospitals = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHospitals, setFilteredHospitals] = useState(hospitals);
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Filter hospitals based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredHospitals(hospitals);
    } else {
      const filtered = hospitals.filter(hospital => 
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredHospitals(filtered);
    }
  }, [searchQuery]);

  // Load Google Maps script and initialize map
  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === "AIzaSyDHfBDvY6UgWfDRb_HI_VPBoIV9ojo58YI") {
      toast.error("Google Maps API Key is missing or invalid. Please add it to Hospitals.tsx.");
      return;
    }

    // Check if Google Maps script is already loaded
    if (window.google && window.google.maps && mapLoaded) {
      initializeMap();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;
    
    // Define the callback function globally (or attach to window)
    (window as any).initMap = () => {
      setMapLoaded(true);
      initializeMap();
    };

    document.head.appendChild(script);

    return () => {
      // Clean up the script if component unmounts
      document.head.removeChild(script);
      delete (window as any).initMap;
    };
  }, [mapLoaded]); // Rerun when mapLoaded state changes

  const initializeMap = () => {
    if (!mapRef.current) return;

    const defaultCenter = { lat: 34.052235, lng: -118.243683 }; // Default to Los Angeles or a central point

    const map = new window.google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 10,
      mapId: "DEMO_MAP_ID", // You can use a specific Map ID from Google Cloud Console
    });

    // Add markers for each hospital
    filteredHospitals.forEach(hospital => {
      const marker = new window.google.maps.Marker({
        position: { lat: hospital.lat, lng: hospital.lng },
        map: map,
        title: hospital.name,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="font-family: sans-serif; padding: 5px;">
            <h4 style="margin: 0 0 5px 0; font-size: 16px;">${hospital.name}</h4>
            <p style="margin: 0 0 3px 0; font-size: 13px;">${hospital.address}</p>
            <p style="margin: 0 0 3px 0; font-size: 13px;">${hospital.phone}</p>
            <p style="margin: 0; font-size: 13px;">Rating: ${hospital.rating} <span style="color: gold;">★</span></p>
            <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.address)}" target="_blank" style="color: #60A5FA; text-decoration: none; font-size: 13px;">Get Directions</a>
          </div>
        `,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    });
  };

  // Re-initialize map when filteredHospitals change (e.g., after search)
  useEffect(() => {
    if (mapLoaded) {
      initializeMap();
    }
  }, [filteredHospitals, mapLoaded]);


  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto pt-24 px-4 pb-12">
        <h1 className="text-3xl font-bold text-healthcare-dark mb-6">Find Hospitals & Healthcare Providers</h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Locate nearby hospitals, clinics, and healthcare facilities. Get directions, contact information, and available services.
        </p>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              className="pl-10"
              placeholder="Search by hospital name, location, or services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="map" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="map">
            <Card className="shadow-md mb-6">
              <CardContent className="p-6">
                <div 
                  ref={mapRef} 
                  className="w-full h-[400px] bg-gray-100 rounded-lg relative overflow-hidden"
                >
                  {!mapLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80 z-10">
                      <Loader2 className="h-8 w-8 animate-spin text-healthcare-primary" />
                      <span className="ml-2 text-gray-600">Loading Map...</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <h2 className="text-xl font-semibold text-healthcare-dark mb-4">Nearby Hospitals</h2>
            <div className="grid grid-cols-1 gap-4">
              {filteredHospitals.slice(0, 2).map((hospital) => (
                <Card key={hospital.id} className="shadow-sm hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{hospital.name}</h3>
                        <p className="text-gray-500 text-sm flex items-center">
                          <MapPin className="h-3.5 w-3.5 mr-1" /> {hospital.address}
                        </p>
                        <p className="text-sm text-healthcare-primary">{hospital.distance} away</p>
                      </div>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <Heart className={`h-5 w-5 ${hospital.isFavorite ? 'fill-healthcare-accent text-healthcare-accent' : 'text-gray-400'}`} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredHospitals.length > 2 && (
                <Button variant="outline" className="mt-2">
                  View All Hospitals
                </Button>
              )}
            </div>
          </TabsContent>

          <TabsContent value="list">
            <div className="space-y-4">
              {filteredHospitals.length > 0 ? (
                filteredHospitals.map((hospital) => (
                  <Card key={hospital.id} className="shadow-md hover:shadow-lg transition-all">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div>
                          <CardTitle>{hospital.name}</CardTitle>
                          <CardDescription className="flex items-center">
                            <MapPin className="h-3.5 w-3.5 mr-1" /> {hospital.address}
                          </CardDescription>
                        </div>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <Heart className={`h-5 w-5 ${hospital.isFavorite ? 'fill-healthcare-accent text-healthcare-accent' : 'text-gray-400'}`} />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col space-y-2 mb-3">
                        <div className="flex items-center text-sm">
                          <Phone className="h-3.5 w-3.5 mr-2 text-healthcare-primary" />
                          <span>{hospital.phone}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-3.5 w-3.5 mr-2 text-healthcare-primary" />
                          <span>{hospital.hours}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Star className="h-3.5 w-3.5 mr-2 text-healthcare-primary" />
                          <span>{hospital.rating} stars</span>
                        </div>
                      </div>
                      
                      <div className="border-t pt-3">
                        <p className="text-sm font-medium mb-1">Services:</p>
                        <div className="flex flex-wrap gap-1">
                          {hospital.services.map((service, index) => (
                            <span key={index} className="inline-block bg-healthcare-primary/10 text-healthcare-primary text-xs px-2 py-1 rounded">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">Call</Button>
                        <Button variant="outline" size="sm" className="flex-1">Directions</Button>
                        <Button size="sm" className="flex-1">
                          Details <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No hospitals found matching your search criteria.</p>
                  <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                    Reset Search
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Hospitals;
