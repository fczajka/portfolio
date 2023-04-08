import Header from "@/components/Header/Header";
import MobileNavbar from "@/components/MobileNavbar/MobileNavbar";
import "./globals.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth motion-reduce:scroll-auto">
            <head />
            <body>
                <Header />
                {children}
                <MobileNavbar />
            </body>
        </html>
    );
}
