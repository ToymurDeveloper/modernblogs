import Link from "next/link";

export const metadata = {
  title: "Terms and Conditions - Blogging Platform",
  description: "Terms and Conditions for using our blogging platform",
};

export default function TermsAndConditionsPage() {
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
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Terms and Conditions</h1>
          <p className="text-xl">Last Updated: January 12, 2026</p>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Agreement to Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to Blogging Platform. These Terms and Conditions ("Terms")
              govern your use of our website and services. By accessing or using
              our platform, you agree to be bound by these Terms. If you
              disagree with any part of these Terms, you may not access our
              service.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Please read these Terms carefully before using our platform.
            </p>
          </section>

          {/* Accounts */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Accounts and Registration
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              1.1 Account Creation
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              To use certain features of our platform, you must register for an
              account. When creating an account, you must provide accurate,
              complete, and current information. You are responsible for
              maintaining the confidentiality of your account credentials.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              1.2 Account Responsibilities
            </h3>
            <p className="text-gray-700 leading-relaxed mb-2">You agree to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Provide accurate and truthful information</li>
              <li>Keep your password secure and confidential</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Be responsible for all activities under your account</li>
              <li>Not share your account with others</li>
              <li>
                Be at least 13 years of age (or legal age in your jurisdiction)
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">
              1.3 Account Termination
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to suspend or terminate your account at any
              time, with or without notice, for violations of these Terms or for
              any other reason we deem appropriate.
            </p>
          </section>

          {/* User Content */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. User Content and Conduct
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              2.1 Content Ownership
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You retain all rights to the content you create and publish on our
              platform. By posting content, you grant us a worldwide,
              non-exclusive, royalty-free license to use, reproduce, modify,
              publish, and distribute your content on our platform.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              2.2 Content Standards
            </h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              You agree not to post content that:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Violates any laws or regulations</li>
              <li>Infringes on intellectual property rights</li>
              <li>Contains hate speech, harassment, or discrimination</li>
              <li>Promotes violence or illegal activities</li>
              <li>Contains pornographic or sexually explicit material</li>
              <li>Spreads misinformation or false information</li>
              <li>Contains malware, viruses, or harmful code</li>
              <li>Impersonates others or misrepresents your affiliation</li>
              <li>Violates privacy rights of others</li>
              <li>Is spam or unsolicited advertising</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">
              2.3 Content Moderation
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to remove, edit, or refuse to publish any
              content that violates these Terms or that we deem inappropriate.
              We are not obligated to monitor content but may do so at our
              discretion.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Intellectual Property Rights
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              3.1 Our Property
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The platform, including its design, features, functionality, and
              content (excluding user-generated content), is owned by us and
              protected by intellectual property laws. You may not copy, modify,
              distribute, or create derivative works without our express written
              permission.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              3.2 Trademarks
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our name, logo, and all related names, logos, product and service
              names, designs, and slogans are trademarks. You may not use these
              marks without our prior written permission.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              3.3 Copyright Infringement
            </h3>
            <p className="text-gray-700 leading-relaxed">
              If you believe your copyright has been infringed, please contact
              us at copyright@bloggingplatform.com with detailed information
              about the alleged infringement.
            </p>
          </section>

          {/* Prohibited Uses */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Prohibited Uses
            </h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              You may not use our platform to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Violate any applicable laws or regulations</li>
              <li>Engage in unauthorized framing or linking</li>
              <li>Upload or transmit viruses or malicious code</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the platform's operation</li>
              <li>
                Engage in any automated use of the system (bots, scrapers)
              </li>
              <li>Collect user information without consent</li>
              <li>
                Use the platform for commercial purposes without permission
              </li>
              <li>Impersonate others or create false identities</li>
              <li>Harass, abuse, or harm other users</li>
            </ul>
          </section>

          {/* Subscriptions and Payments */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Subscriptions and Payments
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              5.1 Subscription Plans
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may offer various subscription plans with different features
              and pricing. By subscribing, you agree to pay all applicable fees
              according to the billing terms in effect at the time.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              5.2 Billing and Renewal
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Subscriptions automatically renew unless canceled before the
              renewal date. You authorize us to charge your payment method for
              renewal fees.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              5.3 Refunds
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Refunds are handled on a case-by-case basis. Contact our support
              team to request a refund. We reserve the right to deny refund
              requests.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              5.4 Cancellation
            </h3>
            <p className="text-gray-700 leading-relaxed">
              You may cancel your subscription at any time through your account
              settings. Cancellation will take effect at the end of the current
              billing period.
            </p>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Disclaimers
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              6.1 "As Is" Basis
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our platform is provided on an "as is" and "as available" basis.
              We make no warranties, expressed or implied, regarding the
              operation of the platform or the information, content, or
              materials included.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              6.2 No Guarantee
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not guarantee that:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>The platform will be uninterrupted or error-free</li>
              <li>Defects will be corrected</li>
              <li>The platform is free from viruses or harmful components</li>
              <li>
                Results from using the platform will meet your requirements
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">
              6.3 User Content Disclaimer
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We are not responsible for user-generated content. Views expressed
              by users do not represent our views or values.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To the fullest extent permitted by law, we shall not be liable for
              any indirect, incidental, special, consequential, or punitive
              damages, including loss of profits, data, use, goodwill, or other
              intangible losses resulting from:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>
                Your access to or use of (or inability to use) the platform
              </li>
              <li>Any conduct or content of third parties on the platform</li>
              <li>Any content obtained from the platform</li>
              <li>Unauthorized access, use, or alteration of your content</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Our total liability shall not exceed the amount you paid us in the
              last 12 months, or $100, whichever is greater.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Indemnification
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to indemnify, defend, and hold harmless Blogging
              Platform, its affiliates, officers, directors, employees, and
              agents from any claims, liabilities, damages, losses, and
              expenses, including legal fees, arising out of or in any way
              connected with your access to or use of the platform, your
              violation of these Terms, or your violation of any rights of
              another party.
            </p>
          </section>
          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Third-Party Services and Links
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              9.1 Third-Party Links
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our platform may contain links to third-party websites or services
              that are not owned or controlled by us. We have no control over
              and assume no responsibility for the content, privacy policies, or
              practices of any third-party websites or services.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              9.2 Third-Party Integrations
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We may integrate with third-party services (such as Google OAuth,
              payment processors, analytics tools). Your use of these services
              is subject to their respective terms and conditions.
            </p>
          </section>

          {/* Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. Privacy and Data Protection
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Your use of the platform is also governed by our Privacy Policy,
              which can be found at{" "}
              <Link
                href="/privacy-policy"
                className="text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                Privacy Policy
              </Link>
              . By using our platform, you consent to the collection and use of
              your information as described in the Privacy Policy.
            </p>
          </section>

          {/* Dispute Resolution */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              11. Dispute Resolution
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              11.1 Informal Resolution
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any dispute with us, you agree to first contact us at
              support@bloggingplatform.com and attempt to resolve the dispute
              informally.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              11.2 Arbitration
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Any dispute arising from these Terms or your use of the platform
              shall be resolved through binding arbitration, rather than in
              court, except that you may assert claims in small claims court if
              they qualify.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              11.3 Class Action Waiver
            </h3>
            <p className="text-gray-700 leading-relaxed">
              You agree that disputes will be resolved on an individual basis
              and not as a class action, consolidated, or representative action.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              12. Governing Law and Jurisdiction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be governed by and construed in accordance with
              the laws of the State of California, United States, without regard
              to its conflict of law provisions. Any legal action or proceeding
              arising under these Terms will be brought exclusively in the
              courts located in San Francisco, California.
            </p>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              13. Modifications to Terms
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to modify or replace these Terms at any time
              at our sole discretion. We will provide notice of any material
              changes by:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Posting the new Terms on this page</li>
              <li>Updating the "Last Updated" date</li>
              <li>Sending an email notification (for significant changes)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Your continued use of the platform after any changes constitutes
              acceptance of the new Terms. If you do not agree to the new Terms,
              you must stop using the platform.
            </p>
          </section>

          {/* Severability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              14. Severability and Waiver
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              14.1 Severability
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              If any provision of these Terms is held to be invalid or
              unenforceable, such provision shall be struck and the remaining
              provisions shall remain in full force and effect.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              14.2 Waiver
            </h3>
            <p className="text-gray-700 leading-relaxed">
              No waiver of any term of these Terms shall be deemed a further or
              continuing waiver of such term or any other term, and our failure
              to assert any right or provision under these Terms shall not
              constitute a waiver of such right or provision.
            </p>
          </section>

          {/* Entire Agreement */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              15. Entire Agreement
            </h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms, together with our Privacy Policy and any other legal
              notices published by us on the platform, constitute the entire
              agreement between you and us regarding your use of the platform
              and supersede all prior agreements and understandings.
            </p>
          </section>

          {/* Assignment */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              16. Assignment
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You may not assign or transfer these Terms or your rights under
              them without our prior written consent. We may assign our rights
              and obligations under these Terms without restriction.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              17. Termination
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may terminate or suspend your access to the platform
              immediately, without prior notice or liability, for any reason,
              including breach of these Terms.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Upon termination:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Your right to use the platform will immediately cease</li>
              <li>You must cease all use of the platform</li>
              <li>
                All provisions of these Terms that should survive termination
                shall survive
              </li>
              <li>We may delete your account and content at our discretion</li>
            </ul>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              18. User Responsibilities
            </h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              As a user, you are responsible for:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Ensuring your content complies with all applicable laws</li>
              <li>
                Obtaining necessary permissions and licenses for content you
                publish
              </li>
              <li>Maintaining appropriate backups of your content</li>
              <li>Securing your account credentials</li>
              <li>Using the platform in a lawful and ethical manner</li>
              <li>Reporting any violations of these Terms</li>
              <li>Ensuring your device and internet connection are secure</li>
            </ul>
          </section>

          {/* Force Majeure */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              19. Force Majeure
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We shall not be liable for any failure or delay in performance due
              to circumstances beyond our reasonable control, including acts of
              God, war, terrorism, riots, embargoes, acts of civil or military
              authorities, fire, floods, accidents, network infrastructure
              failures, strikes, or shortages of transportation facilities,
              fuel, energy, labor, or materials.
            </p>
          </section>

          {/* Export Compliance */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              20. Export Compliance
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to comply with all applicable export and import control
              laws and regulations. You represent that you are not located in,
              under the control of, or a national or resident of any country to
              which export is prohibited.
            </p>
          </section>

          {/* Feedback */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              21. Feedback and Suggestions
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Any feedback, comments, or suggestions you provide regarding the
              platform shall become our exclusive property. We may use such
              feedback without any obligation to compensate you and without any
              restriction or limitation.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              22. Contact Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="bg-indigo-50 p-6 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> legal@bloggingplatform.com
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

          {/* Acknowledgment */}
          <section className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Acknowledgment
            </h2>
            <p className="text-gray-700 leading-relaxed">
              BY USING OUR PLATFORM, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE
              TERMS AND CONDITIONS, UNDERSTAND THEM, AND AGREE TO BE BOUND BY
              THEM. IF YOU DO NOT AGREE TO THESE TERMS, YOU MUST NOT USE OUR
              PLATFORM.
            </p>
          </section>
        </div>

        {/* Navigation Links */}
        <div className="mt-8 text-center space-x-4">
          <Link
            href="/privacy"
            className="text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            ← View Privacy Policy
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            href="/contact"
            className="text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            Contact Us →
          </Link>
        </div>
      </main>
    </div>
  );
}
