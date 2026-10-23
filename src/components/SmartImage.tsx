import { useState } from 'react';

interface SmartImageProps {
  src: string;
  alt: string;
  fallbackToneClass?: string;
  fallbackTitle?: string;
  className?: string;
}

export function SmartImage({
  src,
  alt,
  fallbackToneClass = 'from-[#E8EFEA] via-[#F3F0EC] to-[#EFE5E7]',
  fallbackTitle,
  className = '',
}: SmartImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br ${fallbackToneClass} p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <svg
          viewBox="0 0 64 64"
          fill="none"
          className="mb-3 h-10 w-10 text-[#685F63]/70"
          aria-hidden="true"
        >
          <path
            d="M24 14h16l-2 10c5 4 8 10 8 17 0 6-4.5 9-14 9s-14-3-14-9c0-7 3-13 8-17l-2-10Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M32 14c1-5 5-8 9-9M32 14c-1-4-4-6-7-7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        {fallbackTitle && (
          <span className="font-display text-sm text-[#2A2527]/80">{fallbackTitle}</span>
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#F3EFEA] ${className}`}>
      {!isLoaded && (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${fallbackToneClass} animate-pulse`}
          aria-hidden="true"
        />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`h-full w-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
