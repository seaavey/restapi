import { Mail } from 'lucide-react';

export default function ContactSection() {
    return (
        <section id="contact" className="bg-background py-20">
            <div className="container mx-auto px-6">
                <SectionHeader
                    title="Contact Us"
                    description="Have questions about our REST API? Reach out to us via email."
                />

                <div className="mx-auto max-w-2xl">
                    <div className="bg-card/30 border-border/30 rounded-2xl border p-8 text-center">
                        <div className="bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
                            <Mail className="text-primary h-8 w-8" />
                        </div>

                        <h3 className="mb-2 text-xl font-semibold">Get in Touch</h3>
                        <p className="text-foreground/80 mb-6">
                            For support, questions, or feedback about our API, send us an email.
                        </p>

                        <a
                            href="mailto:support@seavvey.web.id"
                            className="text-primary text-lg font-medium hover:underline"
                        >
                            support@seavvey.web.id
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

function SectionHeader({ title, description }: { title: string; description: string }) {
    return (
        <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">{title}</h2>
            <p className="text-foreground/80 mx-auto max-w-2xl text-lg">{description}</p>
        </div>
    );
}
