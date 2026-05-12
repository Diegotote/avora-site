interface LogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'hero';
  showText?: boolean;
}

export default function Logo({ className = '', size = 'medium', showText = false }: LogoProps) {
  const sizes = {
    small: 'h-8 w-auto',
    medium: 'h-12 w-auto',
    large: 'h-24 md:h-32 w-auto',
    hero: 'h-36 md:h-52 lg:h-64 w-auto',
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
