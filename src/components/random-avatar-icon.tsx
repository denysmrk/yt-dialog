import React from 'react';
import multiavatar from '@multiavatar/multiavatar';

const Avatar = ({ name }: { name: string }) => {
  const avatarSvg = multiavatar(name);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: avatarSvg }}
      style={{ width: '100px', height: '100px' }} // Опциональные стили
    />
  );
};

export default Avatar;
