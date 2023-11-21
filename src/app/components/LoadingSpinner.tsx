import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className='lds-ripple w-full mx-auto scale-[250%] mt-[100px]'>
      <div></div>
      <div></div>
    </div>
  );
}
