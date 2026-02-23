import Navbar from "@/components/layout/Navbar";

export const metadata = {
    title: "Privacy Policy - Daril",
    description: "Privacy Policy for daril.id",
};

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-[#FAFAFA]">
            <Navbar />

            <section className="pt-32 pb-24 px-4 max-w-4xl mx-auto">
                <div className="bg-white p-8 md:p-12 rounded-3xl border border-black/5 shadow-sm">
                    <h1 className="text-4xl font-serif font-black mb-6">Privacy Policy</h1>
                    <p className="text-black/60 mb-8">Last updated: February 2026</p>

                    <div className="space-y-6 text-black/80 leading-relaxed">
                        <p>
                            Welcome to <strong>daril.id</strong>. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our website (the "Site"). We are committed to protecting your privacy and complying with all relevant data protection laws.
                        </p>

                        <h2 className="text-2xl font-bold font-serif text-black mt-10">1. Personal Information We Collect</h2>
                        <p>
                            When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as "Device Information".
                        </p>
                        <p>We collect Device Information using the following technologies:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Cookies</strong> are data files that are placed on your device or computer and often include an anonymous unique identifier.</li>
                            <li><strong>Log files</strong> track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.</li>
                            <li><strong>Web beacons, tags, and pixels</strong> are electronic files used to record information about how you browse the Site.</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-serif text-black mt-10">2. Google AdSense & Third-Party Vendors</h2>
                        <p>
                            We use third-party advertising companies, including Google, to serve ads when you visit our website. These companies may use information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</li>
                            <li>Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
                            <li>Users may opt out of personalized advertising by visiting Google's <a href="https://myadcenter.google.com/" className="text-indigo-600 hover:underline" target="_blank" rel="noreferrer">Ads Settings</a>.</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-serif text-black mt-10">3. How Do We Use Your Personal Information?</h2>
                        <p>
                            We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).
                        </p>

                        <h2 className="text-2xl font-bold font-serif text-black mt-10">4. Sharing Your Personal Information</h2>
                        <p>
                            We share your Personal Information with third parties to help us use your Personal Information, as described above. We use Google Analytics to help us understand how our customers use the Site. You can read more about how Google uses your Personal Information here: <a href="https://www.google.com/intl/en/policies/privacy/" className="text-indigo-600 hover:underline" target="_blank" rel="noreferrer">https://www.google.com/intl/en/policies/privacy/</a>. You can also opt-out of Google Analytics here: <a href="https://tools.google.com/dlpage/gaoptout" className="text-indigo-600 hover:underline" target="_blank" rel="noreferrer">https://tools.google.com/dlpage/gaoptout</a>.
                        </p>

                        <h2 className="text-2xl font-bold font-serif text-black mt-10">5. Do Not Track</h2>
                        <p>
                            Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser.
                        </p>

                        <h2 className="text-2xl font-bold font-serif text-black mt-10">6. Changes</h2>
                        <p>
                            We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
                        </p>

                        <h2 className="text-2xl font-bold font-serif text-black mt-10">7. Contact Us</h2>
                        <p>
                            For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at:
                        </p>
                        <p className="font-bold text-black mt-4">
                            Daril Pratomo<br />
                            darilpsr@gmail.com
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
