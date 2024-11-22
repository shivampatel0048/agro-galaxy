'use client'

import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { Star } from "lucide-react";
import Image from "next/image";

// Mock product data for static display
const product = {
  name: "Smart Irrigation System",
  description: "Automated water management for optimal crop growth. Our smart irrigation system uses advanced sensors and AI technology to ensure your crops get exactly the right amount of water they need, when they need it.",
  image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
  features: [
    "AI-powered water management",
    "Real-time monitoring",
    "Mobile app control",
    "Weather integration"
  ],
  specifications: {
    "Dimensions": "12 x 8 x 4 inches",
    "Weight": "2.5 lbs",
    "Power Source": "Solar-powered with battery backup",
    "Wireless Range": "Up to 1000 meters",
    "Water Flow Rate": "1-10 gallons per minute",
    "Sensor Types": "Moisture, Temperature, pH",
    "App Compatibility": "iOS and Android",
    "Warranty": "2 years limited"
  },
  instructions: [
    {
      title: "Installation",
      steps: [
        "Choose a central location in your field",
        "Install the main control unit and solar panel",
        "Place sensors at recommended intervals",
        "Connect to power source and test connectivity"
      ]
    },
    {
      title: "Setup",
      steps: [
        "Download the mobile app",
        "Create an account and connect your device",
        "Configure your crop type and field size",
        "Set up automated watering schedules"
      ]
    },
    {
      title: "Maintenance",
      steps: [
        "Clean sensors monthly",
        "Check battery levels weekly",
        "Update firmware when available",
        "Calibrate sensors every season"
      ]
    }
  ],
  reviews: [
    {
      name: "John Smith",
      rating: 5,
      date: "2024-02-15",
      comment: "Transformed our irrigation process. Saving both water and time!"
    },
    {
      name: "Maria Garcia",
      rating: 4,
      date: "2024-02-10",
      comment: "Great system, very intuitive. Would love to see more customization options."
    },
    {
      name: "David Wilson",
      rating: 5,
      date: "2024-02-01",
      comment: "The AI recommendations are spot-on. Helped us reduce water usage by 30%."
    }
  ]
};

const ProductDetails = () => {
  const averageRating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

  return (
    <div className="min-h-screen bg-background">
      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
              height={400}
              width={400}
            />
            <Badge className="absolute right-2 top-2 bg-accent text-black">
              Coming Soon
            </Badge>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-text-primary md:text-4xl">
              {product.name}
            </h1>
            <div className="mt-2 flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < averageRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600">
                ({product.reviews.length} reviews)
              </span>
            </div>
            <p className="mt-4 text-lg text-gray-600">{product.description}</p>
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-text-primary">Key Features</h2>
              <ul className="mt-4 space-y-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-600">
                    <span className="mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <Button className="mt-8" disabled>
              Coming Soon
            </Button>
          </div>
        </div>

        <div className="mt-16">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="instructions">How to Use</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="specifications" className="mt-6">
              <div className="grid gap-4 rounded-lg border p-6 md:grid-cols-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <dt className="text-sm font-medium text-gray-600">{key}</dt>
                    <dd className="text-lg text-text-primary">{value}</dd>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="instructions" className="mt-6">
              <div className="space-y-8">
                {product.instructions.map((section) => (
                  <div key={section.title} className="rounded-lg border p-6">
                    <h3 className="mb-4 text-xl font-semibold text-text-primary">
                      {section.title}
                    </h3>
                    <ol className="space-y-3">
                      {section.steps.map((step, index) => (
                        <li key={index} className="flex gap-3 text-gray-600">
                          <span className="font-semibold">{index + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {product.reviews.map((review, index) => (
                  <div key={index} className="rounded-lg border p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-semibold text-text-primary">{review.name}</h3>
                      <span className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="mb-2 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Section>
    </div>
  );
};

export default ProductDetails;