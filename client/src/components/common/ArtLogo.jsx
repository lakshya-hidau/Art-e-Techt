import React from 'react';
import { brand } from '../../config/brand';

export const ArtLogo = ({
  className = '',
  showWordmark = true,
  wordmarkClass = '',
  compact = false,
}) => {
  const src = compact || !showWordmark ? brand.symbol : brand.logo;
  const imageClass = showWordmark
    ? 'h-12 w-auto max-w-[180px] object-contain'
    : 'h-9 w-9 object-contain';

  return (
    <img
      src={src}
      alt={brand.name}
      className={`${imageClass} ${wordmarkClass} ${className}`}
      draggable="false"
    />
  );
};

export default ArtLogo;
