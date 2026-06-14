import "./globals.css";

export const metadata = {
  title: "Master RSI — Langage du Web",
  description: "Portfolio étudiants Master RSI — Université Hassan 1er, FSTS Settat",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
