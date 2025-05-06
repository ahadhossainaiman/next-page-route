import { cn } from '@lib/utils';
import React from 'react';

interface IProps {
  className?: string;
}

const PrivacyPolicySection: React.FC<IProps> = ({ className }) => {
  return (
    <section className={cn('privacy_policy_section', className)}>
      <div className="container">
        <p className="font-semibold text-xl text-[var(--color-primary)]">
          At Billion Markets, we value your privacy and are committed to protecting your personal information. This
          Privacy Policy outlines how we collect, use, and safeguard your data when you access or use our platform. By
          using our services, you agree to the practices outlined in this policy.
        </p>
        <div className="mt-4">
          <p className="font-semibold text-[var(--color-primary)]">1. Information We Collect</p>
          <ul className="list-disc list-inside">
            <li>
              <strong>Personal Identification Information:</strong> Name, email address, phone number, and other contact
              details when you create an account or communicate with us.
            </li>
            <li>
              <strong>Financial Information:</strong> Data related to your transactions, investments, and account
              activity, such as payment details and transaction history.
            </li>
            <li>
              <strong>Device and Usage Information:</strong> Technical information about your device, including IP
              address, browser type, operating system, and usage data.
            </li>
            <li>
              <strong>Cookies:</strong> We use cookies to enhance your experience, remember preferences, and track site
              usage. You can manage cookies through your browser settings.
            </li>
          </ul>
        </div>
        <div className="mt-4">
          <p className="font-semibold text-[var(--color-primary)]">2. How We Use Your Information</p>
          <ul className="list-disc list-inside">
            <li>
              To process transactions, manage investments, and facilitate buying, selling, and trading of crypto assets.
            </li>
            <li>To provide customer support and respond to inquiries.</li>
            <li>To send promotional materials, updates, and newsletters (opt-out available).</li>
            <li>To protect accounts from unauthorized access, fraud, and malicious activities.</li>
            <li>To improve and customize the Billion Markets platform.</li>
          </ul>
        </div>
        <div className="mt-4">
          <p className="font-semibold text-[var(--color-primary)]">3. How We Protect Your Information</p>
          <p>
            We use industry-standard encryption technologies, secure servers, and continuous monitoring to prevent
            unauthorized access, disclosure, or alteration of your data.
          </p>
        </div>
        <div className="mt-4">
          <p className="font-semibold text-[var(--color-primary)]">4. Sharing Your Information</p>
          <ul className="list-disc list-inside">
            <li>
              <strong>Service Providers:</strong> We may share your data with trusted third-party providers for services
              like payments and hosting.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose data to comply with legal obligations or government
              requests.
            </li>
            <li>
              <strong>Business Transfers:</strong> In case of a merger or acquisition, your data may be transferred.
            </li>
          </ul>
        </div>
        <div className="mt-4">
          <p className="font-semibold text-[var(--color-primary)]">5. Your Rights and Choices</p>
          <ul className="list-disc list-inside">
            <li>You can access and update your personal data through your account.</li>
            <li>You can request account deletion, subject to legal data retention requirements.</li>
            <li>You can opt out of marketing emails by following the unsubscribe link.</li>
          </ul>
        </div>
        <div className="mt-4">
          <p className="font-semibold text-[var(--color-primary)]">6. Cookies and Tracking Technologies</p>
          <p>We use cookies to personalize your experience. Manage cookie preferences through your browser settings.</p>
        </div>
        <div className="mt-4">
          <p className="font-semibold text-[var(--color-primary)]">7. Third-Party Links</p>
          <p>Our platform may contain links to external sites. We are not responsible for their privacy practices.</p>
        </div>
        <div className="mt-4">
          <p className="font-semibold text-[var(--color-primary)]">8. Data Retention</p>
          <p>
            We retain your data as long as necessary for operational, legal, or regulatory purposes, and securely
            dispose of it when no longer needed.
          </p>
        </div>
        <div className="mt-4">
          <p className="font-semibold text-[var(--color-primary)]">9. Changes to This Privacy Policy</p>
          <p>
            We may update this policy periodically. The revised version will be posted on our platform with an updated
            effective date.
          </p>
        </div>
        <div className="mt-4">
          <p className="font-semibold text-[var(--color-primary)]">10. Contact Us</p>
          <p>If you have questions about our privacy practices, please contact us.</p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicySection;
