import Image from "next/image";
import Link from "next/link";

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
      "https://patronrealestateservices.com/wp-content/uploads/2022/04/Patron-Real-Estate-logo-update33.png",
    medium:
      "https://patronrealestateservices.com/wp-content/uploads/2022/04/Patron-Real-Estate-logo-update33.png",
    large:
      "https://patronrealestateservices.com/wp-content/uploads/2022/04/Patron-Real-Estate-logo-update33.png",
    xl:
      "https://patronrealestateservices.com/wp-content/uploads/2022/04/Patron-Real-Estate-logo-update33.png",
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
