import Link from "next/link";

export const metadata = {
  title: "Privacy Policy - Blogging Platform",
  description:
    "Privacy Policy and data protection information for our blogging platform",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              Blogging Platform
            </Link>
            <nav className="flex gap-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link
                href="/services"
                className="text-gray-600 hover:text-gray-900"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-gray-900"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl">Last Updated: January 12, 2026</p>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to Blogging Platform ("we," "our," or "us"). We are
              committed to protecting your personal information and your right
              to privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our
              website and use our services.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Please read this privacy policy carefully. If you do not agree
              with the terms of this privacy policy, please do not access the
              site.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Information We Collect
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">
              1.1 Personal Information
            </h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              We collect personal information that you voluntarily provide to us
              when you:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Register for an account</li>
              <li>Create or publish blog content</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact us for support</li>
              <li>Participate in surveys or promotions</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              This information may include:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>
                Name and contact information (email address, phone number)
              </li>
              <li>Account credentials (username, password)</li>
              <li>Profile information (bio, profile picture)</li>
              <li>
                Payment information (processed securely by third-party
                providers)
              </li>
              <li>Content you create and publish</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
              1.2 Automatically Collected Information
            </h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              When you visit our website, we automatically collect certain
              information about your device, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>IP address and location data</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Referring URLs</li>
              <li>Pages viewed and time spent on pages</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
              1.3 Third-Party Information
            </h3>
            <p className="text-gray-700 leading-relaxed">
              If you choose to register or log in using a third-party account
              (such as Google), we may receive information from that service,
              including your name, email address, and profile picture.
            </p>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Creating and managing your account</li>
              <li>Providing, operating, and maintaining our services</li>
              <li>Processing your transactions and managing subscriptions</li>
              <li>
                Sending administrative information, updates, and security alerts
              </li>
              <li>
                Responding to your comments, questions, and support requests
              </li>
              <li>
                Personalizing your experience and delivering relevant content
              </li>
              <li>Improving our website and services</li>
              <li>
                Detecting and preventing fraud, abuse, and security incidents
              </li>
              <li>Analyzing usage patterns and trends</li>
              <li>Sending marketing communications (with your consent)</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. How We Share Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may share your information in the following situations:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              3.1 With Your Consent
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may share your information when you give us explicit permission
              to do so.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              3.2 Service Providers
            </h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              We may share your information with third-party service providers
              who perform services on our behalf, such as:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Cloud hosting providers</li>
              <li>Payment processors</li>
              <li>Email service providers</li>
              <li>Analytics providers</li>
              <li>Customer support tools</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">
              3.3 Business Transfers
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              In connection with any merger, sale of company assets, financing,
              or acquisition of all or a portion of our business.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              3.4 Legal Requirements
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may disclose your information if required to do so by law or in
              response to valid requests by public authorities.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              3.5 Public Information
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Content you publish on our platform (blog posts, comments, profile
              information) is publicly accessible and may be viewed, shared, and
              indexed by search engines.
            </p>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to track activity
              on our service and store certain information. You can instruct
              your browser to refuse all cookies or to indicate when a cookie is
              being sent. However, if you do not accept cookies, you may not be
              able to use some portions of our service.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Types of cookies we use:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-2">
              <li>
                <strong>Essential Cookies:</strong> Required for the website to
                function properly
              </li>
              <li>
                <strong>Performance Cookies:</strong> Help us understand how
                visitors interact with our website
              </li>
              <li>
                <strong>Functionality Cookies:</strong> Remember your
                preferences and settings
              </li>
              <li>
                <strong>Marketing Cookies:</strong> Track your activity to
                deliver relevant advertisements
              </li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Data Security
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement appropriate technical and organizational security
              measures to protect your personal information. These include:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication</li>
              <li>Secure data storage and backup procedures</li>
              <li>Employee training on data protection</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              However, no method of transmission over the Internet or electronic
              storage is 100% secure. While we strive to use commercially
              acceptable means to protect your information, we cannot guarantee
              its absolute security.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Data Retention
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your personal information for as long as necessary to
              fulfill the purposes outlined in this privacy policy, unless a
              longer retention period is required or permitted by law. When we
              no longer need your information, we will securely delete or
              anonymize it.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Your Privacy Rights
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Depending on your location, you may have the following rights
              regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>
                <strong>Access:</strong> Request a copy of your personal
                information
              </li>
              <li>
                <strong>Correction:</strong> Request correction of inaccurate or
                incomplete information
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal
                information
              </li>
              <li>
                <strong>Portability:</strong> Request transfer of your data to
                another service
              </li>
              <li>
                <strong>Objection:</strong> Object to processing of your
                personal information
              </li>
              <li>
                <strong>Restriction:</strong> Request restriction of processing
              </li>
              <li>
                <strong>Withdraw Consent:</strong> Withdraw consent where
                processing is based on consent
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              To exercise these rights, please contact us at
              privacy@bloggingplatform.com. We will respond to your request
              within 30 days.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Children's Privacy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our service is not intended for children under the age of 13. We
              do not knowingly collect personally identifiable information from
              children under 13. If you are a parent or guardian and believe
              your child has provided us with personal information, please
              contact us, and we will delete such information.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Third-Party Links
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our service may contain links to third-party websites that are not
              operated by us. We have no control over and assume no
              responsibility for the content, privacy policies, or practices of
              any third-party sites or services. We encourage you to review the
              privacy policy of every site you visit.
            </p>
          </section>

          {/* International Data Transfers */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. International Data Transfers
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Your information may be transferred to and maintained on computers
              located outside of your state, province, country, or other
              governmental jurisdiction where data protection laws may differ.
              By using our service, you consent to such transfers.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              11. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Last Updated" date. You are advised to review
              this Privacy Policy periodically for any changes. Changes are
              effective when posted on this page.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              12. Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please
              contact us:
            </p>
            <div className="bg-indigo-50 p-6 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> privacy@bloggingplatform.com
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Address:</strong> 123 Blog Street, San Francisco, CA
                94102, United States
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
            </div>
          </section>
        </div>

        {/* Navigation Links */}
        <div className="mt-8 text-center">
          <Link
            href="/terms-and-conditions"
            className="text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            View Terms and Conditions →
          </Link>
        </div>
      </main>
    </div>
  );
}
