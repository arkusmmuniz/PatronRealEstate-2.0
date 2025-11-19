import Image from "next/image";
import Link from "next/link";
import logo from "../images/Logo.png"

interface PatronLogoProps {
  size?: "small" | "medium" | "large" | "xl";
  showLink?: boolean;
  className?: string;
}

export function PatronLogo({
  size = "medium",
  showLink = true,
  className = "",
}: PatronLogoProps) {
  const sizeClasses = {
    small: "h-6 w-auto",
    medium: "h-10 w-auto",
    large: "h-16 w-auto",
    xl: "h-20 w-auto",
  };

  const logoSrc = {
    small:
      logo,
    medium:
      logo,
    large:
      logo,
    xl:
      logo,
  };

  const logoWidth = {
    small: 80,
    medium: 200,
    large: 700,
    xl: 900,
  };

  const logoHeight = {
    small: 24,
    medium: 60,
    large: 200,
    xl: 250,
  };

  const LogoImage = () => (
    <Image
      src={logoSrc[size]}
      alt="Patrón Real Estate"
      width={logoWidth[size]}
      height={logoHeight[size]}
      className={`${sizeClasses[size]} ${className}`}
      priority={size === "xl" || size === "large"}
    />
  );

  if (showLink) {
    return (
      <Link href="/" className="flex items-center">
        <LogoImage />
      </Link>
    );
  }

  return <LogoImage />;
}
