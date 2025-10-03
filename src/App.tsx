import { Sparkles, CheckCircle, Clock, Shield, Phone, Mail, MapPin, Home, Building2, Key, Package, GraduationCap } from 'lucide-react';
import QuoteCalculator from './components/QuoteCalculator';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-emerald-600" />
              <span className="text-2xl font-bold text-gray-900">Self Maid</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">Services</a>
              <a href="#quote" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">Get Quote</a>
              <a href="#why-us" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">Why Us</a>
              <a href="#contact" className="text-gray-600 hover:text-emerald-600 transition-colors font-medium">Contact</a>
              <a href="#quote" className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-lg shadow-emerald-600/30">Book Now</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Your Home,
                <span className="text-emerald-600 block">Spotlessly Clean</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Professional cleaning services that transform your space. We handle the mess, so you can focus on what matters most.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#quote" className="bg-emerald-600 text-white px-8 py-4 rounded-lg hover:bg-emerald-700 transition-all font-semibold text-lg shadow-xl shadow-emerald-600/30 hover:shadow-2xl hover:shadow-emerald-600/40 hover:-translate-y-0.5">Get a Free Quote</a>
                <a href="#services" className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-lg hover:bg-emerald-50 transition-colors font-semibold text-lg">Our Services</a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-2xl rotate-3 transform">
                <div className="absolute inset-0 rounded-2xl bg-white flex items-center justify-center -rotate-3 shadow-2xl">
                  <Sparkles className="w-48 h-48 text-emerald-600" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Comprehensive cleaning solutions tailored to your needs</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-emerald-600 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                <Home className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Residential</h3>
              <p className="text-gray-600 leading-relaxed mb-4">Keep your home consistently fresh with our scheduled cleaning services. Perfect for busy households.</p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Dusting and vacuuming</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Bathroom and kitchen cleaning</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Floor mopping and maintenance</span>
                </li>
              </ul>
            </div>

            <div className="group bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-emerald-600 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                <Building2 className="w-8 h-8 text-teal-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Commercial & Office</h3>
              <p className="text-gray-600 leading-relaxed mb-4">Professional cleaning for offices, retail spaces, and commercial properties.</p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Common areas and workspaces</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Restrooms and break rooms</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Trash removal and sanitation</span>
                </li>
              </ul>
            </div>

            <div className="group bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-emerald-600 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                <Key className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Airbnb & Short-Term Rental</h3>
              <p className="text-gray-600 leading-relaxed mb-4">Fast turnaround cleaning to keep your rental guest-ready.</p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Quick turnovers between guests</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Linen change and restocking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Quality inspection</span>
                </li>
              </ul>
            </div>

            <div className="group bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-emerald-600 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                <GraduationCap className="w-8 h-8 text-teal-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Apartments & Student Housing</h3>
              <p className="text-gray-600 leading-relaxed mb-4">Specialized turnover cleaning for apartments and student housing.</p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Move-out deep cleaning</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Make-ready services</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Inspection-ready standards</span>
                </li>
              </ul>
            </div>

            <div className="group bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-emerald-600 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                <Package className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Move In/Out</h3>
              <p className="text-gray-600 leading-relaxed mb-4">Make transitions smooth with our comprehensive move-in or move-out cleaning services.</p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Complete property cleaning</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Closet and storage areas</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Final inspection ready</span>
                </li>
              </ul>
            </div>

            <div className="group bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-emerald-600 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                <Sparkles className="w-8 h-8 text-teal-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Deep Cleaning Services</h3>
              <p className="text-gray-600 leading-relaxed mb-4">Intensive cleaning that reaches every corner. Ideal for seasonal refreshes.</p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Detailed appliance cleaning</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Baseboard and trim wiping</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Cabinet and window cleaning</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Calculator Section */}
      <section id="quote" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <QuoteCalculator />
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose Self Maid?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">We're committed to excellence in every clean</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-600/30">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Trusted Professionals</h3>
              <p className="text-gray-600 leading-relaxed">Background-checked, trained staff you can trust in your home</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-600/30">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Eco-Friendly Products</h3>
              <p className="text-gray-600 leading-relaxed">Safe, green cleaning solutions for your family and pets</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-600/30">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Flexible Scheduling</h3>
              <p className="text-gray-600 leading-relaxed">Book services that fit your schedule, not the other way around</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-600/30">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Satisfaction Guaranteed</h3>
              <p className="text-gray-600 leading-relaxed">Not happy? We'll make it right, no questions asked</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Ready for a Cleaner Home?</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Get in touch today for a free quote. We'll customize a cleaning plan that perfectly fits your needs and budget.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <a href="tel:+1234567890" className="text-gray-600 hover:text-emerald-600 transition-colors">(123) 456-7890</a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a href="mailto:hello@selfmaid.com" className="text-gray-600 hover:text-emerald-600 transition-colors">hello@selfmaid.com</a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Service Area</h3>
                    <p className="text-gray-600">Serving the Greater Metro Area</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border-2 border-emerald-100">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-600 focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-600 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-600 focus:outline-none transition-colors"
                    placeholder="(123) 456-7890"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-600 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your cleaning needs..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white px-8 py-4 rounded-lg hover:bg-emerald-700 transition-all font-semibold shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 hover:-translate-y-0.5"
                >
                  Get Free Quote
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Sparkles className="w-8 h-8 text-emerald-400" />
              <span className="text-2xl font-bold">Self Maid</span>
            </div>
            <p className="text-gray-400">
              © 2025 Self Maid. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
