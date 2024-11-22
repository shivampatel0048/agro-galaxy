'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/ui/Section";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";


const Page = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Coming Soon",
      description: "Sign up functionality will be available soon!",
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <Section className="py-16">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-text-primary mb-8 text-center">Sign Up</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input placeholder="Full Name" required />
            </div>
            <div>
              <Input type="email" placeholder="Email" required />
            </div>
            <div>
              <Input type="password" placeholder="Password" required />
            </div>
            <div>
              <Input type="password" placeholder="Confirm Password" required />
            </div>
            <Button type="submit" className="w-full" disabled>
              Sign Up (Coming Soon)
            </Button>
            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </Section>
    </main>
  );
};

export default Page;