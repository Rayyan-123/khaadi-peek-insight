
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdSenseAd } from "@/components/AdSenseAd";

const SizeGuide = () => {
  const sizeData = [
    { size: "XS", bust: "32", waist: "26", hips: "34", length: "42" },
    { size: "S", bust: "34", waist: "28", hips: "36", length: "43" },
    { size: "M", bust: "36", waist: "30", hips: "38", length: "44" },
    { size: "L", bust: "38", waist: "32", hips: "40", length: "45" },
    { size: "XL", bust: "40", waist: "34", hips: "42", length: "46" },
    { size: "XXL", bust: "42", waist: "36", hips: "44", length: "47" }
  ];

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
            Size Guide
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Find your perfect fit with our comprehensive size guide
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Size Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Women's Size Chart (inches)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-amber-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Size</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Bust</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Waist</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Hips</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Length</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">{row.size}</td>
                      <td className="border border-gray-300 px-4 py-2">{row.bust}"</td>
                      <td className="border border-gray-300 px-4 py-2">{row.waist}"</td>
                      <td className="border border-gray-300 px-4 py-2">{row.hips}"</td>
                      <td className="border border-gray-300 px-4 py-2">{row.length}"</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Measurement Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>How to Measure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-amber-600">Bust</h4>
                <p className="text-gray-600">Measure around the fullest part of your chest, keeping the measuring tape horizontal.</p>
              </div>
              <div>
                <h4 className="font-semibold text-amber-600">Waist</h4>
                <p className="text-gray-600">Measure around your natural waistline, which is the narrowest part of your torso.</p>
              </div>
              <div>
                <h4 className="font-semibold text-amber-600">Hips</h4>
                <p className="text-gray-600">Measure around the fullest part of your hips, about 7-9 inches below your waist.</p>
              </div>
              <div>
                <h4 className="font-semibold text-amber-600">Length</h4>
                <p className="text-gray-600">Measure from the highest point of your shoulder to your desired hem length.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fit Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-amber-600">For a Loose Fit</h4>
                <p className="text-gray-600">Choose one size larger than your measurements suggest.</p>
              </div>
              <div>
                <h4 className="font-semibold text-amber-600">For a Fitted Look</h4>
                <p className="text-gray-600">Go with your exact measurements or one size smaller.</p>
              </div>
              <div>
                <h4 className="font-semibold text-amber-600">Between Sizes?</h4>
                <p className="text-gray-600">We recommend sizing up for comfort, especially with traditional wear.</p>
              </div>
              <div>
                <h4 className="font-semibold text-amber-600">Need Help?</h4>
                <p className="text-gray-600">Contact our customer service team for personalized sizing assistance.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AdSense Ad */}
        <AdSenseAd 
          adClient="ca-pub-XXXXXXXXXXXXXXXX"
          adSlot="1234567894"
          className="my-8"
        />

        {/* Contact for Help */}
        <Card className="text-center">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold mb-4">Still Need Help?</h3>
            <p className="text-gray-600 mb-6">
              Our customer service team is here to help you find the perfect fit.
            </p>
            <Button asChild className="bg-amber-600 hover:bg-amber-700">
              <a href="/contact">Contact Us</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SizeGuide;
