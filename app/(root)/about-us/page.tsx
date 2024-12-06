import { Section } from "@/components/ui/Section";
import Image from "next/image";

const Page = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <Section className="py-16">
        <h1 className="text-center text-5xl font-extrabold text-green-800 mb-12 animate-fadeInUp">
          About Us
        </h1>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <Image
              src="https://images.unsplash.com/photo-1472396961693-142e6e269027"
              alt="About Agro Galaxy"
              className="rounded-lg object-cover w-full h-[400px] transform transition duration-500 group-hover:scale-105 group-hover:shadow-lg"
              height={400}
              width={400}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-30 transition duration-500"></div>
          </div>
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h2 className="text-3xl font-semibold text-green-700">Our Mission</h2>
              <p className="mt-2 text-gray-700 leading-relaxed">
                At Agro Galaxy, we&apos;re dedicated to revolutionizing agriculture through
                innovative technology. Our mission is to empower farmers with smart solutions
                that increase productivity while promoting sustainable farming practices.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-green-700">Our Vision</h2>
              <p className="mt-2 text-gray-700 leading-relaxed">
                We envision a future where farming is more efficient, sustainable, and profitable
                through the integration of cutting-edge technology and traditional farming wisdom.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center transition hover:scale-110 duration-300">
                <div className="bg-green-100 rounded-lg px-4 py-2">
                  <div className="text-4xl font-extrabold text-green-700">10+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>
              <div className="text-center transition hover:scale-110 duration-300">
                <div className="bg-green-100 rounded-lg px-4 py-2">
                  <div className="text-4xl font-extrabold text-green-700">5000+</div>
                  <div className="text-sm text-gray-600">Farmers Served</div>
                </div>
              </div>
              <div className="text-center transition hover:scale-110 duration-300">
                <div className="bg-green-100 rounded-lg px-4 py-2">
                  <div className="text-4xl font-extrabold text-green-700">15+</div>
                  <div className="text-sm text-gray-600">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Page;
