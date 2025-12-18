import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';

const poppins = Poppins({
    variable: '--font-poppins',
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
    title: {
        default: 'RestAPI - Your Next Generation API Platform',
        template: '%s | RestAPI',
    },
    description:
        'Build and manage your APIs with our powerful platform. Secure, scalable, and developer-friendly API solutions for modern applications.',
    keywords: ['API', 'REST', 'Next.js', 'API Platform', 'Developer Tools', 'API Management'],
    authors: [{ name: 'Your Name', url: 'https://api.seaavey.site' }],
    creator: 'Muhammad Adriansyah',
    publisher: 'Seaavey Developer',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://api.seaavey.site',
        title: 'RestAPI - Your Next Generation API Platform',
        description:
            'Build and manage your APIs with our powerful platform. Secure, scalable, and developer-friendly API solutions for modern applications.',
        siteName: 'RestAPI',
        images: [
            {
                url: 'https://api.seaavey.site/og-image.png',
                width: 1200,
                height: 630,
                alt: 'RestAPI - Your Next Generation API Platform',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'RestAPI - Your Next Generation API Platform',
        description:
            'Build and manage your APIs with our powerful platform. Secure, scalable, and developer-friendly API solutions for modern applications.',
        images: ['https://api.seaavey.site/twitter-image.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: 'https://api.seaavey.site',
    },
    category: 'technology',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${poppins.variable} antialiased`}>
                <ThemeProvider attribute={'class'} defaultTheme="system">
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
