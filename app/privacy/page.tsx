import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Soundcheck",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-1 text-xs text-muted-foreground">
        Last updated: February 16, 2026
      </p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            1. Information We Collect
          </h2>
          <p>
            When you sign in with Google, we receive your name, email address,
            and profile picture. When you upload a track, we store the audio
            file, track title, tags, and any metadata you provide. We also
            collect usage data such as ratings you submit and credits you earn or
            spend.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            2. How We Use Your Information
          </h2>
          <p>
            We use your information to operate the Soundcheck platform: to
            authenticate your account, display your tracks and ratings, manage
            credits, generate AI-powered insights on your music, and improve the
            service. We do not sell your personal data to third parties.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            3. Data Storage &amp; Security
          </h2>
          <p>
            Account and rating data is stored in a PostgreSQL database hosted by
            Neon. Uploaded audio files are stored on Vercel Blob Storage. We use
            industry-standard security measures including encrypted connections
            (HTTPS/TLS) and secure authentication via OAuth 2.0.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            4. Cookies &amp; Sessions
          </h2>
          <p>
            We use session cookies to keep you signed in. These are essential
            cookies required for the service to function and are not used for
            advertising or tracking purposes.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            5. Third-Party Services
          </h2>
          <p>
            We rely on the following third-party services to operate Soundcheck:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong className="text-foreground">Google OAuth</strong> — for
              authentication
            </li>
            <li>
              <strong className="text-foreground">Vercel</strong> — hosting and
              file storage
            </li>
            <li>
              <strong className="text-foreground">Neon</strong> — database
              hosting
            </li>
            <li>
              <strong className="text-foreground">Anthropic (Claude)</strong> —
              AI-generated track insights
            </li>
          </ul>
          <p className="mt-2">
            Each service processes data in accordance with their own privacy
            policies.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            6. Your Rights
          </h2>
          <p>
            You may request access to, correction of, or deletion of your
            personal data at any time by contacting us. When you delete your
            account, we remove your profile data and any uploaded audio files
            from our storage.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            7. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with an updated revision date. Continued use of
            Soundcheck after changes constitutes acceptance of the updated
            policy.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            8. Contact
          </h2>
          <p>
            If you have questions about this Privacy Policy, please reach out
            via the contact information on our website.
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
