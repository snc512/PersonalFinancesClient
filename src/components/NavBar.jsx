import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

function NavBar() {
  const [nav, setNav] = useState(true);

  const handleNav = () => {
    setNav(!nav);
  };

  const closeNavOnResize = () => {
    if (window.innerWidth >= 768 && !nav) {
      setNav(true);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', closeNavOnResize);
    return () => {
      window.removeEventListener('resize', closeNavOnResize);
    };
  }, [nav]);

  return (
    <div className='flex justify-between items-center h-24 max-w-[1240] mx-auto px-4 text-white'>
      <h1 className='w-full text-3xl font-bold text-[#00df9a]'>React.</h1>
      <ul className='hidden md:flex'>
        <li className='p-4'>
          <NavLink exact to='/'>
            Home
          </NavLink>
        </li>
        <li className='p-4'>
          <NavLink to='/expenses'>
            Expenses
          </NavLink>
        </li>
        <li className='p-4'>
          <NavLink to='/budgets'>
            Budgets
          </NavLink>
        </li>
        <li className='p-4'>
          <NavLink to='/analytics'>
            Analytics
          </NavLink>
        </li>
        <li className='p-4'>
          <NavLink to='/contact'>
            Contact
          </NavLink>
        </li>
      </ul>
      <div onClick={handleNav} className='block md:hidden'>
        {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          !nav
            ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
            : 'fixed left-[-100%]'
        }
      >
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>React.</h1>

        <ul className='uppercase p-4'>
          {/* Use NavLink to wrap the list items in the mobile menu */}
          <li className='p-4 border-b border-gray-600'>
            <NavLink exact to='/'>
              Home
            </NavLink>
          </li>
          <li className='p-4 border-b border-gray-600'>
            <NavLink to='/expenses'>
              Expenses
            </NavLink>
          </li>
          <li className='p-4 border-b border-gray-600'>
            <NavLink to='/budgets'>
              Budgets
            </NavLink>
          </li>
          <li className='p-4 border-b border-gray-600'>
            <NavLink to='/analytics'>
              Analytics
            </NavLink>
          </li>
          <li className='p-4'>
            <NavLink to='/contact'>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
