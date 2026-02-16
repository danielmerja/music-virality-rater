import Link from "next/link";

export const metadata = {
  title: "Terms of Service — Soundcheck",
};

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-bold tracking-tight">Terms of Service</h1>
      <p className="mt-1 text-xs text-muted-foreground">
        Last updated: February 16, 2026
      </p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using Soundcheck, you agree to be bound by these
            Terms of Service. If you do not agree, please do not use the
            service.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            2. Account Responsibilities
          </h2>
          <p>
            You are responsible for maintaining the security of your account.
            You must provide accurate information when signing up and must not
            share your credentials. You are liable for all activity that occurs
            under your account.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            3. Content Ownership
          </h2>
          <p>
            You retain all rights to audio tracks you upload to Soundcheck. By
            uploading, you grant us a limited, non-exclusive license to store,
            process, and stream your content solely for the purpose of operating
            the rating service. You represent that you have the right to upload
            any content you submit.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            4. Acceptable Use
          </h2>
          <p>You agree not to:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Upload content you do not own or have rights to</li>
            <li>
              Submit abusive, misleading, or spam ratings
            </li>
            <li>
              Attempt to manipulate the rating or credit system
            </li>
            <li>
              Use automated tools to interact with the service without
              authorization
            </li>
            <li>Harass other users or upload offensive content</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            5. Credit System
          </h2>
          <p>
            Credits are a virtual currency within Soundcheck used to submit
            tracks for rating. Credits have no monetary value and cannot be
            exchanged for cash. We reserve the right to modify credit earning
            rates, costs, and packages at any time.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            6. Ratings &amp; Feedback
          </h2>
          <p>
            Ratings and AI-generated insights are provided for informational
            purposes only. They represent subjective opinions and automated
            analysis, not guarantees of commercial success. Soundcheck is not
            responsible for decisions you make based on ratings or insights.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            7. Limitation of Liability
          </h2>
          <p>
            Soundcheck is provided &ldquo;as is&rdquo; without warranties of
            any kind. To the fullest extent permitted by law, we shall not be
            liable for any indirect, incidental, special, or consequential
            damages arising from your use of the service, including loss of
            data, revenue, or profits.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            8. Termination
          </h2>
          <p>
            We may suspend or terminate your account at our discretion if you
            violate these terms. Upon termination, your right to use the service
            ceases immediately. We may delete your data, including uploaded
            tracks, after termination.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            9. Changes to These Terms
          </h2>
          <p>
            We may update these Terms of Service at any time. Changes will be
            posted on this page with an updated revision date. Continued use of
            Soundcheck after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            10. Contact
          </h2>
          <p>
            If you have questions about these Terms, please reach out via the
            contact information on our website.
          </p>
        </section>
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/"
          className="text-xs text-muted-foreground underline hover:text-foreground"
        >
          &larr; Back to home
        </Link>
      </div>
    </div>
  );
}
