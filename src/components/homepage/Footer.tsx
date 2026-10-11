import React from 'react';

const Footer = () => {
    return (
        <div className=' bg-[#FAFCFA] border-t border-[#d2d2d2] mt-4 '>
            <div className='flex flex-col md:flex-row justify-between items-center gap-2 md:gap-6 py-4 sm:py-6 px-4 sm:px-6 lg:px-0 text-center md:text-left container mx-auto'>
            <p className="text-[#7C837D] text-sm sm:text-base">বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
            <p className="text-[#7C837D] text-sm sm:text-base">সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
            </div>
        </div>
    );
};

export default Footer;