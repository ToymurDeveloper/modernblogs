import Link from "next/link";

export const metadata = {
  title: "About Us - Blogging Platform",
  description:
    "Learn more about our mission, vision, and the team behind our blogging platform",
};

export default function AboutPage() {
  const values = [
    {
      title: "Quality First",
      description:
        "We prioritize quality content and user experience above all else.",
      icon: "⭐",
    },
    {
      title: "Innovation",
      description:
        "Constantly evolving with the latest technologies and best practices.",
      icon: "🚀",
    },
    {
      title: "Community",
      description: "Building a supportive community of writers and readers.",
      icon: "🤝",
    },
    {
      title: "Transparency",
      description: "Open and honest communication with our users and partners.",
      icon: "🔍",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Empowering writers and content creators to share their stories with
            the world
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                We're on a mission to make quality blogging accessible to
                everyone. Whether you're a seasoned writer or just starting out,
                our platform provides the tools and support you need to succeed.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Founded in 2024, we've grown from a simple idea into a
                comprehensive blogging platform serving thousands of content
                creators worldwide.
              </p>
              <p className="text-lg text-gray-700">
                Our commitment is to continuously innovate and provide the best
                experience for both writers and readers.
              </p>
            </div>
            <div className="bg-indigo-100 rounded-lg p-8 text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-700">
                To become the world's leading platform for authentic,
                high-quality content creation, fostering a global community of
                passionate writers and engaged readers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="pt-6 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">10K+</div>
              <div className="text-lg">Active Bloggers</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50K+</div>
              <div className="text-lg">Published Articles</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">1M+</div>
              <div className="text-lg">Monthly Readers</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">99%</div>
              <div className="text-lg">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Join Our Community
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start your blogging journey with us today
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/register"
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
