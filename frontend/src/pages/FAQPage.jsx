import React, { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  Search,
  Calendar,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import FAQSchema from "../components/FAQSchema";
import SEOHead from "../components/SEOHead";
const faqData = [
  // Category 1: Booking & Reservations
  {
    category: "Booking & Reservations",
    q: "How do I check venue availability and submit an inquiry?",
    a: "You can easily check available dates using our interactive booking calendar on the home page. Once you select your date and preferred slot (Morning, Evening, or Full Day), submit the inquiry form, and our management team will reach out to confirm your slot.",
  },
  {
    category: "Booking & Reservations",
    q: "How far in advance should I book the hall?",
    a: "For weekend events, weddings, and holiday seasons, we recommend booking 3 to 6 months in advance. For corporate events, seminars, or weekday parties, 2 to 4 weeks advance booking is usually sufficient.",
  },
  {
    category: "Booking & Reservations",
    q: "Is an advance deposit required to lock in a date?",
    a: "Yes, an advance booking deposit (typically 30% to 50% of the total amount) is required along with confirmation to secure your date in our official calendar.",
  },
  {
    category: "Booking & Reservations",
    q: "What is your cancellation and refund policy?",
    a: "Cancellations made 30 days prior to the event date receive a 50% refund. Cancellations within 30 days are non-refundable; however, you can reschedule your booking to another available date within 6 months.",
  },

  // Category 2: Capacity & Layout
  {
    category: "Capacity & Facilities",
    q: "What is the maximum guest capacity of the hall?",
    a: "Our venue supports multiple seating configurations: Banquet/Seated Setup (up to 250 guests), Theater/Conference Setup (up to 400 guests), and Floating/Cocktail Reception (up to 500 guests).",
  },
  {
    category: "Capacity & Facilities",
    q: "Can I tour the venue before booking?",
    a: "Yes! We encourage site visits. You can schedule a venue walkthrough appointment by calling us or filling out the inquiry form on our dashboard.",
  },
  {
    category: "Capacity & Facilities",
    q: "Is the hall wheelchair accessible?",
    a: "Yes, the hall is 100% accessible with ground-level ramp entrances, wide doorways, and designated accessible restrooms for elderly and disabled guests.",
  },
  {
    category: "Capacity & Facilities",
    q: "Are private dressing rooms / green rooms provided?",
    a: "Yes, we provide 2 air-conditioned green rooms with private restrooms free of charge for the bride/groom or event hosts during the event slot.",
  },

  // Category 3: Amenities & Services
  {
    category: "Amenities & Catering",
    q: "Does the hall rental include sound systems and projectors?",
    a: "Yes, standard rentals include wireless microphones, podiums, and integrated ambient speakers. High-definition LED display panels, stage lighting, and professional DJ setups are available as add-on packages.",
  },
  {
    category: "Amenities & Catering",
    q: "Is generator power backup available?",
    a: "Yes, our hall features 24/7 full power backup with heavy-duty diesel generators to ensure uninterrupted lighting and air conditioning throughout your event.",
  },
  {
    category: "Amenities & Catering",
    q: "Do you offer in-house catering, or can we bring outside caterers?",
    a: "We offer both! You can select from our customizable in-house multi-cuisine menu options or bring your preferred outside caterer (subject to a nominal kitchen usage fee).",
  },
  {
    category: "Amenities & Catering",
    q: "Is alcohol permitted inside the hall?",
    a: "Alcohol is allowed only if an official temporary event liquor license is submitted to venue management prior to the event date.",
  },

  // Category 4: Pricing, Rules & Policy
  {
    category: "Pricing & Rules",
    q: "What are the standard booking time slots?",
    a: "Our standard slots are: Morning/Day Slot (8:00 AM – 4:00 PM), Evening/Night Slot (6:00 PM – 12:00 AM), or Full-Day Rental (8:00 AM – 12:00 AM).",
  },
  {
    category: "Pricing & Rules",
    q: "Can we extend our event beyond the slot timing?",
    a: "Yes, slot extensions are subject to availability and charged at an hourly overtime rate. Please notify management at least 2 hours before your slot ends.",
  },
  {
    category: "Pricing & Rules",
    q: "What is the policy regarding loud music and DJ timings?",
    a: "In compliance with local municipality noise regulation laws, outdoor music and high-decibel DJ systems must be turned off or moved indoors by 10:00 PM.",
  },
  {
    category: "Pricing & Rules",
    q: "Are there any hidden costs or cleaning fees?",
    a: "No, we maintain complete pricing transparency. All taxes, basic cleaning charges, and venue rentals are clearly line-itemed in your invoice before confirmation.",
  },
];

const FAQPage = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Sheikhpura me sabse accha marriage hall kaun sa hai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "GM Marriage Hall (GM Hall Royal Palace) Sheikhpura ka sabse bada aur luxury AC banquet hall hai, jo Station Road, Near Sheikhpura Hill par sthit hai.",
        },
      },
      {
        "@type": "Question",
        name: "GM Marriage Hall Junction station se kitni door hai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "GM Marriage Hall Sheikhpura Junction Railway Station se sirf 700 meters (5 min) ki doori par hai.",
        },
      },
    ],
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [openIndex, setOpenIndex] = useState(null);

  const categories = [
    "ALL",
    "Booking & Reservations",
    "Capacity & Facilities",
    "Amenities & Catering",
    "Pricing & Rules",
  ];

  const filteredFaqs = faqData.filter((faq) => {
    const matchesCategory =
      activeCategory === "ALL" || faq.category === activeCategory;
    const matchesSearch =
      faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Schema Injection */}
      <SEOHead
        title="Frequently Asked Questions | GM Marriage Hall Sheikhpura"
        description="GM Marriage Hall booking terms, pricing, hall capacity, and location details ke sabhi sawalon ke jawab yahan dekhein."
        canonicalUrl="https://gmmarriagehall.com/faq"
        schema={faqSchema}
      />
      <FAQSchema faqs={faqData} />

      {/* Hero Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 px-4 py-1.5 rounded-full text-rose-400 text-xs font-semibold uppercase tracking-wide mb-4">
          <Sparkles className="w-4 h-4" /> Got Questions? We've Got Answers
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
          Everything you need to know about booking our venue, slot
          availability, facilities, catering, and policies.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mt-8">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search questions (e.g., deposit, catering, DJ timings)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-xl"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-rose-600 text-white shadow-lg shadow-rose-600/20"
                  : "bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-dashed border-slate-800 text-slate-500">
            <HelpCircle className="w-10 h-10 mx-auto mb-2 text-slate-600" />
            <p className="text-sm">No matching questions found.</p>
          </div>
        ) : (
          filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-200 hover:border-slate-700"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left p-5 flex justify-between items-center gap-4 text-slate-100 font-semibold text-sm sm:text-base focus:outline-none"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-rose-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 bg-slate-950/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Support Callout Footer */}
      <div className="max-w-3xl mx-auto mt-16 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-20 bg-rose-500/10 blur-3xl rounded-full pointer-events-none" />
        <h3 className="text-lg font-bold text-white mb-2">
          Still have questions?
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mb-6">
          Can't find the answer you're looking for? Please reach out to our
          event management team.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="tel:+919876543210"
            className="bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs px-5 py-3 rounded-xl shadow-lg shadow-rose-600/20 transition-all"
          >
            Call Management
          </a>
          <a
            href="/contact"
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs px-5 py-3 rounded-xl transition-all"
          >
            Send Inquiry
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
