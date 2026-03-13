import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Our Service", href: "#services" },
  { label: "Our Vehicles", href: "#vehicles" },
  { label: "Book Safari", href: "#safari" },
  { label: "Contact Us", href: "#contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-md border-b border-secondary">
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <a href="#home" className="flex items-center gap-2">
          <img src="/LOGO.png" alt="LKTaxi Logo" className="h-12 md:h-14 w-auto" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-secondary-foreground/80 hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+94705000526" className="flex items-center gap-2 text-primary font-semibold text-sm">
            <Phone className="w-4 h-4" />
            +94 70 5000 526
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-secondary-foreground p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <div className="lg:hidden bg-secondary border-t border-secondary">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-sm font-medium text-secondary-foreground/80 hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a href="tel:+94705000526" className="px-4 py-3 text-primary font-semibold text-sm flex items-center gap-2">
              <Phone className="w-4 h-4" />
              +94 70 5000 526
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
