'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/ui/Section";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Page = () => {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Message sent!",
            description: "We'll get back to you as soon as possible.",
        });
    };

    return (
        <main className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
            <Section className="py-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Contact Details Section */}
                    <div className="space-y-6">
                        <h1 className="text-5xl font-extrabold text-indigo-800 animate-fade-in mb-6">Contact Us</h1>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                        </p>
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="bg-indigo-100 p-3 rounded-full">
                                    <span className="text-indigo-700 text-xl">📍</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-indigo-800">Address</h3>
                                    <p className="text-gray-700">123 Farm Road, Agricultural District</p>
                                    <p className="text-gray-700">Harvest Valley, CA 95123</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="bg-indigo-100 p-3 rounded-full">
                                    <span className="text-indigo-700 text-xl">📧</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-indigo-800">Email</h3>
                                    <p className="text-gray-700">contact@agrogalaxy.com</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="bg-indigo-100 p-3 rounded-full">
                                    <span className="text-indigo-700 text-xl">📞</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-indigo-800">Phone</h3>
                                    <p className="text-gray-700">(123) 456-7890</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Section */}
                    <div className="bg-white shadow-lg rounded-lg p-8 animate-slide-in">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input placeholder="Your Name" required className="rounded-lg border-gray-300 focus:ring-indigo-500" />
                            <Input type="email" placeholder="Your Email" required className="rounded-lg border-gray-300 focus:ring-indigo-500" />
                            <Input placeholder="Subject" required className="rounded-lg border-gray-300 focus:ring-indigo-500" />
                            <Textarea placeholder="Your Message" className="min-h-[150px] rounded-lg border-gray-300 focus:ring-indigo-500" required />
                            <Button type="submit" className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 rounded-lg transition-all">
                                Send Message
                            </Button>
                        </form>
                    </div>
                </div>
            </Section>
        </main>
    );
};

export default Page;
