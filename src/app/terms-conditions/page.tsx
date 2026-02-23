import Navbar from "@/components/layout/Navbar";

export const metadata = {
    title: "Terms and Conditions - Daril",
    description: "Terms and Conditions for daril.id",
};

export default function TermsConditionsPage() {
    return (
        <main className="min-h-screen bg-[#FAFAFA]">
            <Navbar />

            <section className="pt-32 pb-24 px-4 max-w-4xl mx-auto">
                <div className="bg-white p-8 md:p-12 rounded-3xl border border-black/5 shadow-sm">
                    <h1 className="text-4xl font-serif font-black mb-6">Terms and Conditions</h1>
                    <p className="text-black/60 mb-8">Last updated: February 2026</p>

                    <div className="space-y-6 text-black/80 leading-relaxed">
                        <p>
                            Welcome to <strong>daril.id</strong>!
                        </p>
                        <p>
                            These terms and conditions outline the rules and regulations for the use of Daril Pratomo's Website, located at daril.id.
                        </p>
                        <p>
                            By accessing this website we assume you accept these terms and conditions. Do not continue to use daril.id if you do not agree to take all of the terms and conditions stated on this page.
                        </p>

                        <h2 className="text-2xl font-bold font-serif text-black mt-10">Cookies</h2>
                        <p>
                            We employ the use of cookies. By accessing daril.id, you agreed to use cookies in agreement with the daril.id's Privacy Policy. Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners, such as Google AdSense, may also use cookies.
                        </p>

                        <h2 className="text-2xl font-bold font-serif text-black mt-10">License</h2>
                        <p>
                            Unless otherwise stated, Daril Pratomo and/or its licensors own the intellectual property rights for all material on daril.id. All intellectual property rights are reserved. You may access this from daril.id for your own personal use subjected to restrictions set in these terms and conditions.
                        </p>
                        <p>You must not:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Republish material from daril.id</li>
                            <li>Sell, rent or sub-license material from daril.id</li>
                            <li>Reproduce, duplicate or copy material from daril.id</li>
                            <li>Redistribute content from daril.id</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-serif text-black mt-10">Hyperlinking to our Content</h2>
                        <p>
                            The following organizations may link to our Website without prior written approval:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Government agencies;</li>
                            <li>Search engines;</li>
                            <li>News organizations;</li>
                            <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses.</li>
                        </ul>

                        <h2 className="text-2xl font-bold font-serif text-black mt-10">iFrames</h2>
                        <p>
                            Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.
                        </p>

                        <h2 className="text-2xl font-bold font-serif text-black mt-10">Content Liability</h2>
                        <p>
                            We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
                        </p>

                        <h2 className="text-2xl font-bold font-serif text-black mt-10">Reservation of Rights</h2>
                        <p>
                            We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
                        </p>

                        <h2 className="text-2xl font-bold font-serif text-black mt-10">Disclaimer</h2>
                        <p>
                            To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>limit or exclude our or your liability for death or personal injury;</li>
                            <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                            <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                            <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    );
}
