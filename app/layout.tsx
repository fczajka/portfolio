import "./globals.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth motion-reduce:scroll-auto">
            <head />
            <body>{children}</body>
        </html>
    );
}
