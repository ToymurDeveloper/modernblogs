import Link from "next/link";

export const metadata = {
  title: "Our Services - Blogging Platform",
  description:
    "Explore our range of professional blogging and content services",
};

export default function ServicesPage() {
  const services = [
    {
      title: "Content Creation",
      description:
        "Professional blog writing and content creation services tailored to your needs.",
      icon: "✍️",
      features: [
        "SEO-optimized articles",
        "Engaging blog posts",
        "Technical writing",
        "Creative content",
      ],
    },
    {
      title: "Blog Management",
      description:
        "Complete blog management and maintenance services for your platform.",
      icon: "🎯",
      features: [
        "Content scheduling",
        "Performance tracking",
        "Analytics reports",
        "Strategy planning",
      ],
    },
    {
      title: "SEO Optimization",
      description:
        "Improve your blog visibility with our comprehensive SEO services.",
      icon: "🚀",
      features: [
        "Keyword research",
        "On-page optimization",
        "Meta tag optimization",
        "Link building",
      ],
    },
    {
      title: "Social Media Marketing",
      description:
        "Amplify your blog reach through strategic social media promotion.",
      icon: "📱",
      features: [
        "Content promotion",
        "Engagement strategies",
        "Platform management",
        "Growth analytics",
      ],
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Comprehensive blogging solutions to help you create, manage, and
            grow your online presence
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-orange-500 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-2">Ready to Get Started?</h2>
          <p className="text-xl mb-6">
            Contact us today to discuss how we can help grow your article
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
