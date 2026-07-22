import { useState } from 'react';
import { Calculator, Home, Building2, Key, Sparkles, Package, GraduationCap } from 'lucide-react';
import {
  SupabaseConfigurationError,
  isSupabaseConfigured,
  missingSupabaseConfigKeys,
  submitQuoteRequest,
} from '../lib/supabase';

interface QuoteFormData {
  serviceType: string;
  propertySize: string;
  bedrooms: string;
  bathrooms: string;
  frequency: string;
  extras: string[];
  name: string;
  email: string;
  phone: string;
}

const serviceTypes = [
  { id: 'residential', name: 'Residential', icon: Home },
  { id: 'commercial', name: 'Commercial & Office', icon: Building2 },
  { id: 'airbnb', name: 'Airbnb & Short-Term Rental', icon: Key },
  { id: 'turnovers', name: 'Turnovers - Apartments & Student Housing', icon: GraduationCap },
  { id: 'moveinout', name: 'Move In/Out', icon: Package },
  { id: 'deepcleaning', name: 'Deep Cleaning Services', icon: Sparkles },
];

const propertySizes = [
  { id: 'small', name: 'Small (< 1000 sq ft)', multiplier: 1 },
  { id: 'medium', name: 'Medium (1000-2000 sq ft)', multiplier: 1.5 },
  { id: 'large', name: 'Large (2000-3000 sq ft)', multiplier: 2 },
  { id: 'xlarge', name: 'Extra Large (3000+ sq ft)', multiplier: 2.5 },
];

const frequencies = [
  { id: 'onetime', name: 'One-Time', discount: 0 },
  { id: 'weekly', name: 'Weekly', discount: 0.15 },
  { id: 'biweekly', name: 'Bi-Weekly', discount: 0.10 },
  { id: 'monthly', name: 'Monthly', discount: 0.05 },
];

const extras = [
  { id: 'windows', name: 'Interior Windows', price: 50 },
  { id: 'oven', name: 'Oven Deep Clean', price: 40 },
  { id: 'fridge', name: 'Refrigerator Clean', price: 40 },
  { id: 'laundry', name: 'Laundry', price: 30 },
  { id: 'dishes', name: 'Dishes', price: 25 },
];

export default function QuoteCalculator() {
  const [formData, setFormData] = useState<QuoteFormData>({
    serviceType: '',
    propertySize: '',
    bedrooms: '',
    bathrooms: '',
    frequency: '',
    extras: [],
    name: '',
    email: '',
    phone: '',
  });

  const [showQuote, setShowQuote] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const isSupabaseAvailable = isSupabaseConfigured;
  const contactPhoneNumber = '(123) 456-7890';
  const contactPhoneHref = 'tel:+1234567890';
  const contactEmailAddress = 'hello@selfmaid.com';
  const contactEmailHref = 'mailto:hello@selfmaid.com';

  const calculatePrice = () => {
    if (!formData.serviceType || !formData.propertySize || !formData.frequency) {
      return 0;
    }

    let basePrice = 100;

    // Service type pricing
    const servicePrices: Record<string, number> = {
      residential: 100,
      commercial: 150,
      airbnb: 120,
      turnovers: 130,
      moveinout: 200,
      deepcleaning: 180,
    };

    basePrice = servicePrices[formData.serviceType] || 100;

    // Property size multiplier
    const sizeMultiplier = propertySizes.find(s => s.id === formData.propertySize)?.multiplier || 1;
    basePrice *= sizeMultiplier;

    // Bedrooms and bathrooms
    const bedroomCount = parseInt(formData.bedrooms) || 0;
    const bathroomCount = parseInt(formData.bathrooms) || 0;
    basePrice += bedroomCount * 20 + bathroomCount * 15;

    // Extras
    const extrasTotal = formData.extras.reduce((sum, extraId) => {
      const extra = extras.find(e => e.id === extraId);
      return sum + (extra?.price || 0);
    }, 0);

    basePrice += extrasTotal;

    // Frequency discount
    const frequencyDiscount = frequencies.find(f => f.id === formData.frequency)?.discount || 0;
    basePrice *= (1 - frequencyDiscount);

    return Math.round(basePrice);
  };

  const missingConfigList = missingSupabaseConfigKeys.join(', ');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await submitQuoteRequest({
        service_type: formData.serviceType,
        property_size: formData.propertySize,
        bedrooms: parseInt(formData.bedrooms) || 0,
        bathrooms: parseInt(formData.bathrooms) || 0,
        frequency: formData.frequency,
        extras: formData.extras,
        estimated_price: estimatedPrice,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
      });

      setShowQuote(true);
    } catch (error) {
      console.error('Error submitting quote:', error);
      if (error instanceof SupabaseConfigurationError) {
        setSubmitError(
          `Online quote requests are currently unavailable. Please call ${contactPhoneNumber} or email ${contactEmailAddress} to book your service.`
        );
      } else {
        setSubmitError('Failed to submit quote request. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      serviceType: '',
      propertySize: '',
      bedrooms: '',
      bathrooms: '',
      frequency: '',
      extras: [],
      name: '',
      email: '',
      phone: '',
    });
    setShowQuote(false);
    setSubmitError(null);
  };

  const toggleExtra = (extraId: string) => {
    setFormData(prev => ({
      ...prev,
      extras: prev.extras.includes(extraId)
        ? prev.extras.filter(id => id !== extraId)
        : [...prev.extras, extraId]
    }));
  };

  const estimatedPrice = calculatePrice();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border-2 border-emerald-100 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
          <div className="flex items-center space-x-3 mb-2">
            <Calculator className="w-8 h-8" />
            <h2 className="text-3xl font-bold">Get Your Instant Quote</h2>
          </div>
          <p className="text-emerald-50">Calculate your cleaning service cost in seconds</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Service Type Selection */}
          <div>
            <label className="block text-lg font-bold text-gray-900 mb-4">Select Service Type</label>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {serviceTypes.map((service) => {
                const Icon = service.icon;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, serviceType: service.id })}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      formData.serviceType === service.id
                        ? 'border-emerald-600 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mb-2 ${formData.serviceType === service.id ? 'text-emerald-600' : 'text-gray-400'}`} />
                    <div className="font-semibold text-gray-900 text-sm">{service.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Property Size */}
          <div>
            <label className="block text-lg font-bold text-gray-900 mb-4">Property Size</label>
            <div className="grid sm:grid-cols-2 gap-4">
              {propertySizes.map((size) => (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, propertySize: size.id })}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    formData.propertySize === size.id
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900">{size.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Bedrooms and Bathrooms */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="bedrooms" className="block text-lg font-bold text-gray-900 mb-3">Bedrooms</label>
              <input
                type="number"
                id="bedrooms"
                min="0"
                max="10"
                value={formData.bedrooms}
                onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-600 focus:outline-none transition-colors text-lg"
                placeholder="0"
              />
            </div>
            <div>
              <label htmlFor="bathrooms" className="block text-lg font-bold text-gray-900 mb-3">Bathrooms</label>
              <input
                type="number"
                id="bathrooms"
                min="0"
                max="10"
                value={formData.bathrooms}
                onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-600 focus:outline-none transition-colors text-lg"
                placeholder="0"
              />
            </div>
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-lg font-bold text-gray-900 mb-4">Cleaning Frequency</label>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {frequencies.map((freq) => (
                <button
                  key={freq.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, frequency: freq.id })}
                  className={`p-4 rounded-xl border-2 transition-all text-center ${
                    formData.frequency === freq.id
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900">{freq.name}</div>
                  {freq.discount > 0 && (
                    <div className="text-xs text-emerald-600 font-semibold mt-1">
                      Save {freq.discount * 100}%
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Extras */}
          <div>
            <label className="block text-lg font-bold text-gray-900 mb-4">Add-On Services</label>
            <div className="grid sm:grid-cols-2 gap-4">
              {extras.map((extra) => (
                <button
                  key={extra.id}
                  type="button"
                  onClick={() => toggleExtra(extra.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left flex justify-between items-center ${
                    formData.extras.includes(extra.id)
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <span className="font-semibold text-gray-900">{extra.name}</span>
                  <span className="text-emerald-600 font-bold">+${extra.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 pt-6 border-t-2 border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Your Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">Name *</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-600 focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="calc-phone" className="block text-sm font-semibold text-gray-900 mb-2">Phone *</label>
                <input
                  type="tel"
                  id="calc-phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-600 focus:outline-none transition-colors"
                  placeholder="(123) 456-7890"
                />
              </div>
            </div>
            <div>
              <label htmlFor="calc-email" className="block text-sm font-semibold text-gray-900 mb-2">Email *</label>
              <input
                type="email"
                id="calc-email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-600 focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Price Display */}
          {estimatedPrice > 0 && (
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border-2 border-emerald-200">
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-600 mb-2">Estimated Price</div>
                <div className="text-5xl font-bold text-emerald-600 mb-2">${estimatedPrice}</div>
                <div className="text-sm text-gray-600">
                  {frequencies.find(f => f.id === formData.frequency)?.discount > 0 && (
                    <span className="text-emerald-600 font-semibold">
                      Discount applied for {frequencies.find(f => f.id === formData.frequency)?.name.toLowerCase()} service
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {submitError && (
            <div className="bg-red-50 border-2 border-red-200 text-red-700 p-4 rounded-lg">
              {submitError}
            </div>
          )}

          {/* Supabase Disabled Notice */}
          {!isSupabaseAvailable && (
            <div
              className="bg-amber-50 border-2 border-amber-200 text-amber-900 p-4 rounded-lg space-y-2"
              role="status"
              aria-live="polite"
            >
              <p className="font-semibold">
                Online quote requests are temporarily unavailable.
              </p>
              <p className="text-sm">
                {missingConfigList
                  ? `Our booking system is waiting for the following configuration: ${missingConfigList}.`
                  : 'Our booking system is currently offline.'}
              </p>
              <div className="flex flex-col gap-1 text-sm">
                <a href={contactPhoneHref} className="underline font-semibold text-amber-900">
                  Call us at {contactPhoneNumber}
                </a>
                <a href={contactEmailHref} className="underline font-semibold text-amber-900">
                  Email {contactEmailAddress}
                </a>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={
                !formData.serviceType ||
                !formData.propertySize ||
                !formData.frequency ||
                isSubmitting ||
                !isSupabaseAvailable
              }
              className="flex-1 bg-emerald-600 text-white px-8 py-4 rounded-lg hover:bg-emerald-700 transition-all font-semibold text-lg shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-emerald-600"
            >
              {isSubmitting ? 'Submitting...' : 'Request Quote'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={isSubmitting}
              className="sm:flex-none px-8 py-4 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Success Message */}
        {showQuote && (
          <div className="bg-emerald-600 text-white p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Quote Request Sent!</h3>
            <p className="text-emerald-100">We'll contact you shortly at {formData.phone} to confirm your booking.</p>
          </div>
        )}
      </div>
    </div>
  );
}
