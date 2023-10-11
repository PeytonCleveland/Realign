import { Page } from "@/components";

const TermsOfService = () => {
  return (
    <Page>
      <div className="w-full bg-gray-50">
        <div className="mb-6 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 w-full">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Realign Terms of Service
          </h1>
        </div>
      </div>
      <div className="flex flex-col w-full gap-6 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col w-full gap-2">
          <h2 className="text-lg font-semibold text-gray-900">
            1. Introduction
          </h2>
          <p className="text-sm font-light text-gray-600">
            <strong>Platform Overview:</strong> Realign is Omni Federal&apos;s
            exclusive platform, dedicated to collecting SFT/RLHF data to bolster
            the development of advanced language models.
          </p>
          <p className="text-sm font-light text-gray-600">
            <strong>Acceptance:</strong> By accessing or using Realign, you are
            entering a binding agreement based on these terms.
          </p>
        </div>

        <div className="flex flex-col w-full gap-2">
          <h2 className="text-lg font-semibold text-gray-900">2. Scope</h2>
          <p className="text-sm font-light text-gray-600">
            <strong>User Limitation:</strong> Only Omni Federal employees and
            individuals specifically authorized may access and use Realign.
          </p>
          <p className="text-sm font-light text-gray-600">
            <strong>Coverage:</strong> These terms dictate the use,
            responsibilities, and potential consequences for all users of the
            platform.
          </p>
        </div>

        <div className="flex flex-col w-full gap-2">
          <h2 className="text-lg font-semibold text-gray-900">3. Purpose</h2>
          <p className="text-sm font-light text-gray-600">
            <strong>Data Collection Goal:</strong> The core aim of Realign is to
            amass high-quality SFT/RLHF data, serving as a foundational element
            in the creation and refinement of our language models.
          </p>
          <p className="text-sm font-light text-gray-600">
            <strong>Integrity:</strong> Users should approach the platform with
            honesty and the intent to provide authentic data.
          </p>
        </div>

        <div className="flex flex-col w-full gap-2">
          <h2 className="text-lg font-semibold text-gray-900">
            4. Data Ownership
          </h2>
          <p className="text-sm font-light text-gray-600">
            <strong>Rights:</strong> All data submitted via Realign is solely
            owned by Omni Federal.
          </p>
          <p className="text-sm font-light text-gray-600">
            <strong>Intellectual Property:</strong> Any inventions, innovations,
            or intellectual property derived from the data remain the exclusive
            property of Omni Federal. Contributors or users do not retain any
            rights to these.
          </p>
        </div>

        <div className="flex flex-col w-full gap-2">
          <h2 className="text-lg font-semibold text-gray-900">
            5. Data Privacy
          </h2>
          <p className="text-sm font-light text-gray-600">
            <strong>Protection Standards:</strong> Omni Federal implements
            robust measures to safeguard the privacy and confidentiality of all
            data collected.
          </p>
          <p className="text-sm font-light text-gray-600">
            <strong>Usage Limitation:</strong> The data will be exclusively used
            for enhancing our language models and won&apos;t be distributed or
            shared with third parties without proper authorization.
          </p>
        </div>

        <div className="flex flex-col w-full gap-2">
          <h2 className="text-lg font-semibold text-gray-900">
            6. Prohibited Activities
          </h2>
          <p className="text-sm font-light text-gray-600">
            <strong>Unauthorized Sharing:</strong> Users are prohibited from
            sharing their access rights or credentials with any unauthorized
            individual.
          </p>
          <p className="text-sm font-light text-gray-600">
            <strong>Misinformation</strong>: Supplying intentionally misleading,
            inaccurate, or false data is strictly forbidden.
          </p>
          <p className="text-sm font-light text-gray-600">
            <strong>Security Threats:</strong> Any attempts to compromise,
            disrupt, or exploit vulnerabilities in the platform will result in
            immediate action and potential legal consequences.
          </p>
        </div>

        <div className="flex flex-col w-full gap-2">
          <h2 className="text-lg font-semibold text-gray-900">
            7. Limitation of Liability
          </h2>
          <p className="text-sm font-light text-gray-600">
            <strong>No Responsibility for Losses:</strong> Omni Federal is not
            liable for any direct or indirect damages, losses, or consequences
            stemming from the use or misuse of Realign.
          </p>
          <p className="text-sm font-light text-gray-600">
            <strong>Security Limitation:</strong> While we prioritize data
            security, Omni Federal cannot guarantee complete immunity from all
            potential breaches or cyber threats.
          </p>
        </div>

        <div className="flex flex-col w-full gap-2">
          <h2 className="text-lg font-semibold text-gray-900">
            8. Modifications
          </h2>
          <p className="text-sm font-light text-gray-600">
            <strong>Updates:</strong> Omni Federal retains the right to revise,
            update, or modify these terms as required.
          </p>
          <p className="text-sm font-light text-gray-600">
            <strong>User Responsibility:</strong> Users are encouraged to
            regularly review the terms to stay updated with any changes.
          </p>
        </div>

        <div className="flex flex-col w-full gap-2">
          <h2 className="text-lg font-semibold text-gray-900">
            9. Termination
          </h2>
          <p className="text-sm font-light text-gray-600">
            <strong>Breach Consequences:</strong> Violating any stipulations in
            these terms may result in the termination of access to Realign and
            further consequences as deemed necessary.
          </p>
          <p className="text-sm font-light text-gray-600">
            <strong>Discretionary Rights:</strong> Omni Federal holds the
            discretion to revoke platform access for any individual without the
            need for detailed justification.
          </p>
        </div>

        <div className="flex flex-col w-full gap-2">
          <h2 className="text-lg font-semibold text-gray-900">10. Contact</h2>
          <p className="text-sm font-light text-gray-600">
            <strong>Queries & Clarifications:</strong> For any concerns,
            questions, or further information regarding these terms, users can
            approach our AI/ML team.
          </p>
          <p className="text-sm font-light text-gray-600">
            <strong>Communication Channel:</strong> Reach out to us at
            peyton.cleveland@omnifederal.com for all Realign-related
            correspondence.
          </p>
        </div>
      </div>
    </Page>
  );
};

export default TermsOfService;
