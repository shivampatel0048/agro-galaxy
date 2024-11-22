export const Footer = () => {
    return (
        <footer className="bg-primary py-12 text-white">
            <div className="container mx-auto px-4">
                <div className="grid gap-8 md:grid-cols-2">
                    <div>
                        <blockquote className="border-l-4 border-accent pl-4">
                            <p className="text-lg italic">
                                &quot;Agriculture is our wisest pursuit, because it will in the end
                                contribute most to real wealth, good morals, and happiness.&quot;
                            </p>
                            <footer className="mt-2 text-sm text-white/80">
                                - Thomas Jefferson
                            </footer>
                        </blockquote>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Contact Us</h3>
                        <address className="not-italic text-white/80">
                            <p>123 Farm Road</p>
                            <p>Agricultural District</p>
                            <p>Harvest Valley, CA 95123</p>
                        </address>
                        <div className="space-y-1">
                            <p>
                                <span className="text-white/60">Email: </span>
                                <a
                                    href="mailto:contact@harvest-haven.com"
                                    className="hover:text-accent"
                                >
                                    contact@agrogaaxy.com
                                </a>
                            </p>
                            <p>
                                <span className="text-white/60">Phone: </span>
                                <a href="tel:+1234567890" className="hover:text-accent">
                                    (123) 456-7890
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};