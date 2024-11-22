import { Section } from "@/components/ui/Section";
import Image from "next/image";

const Page = () => {
  return (
    <main className="min-h-screen bg-background">
      <Section className="py-16">
        <h1 className="text-4xl font-bold text-text-primary mb-8">About Us</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Image
              src="https://images.unsplash.com/photo-1472396961693-142e6e269027"
              alt="About Agro Galaxy"
              className="rounded-lg object-cover w-full h-[400px]"
              height={400}
              width={400}
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-text-primary">Our Mission</h2>
            <p className="text-gray-600">
              At Agro Galaxy, we&apos;re dedicated to revolutionizing agriculture through innovative technology. Our mission is to empower farmers with smart solutions that increase productivity while promoting sustainable farming practices.
            </p>
            <h2 className="text-2xl font-semibold text-text-primary">Our Vision</h2>
            <p className="text-gray-600">
              We envision a future where farming is more efficient, sustainable, and profitable through the integration of cutting-edge technology and traditional farming wisdom.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">10+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">5000+</div>
                <div className="text-sm text-gray-600">Farmers Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">15+</div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Page;