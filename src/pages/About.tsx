
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Award, Truck } from "lucide-react";
import { AdSenseAd } from "@/components/AdSenseAd";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800 font-serif">KK-CLOTHING</h1>
            <nav>
              <Button variant="ghost" asChild>
                <a href="/">Home</a>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-50 to-orange-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 font-serif">
            About KK-Clothing
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Crafting Timeless Pakistani Fashion Since 2020
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Our Story */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-8">Our Story</h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Founded with a passion for preserving and modernizing Pakistani fashion, KK-Clothing has become 
              a trusted name in premium ethnic wear. We believe that traditional clothing should evolve with 
              the times while maintaining its cultural essence and elegance.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              From our humble beginnings to serving customers worldwide, we've remained committed to quality, 
              authenticity, and customer satisfaction. Every piece in our collection tells a story of 
              craftsmanship, tradition, and contemporary style.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Heart className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                <CardTitle>Quality First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Premium fabrics and meticulous attention to detail in every garment.</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                <CardTitle>Customer Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Your satisfaction is our priority, with exceptional service and support.</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Award className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                <CardTitle>Authenticity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Genuine Pakistani designs that honor our rich cultural heritage.</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Truck className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                <CardTitle>Global Reach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Worldwide shipping to bring Pakistani fashion to your doorstep.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* AdSense Ad */}
        <AdSenseAd 
          adClient="ca-pub-XXXXXXXXXXXXXXXX"
          adSlot="1234567892"
          className="my-8"
        />

        {/* Team Section */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Meet Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h4 className="font-semibold text-lg mb-2">Kasim Khan</h4>
                <p className="text-amber-600 mb-2">Founder & CEO</p>
                <p className="text-gray-600 text-sm">Visionary leader with 15+ years in fashion industry.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h4 className="font-semibold text-lg mb-2">Ayesha Ahmed</h4>
                <p className="text-amber-600 mb-2">Head Designer</p>
                <p className="text-gray-600 text-sm">Creative genius behind our stunning collections.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h4 className="font-semibold text-lg mb-2">Muhammad Ali</h4>
                <p className="text-amber-600 mb-2">Operations Manager</p>
                <p className="text-gray-600 text-sm">Ensures smooth operations and timely deliveries.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
