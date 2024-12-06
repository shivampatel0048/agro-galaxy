export const Footer = () => {
    return (
        <footer className="bg-green-900 text-white py-12">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* Logo & Contact Section */}
                    <div>
                        <h2 className="text-2xl font-bold">AgroGalaxy</h2>
                        <p className="mt-4">
                            <a href="tel:+1234567890" className="block hover:underline">
                                +123 (0) 456-7890
                            </a>
                            <a href="mailto:contact@agrogalaxy.com" className="block hover:underline">
                                contact@agrogalaxy.com
                            </a>
                            <span className="block mt-2">
                                123 Farm Road, Harvest Valley, CA 95123
                            </span>
                        </p>
                    </div>

                    {/* About Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">About</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:underline">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Our Story
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Sustainability
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:underline">
                                    FAQs
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Book a Consultation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
                        <p className="text-sm text-gray-300 mb-4">
                            Subscribe to receive updates, news, and offers.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Your Email Address"
                                className="flex-1 px-4 py-2 text-gray-800 rounded-md focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800"
                            >
                                Subscribe
                            </button>
                        </form>
                        <div className="mt-4 flex space-x-4 text-gray-300">
                            <a href="#" className="hover:text-white">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="hover:text-white">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="hover:text-white">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" className="hover:text-white">
                                <i className="fab fa-pinterest"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-600 pt-6 text-center text-sm text-gray-400">
                    <p>
                        &copy; {new Date().getFullYear()} Powered by AgroGalaxy. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};
