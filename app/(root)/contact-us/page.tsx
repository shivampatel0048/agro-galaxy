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
        <main className="min-h-screen bg-background">
            <Section className="py-16">
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h1 className="text-4xl font-bold text-text-primary mb-6">Contact Us</h1>
                        <p className="text-gray-600 mb-8">
                            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                        </p>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-text-primary">Address</h3>
                                <p className="text-gray-600">123 Farm Road, Agricultural District</p>
                                <p className="text-gray-600">Harvest Valley, CA 95123</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-text-primary">Email</h3>
                                <p className="text-gray-600">contact@agrogalaxy.com</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-text-primary">Phone</h3>
                                <p className="text-gray-600">(123) 456-7890</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Input placeholder="Your Name" required />
                            </div>
                            <div>
                                <Input type="email" placeholder="Your Email" required />
                            </div>
                            <div>
                                <Input placeholder="Subject" required />
                            </div>
                            <div>
                                <Textarea placeholder="Your Message" className="min-h-[150px]" required />
                            </div>
                            <Button type="submit" className="w-full">Send Message</Button>
                        </form>
                    </div>
                </div>
            </Section>
        </main>
    );
};

export default Page;