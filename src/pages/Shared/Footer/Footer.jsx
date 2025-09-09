import React from 'react';
import { Link, NavLink } from 'react-router';

const Footer = () => {
    return (
        <div>
            <div className=' bg-gradient-to-t from-[#e3eeff] to-[#e3eeff20] border-t-2 border-[#e3eeff30] 
   py-5 md:py-10 md:px-15 px-8
  dark:bg-gradient-to-t dark:from-gray-950 dark:to-slate-800'>
                <div className='lg:flex justify-between'>
                    <div>
                        {/* logo and title */}
                        <div className='flex '>
                            <img
                                src="https://i.ibb.co.com/k61dyNH8/Screenshot-2025-09-02-131938-removebg-preview.png"
                                alt="Logo"
                                className="h-25 w-auto"
                            />
                        </div>
                        <div className='my-5 '>
                            <p className=''> Student Life Toolkit helps you organize your schedule, <br /> manage your budget,
                                plan study goals, and prepare for exams , <br />  all in one place. </p>
                        </div>
                    </div>



                    {/* quick links */}
                    <div className='mt-3 md:mt-0'>
                        <h1 className='font-bold text-2xl mb-5'>Quick Links</h1>
                        <div className='grid mt-2 space-x-3'>
                            <Link className='plus-jakarta-sans-500' to={'/'}> Home</Link>
                            <Link className='plus-jakarta-sans-500' to={'/schedule'}>Schedule</Link>
                            <Link className='plus-jakarta-sans-500' to={'/budget'}> Budget</Link>
                            <Link className='plus-jakarta-sans-500' to={'/quiz'}>Quiz</Link>
                            <Link className='plus-jakarta-sans-500' to={'/planner'}>Planner</Link>
                            <Link className='plus-jakarta-sans-500' to={'/timer'}>Fucas Timer</Link>


                        </div>
                    </div>


                    {/* social logo */}
                    <div className='mt-3 md:mt-0'>
                        <h1 className='font-bold text-2xl mb-5'>Follow Us</h1>
                        <div className='mt-2 flex  space-x-3'>
                            <Link to={'https://www.linkedin.com/'} ><img className='w-10' src="https://i.ibb.co/N2pJg8NV/linkedin.png" alt="" /></Link>
                            <Link to={'https://www.facebook.com/'} > <img className='w-10' src="https://i.ibb.co/p6BK8vNq/communication.png" alt="" /></Link>
                            <Link to={'https://x.com/?lang=en'} >  <img className='w-10' src="https://i.ibb.co/XZKPP3MX/twitter.png" alt="" /></Link>





                        </div>
                    </div>
                </div>
                <div className='border border-gray-500 my-5'></div>
                <div className='text-center '>
                    <h1 className='mb-2'>© 2025 TaskForce</h1>
                    <p> All rights reserved.    Terms of ServicePrivacy Policy</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;