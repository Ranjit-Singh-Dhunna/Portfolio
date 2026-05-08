import type { Metadata } from "next";
import { 
  Inter, 
  Cormorant_Garamond,
  Bangers,
  Press_Start_2P,
  VT323,
  Playfair_Display,
  Creepster,
  Righteous,
  Space_Grotesk,
  Fleur_De_Leah
} from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "600"], style: ["normal", "italic"], variable: '--font-cormorant' });
const bangers = Bangers({ subsets: ["latin"], weight: "400", variable: '--font-comic' });
const pixel = Press_Start_2P({ subsets: ["latin"], weight: "400", variable: '--font-pixel' });
const vt323 = VT323({ subsets: ["latin"], weight: "400", variable: '--font-desktop' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-book' });
const creepster = Creepster({ subsets: ["latin"], weight: "400", variable: '--font-stalker' });
const righteous = Righteous({ subsets: ["latin"], weight: "400", variable: '--font-3d' });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: '--font-hyper' });
const fleur = Fleur_De_Leah({ weight: "400", subsets: ["latin"], variable: '--font-fleur' });

export const metadata: Metadata = {
  title: "Ranjit | Portfolio",
  description: "Personal portfolio of Ranjit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ cursor: 'none' }}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: `*, *::before, *::after, html, body { cursor: none !important; }` }} />
      </head>
      <body style={{ cursor: 'none' }} className={`${inter.variable} ${cormorant.variable} ${bangers.variable} ${pixel.variable} ${vt323.variable} ${playfair.variable} ${creepster.variable} ${righteous.variable} ${spaceGrotesk.variable} ${fleur.variable}`}>
        <CustomCursor />
        <div style={{ cursor: 'none' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
