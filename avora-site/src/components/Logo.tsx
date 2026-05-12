interface LogoProps {
  className?: string;
  size?: 'nav' | 'footer' | 'small' | 'medium' | 'large' | 'hero';
  showText?: boolean;
}

export default function Logo({ className = '', size = 'medium', showText = false }: LogoProps) {
  const sizes = {
    nav: 'h-14 md:h-20 lg:h-24 w-auto',
    footer: 'h-20 md:h-28 lg:h-32 w-auto',
    small: 'h-10 md:h-12 w-auto',
    medium: 'h-14 md:h-16 w-auto',
    large: 'h-28 md:h-40 w-auto',
    hero: 'h-40 md:h-56 lg:h-72 w-auto',
  };

  return (
    <div className={`avora-logo-wrap inline-flex items-center ${className}`}>
      <img
        src="/images/avora-logo.png"
        alt="AVORA Business Growth"
        className={`avora-logo-img ${sizes[size]} object-contain select-none`}
        draggable={false}
      />
      {showText && <span className="sr-only">AVORA Business Growth</span>}
    </div>
  );
}
