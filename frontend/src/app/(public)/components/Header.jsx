"use client";
export default function Header() {
  return (
    <header
      className="relative py-12 px-4"
      style={{
        backgroundImage: "url('/images/blueocean.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/15" />
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">
          Enjoy your world of joy
        </h1>
        <h1 className="text-base sm:text-lg text-gray-700">
          From local escapes to far-flung adventures, find what makes you happy
          anytime, anywhere
        </h1>
      </div>
    </header>
  );
}
