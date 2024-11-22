'use client'

import { Button } from "../ui/button";

export const Hero = () => {
    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
            <div className="absolute inset-0 bg-black/40 z-10" />
            <iframe
                src="https://www.youtube.com/embed/nziA33FrhoI?autoplay=1&mute=1&controls=0&loop=1&playlist=nziA33FrhoI&showinfo=0"
                title="Agriculture Background Video"
                className="absolute inset-0 h-full w-full object-cover scale-[6] sm:scale-[5] md:scale-[4] lg:scale-[1.33]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
            <div className="relative z-20 flex h-full items-center justify-center text-center">
                <div className="container px-4">
                    <h1 className="animate-fade-up text-4xl font-bold text-white md:text-6xl">
                        Empowering Farmers with the Future of Agriculture
                    </h1>
                    <p className="mt-6 animate-fade-up text-lg text-white/90 md:text-xl [animation-delay:200ms]">
                        Discover innovative tools and solutions for smarter, sustainable farming
                    </p>
                    <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        <Button
                            size="lg"
                            onClick={() => scrollToSection("products")}
                            className="animate-fade-up [animation-delay:400ms]"
                        >
                            Explore Products
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => scrollToSection("about")}
                            className="animate-fade-up text-black hover:text-black [animation-delay:600ms]"
                        >
                            Learn More
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};