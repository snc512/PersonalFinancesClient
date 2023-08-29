import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js'

const Hero = () => {

  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: ['goals.', 'needs.', 'future.'],
      typeSpeed: 80,
      backSpeed: 100,
      loop: true
    };

    const typed = new Typed(typedRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className='text-white'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#00df9a] font-bold p-2'>PERSONAL FINANCES WITH DATA ANALYTICS</p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>Budget with data.</h1>
        <div className='flex justify-center items-center'>
          <p className='md:text-4xl sm:text-3xl text-xl font-bold py-4'>Fast, flexible financing for your
          <span ref={typedRef} className='md:text-4xl sm:text-3xl text-xl font-bold md:pl-2 pl-1 text-[#00df9a]'></span>
          </p>
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500'>
          Introduce smart financial planning with expense tracking and personal budgets.
        </p>
        <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>
          Get Started
        </button>
      </div>
    </div> 
  )
}

export default Hero