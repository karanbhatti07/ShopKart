import React from 'react'

const CategoryCard = ({ name, image, onClick }) => {
  return (
    <div onClick={onClick} className='shadow-2xl rounded-2xl'>
      <div className='h-80  overflow-hidden rounded-t-2xl'>
      <img src={image} alt={name} className='h-full w-full object-cover object-top hover:scale-110 duration-300 transition-all' />
      </div>
      {/* <p className='p-4 text-center text-3xl text-gray-400'>{name}</p> */}
      <p className="mt-3 text-center font-bold uppercase tracking-widest text-gray-700">
  {name}
</p>
    </div>
  );
};

export default CategoryCard;