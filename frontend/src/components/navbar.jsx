"use client";

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='bg-gray-200 p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='text-blue-600 text-lg font-bold'>QuickMade</div>
        
        {/* Desktop Menu */}
        <div className='hidden md:flex gap-10 text-lg'>
          <Link href='/' className='hover:text-blue-600 transition duration-300'>Home</Link>
          <Link href='/about' className='hover:text-blue-600 transition duration-300'>About</Link>
          <Link href='/services' className='hover:text-blue-600 transition duration-300'>Services</Link>
          <Link href='/contact' className='hover:text-blue-600 transition duration-300'>Contact</Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className='md:hidden'>
          <button onClick={() => setIsOpen(!isOpen)}>
            {!isOpen && <Menu size={28} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Sidebar */}
      <motion.div 
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? '0%' : '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`md:hidden fixed inset-0 bg-black bg-opacity-50 ${isOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsOpen(false)}
      >
        <motion.div 
          initial={{ x: '-100%' }}
          animate={{ x: isOpen ? '0%' : '-100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className='bg-white w-64 h-full p-5 shadow-lg relative'
          onClick={(e) => e.stopPropagation()}
        >
          <button className='absolute right-4 top-4' onClick={() => setIsOpen(false)}>
            <X size={28} />
          </button>
          <div className='flex flex-col gap-6 mt-10 text-lg'>
            <Link href='/' className='hover:text-blue-600 transition duration-300' onClick={() => setIsOpen(false)}>Home</Link>
            <Link href='/about' className='hover:text-blue-600 transition duration-300' onClick={() => setIsOpen(false)}>About</Link>
            <Link href='/services' className='hover:text-blue-600 transition duration-300' onClick={() => setIsOpen(false)}>Services</Link>
            <Link href='/contact' className='hover:text-blue-600 transition duration-300' onClick={() => setIsOpen(false)}>Contact</Link>
          </div>
        </motion.div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
