'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Link from 'next/link';
import Filter from './Filter';
import debounce from 'lodash.debounce'; // If implementing debounce

type Props = {};

const Page = (props: Props) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [allHexValues, setAllHexValues] = useState<string[]>([]);
  const [selectedHexValues, setSelectedHexValues] = useState<string[]>([]);
  const [price, setPrice] = useState({
    min: 0,
    max: 10,
  });

  const [response, setResponse] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchdata = debounce(async () => {
      try {
        const response = await axios.get('/api/filterproduct', {
          params: {
            categories: selectedCategories,
            size: selectedSize,
            'price[min]': price.min,
            'price[max]': price.max,
            colors: selectedHexValues,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log("response", response.data);
        setResponse(response.data);
        setError(null);
      } catch (error) {
        console.log('error', error);
        setError('Failed to fetch products. Please try again.');
      }
    }, 300); // 300ms debounce

    fetchdata();

    // Cleanup debounce on unmount or dependencies change
    return () => {
      fetchdata.cancel();
    };
  }, [selectedCategories, selectedSize, selectedHexValues, price]);

  return (
    <div className='px-5 max-w-[1280px] mx-auto'>
      <div>
        <Navbar />
      </div>
      <hr />
      <div className='flex'>
        <div>
          <Filter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            allHexValues={allHexValues}
            setAllHexValues={setAllHexValues}
            selectedHexValues={selectedHexValues}
            setSelectedAllHexValues={setSelectedHexValues}
            price={price}
            setPrice={setPrice}
          />
        </div>
        <div className='px-10'>
          <h1 className='py-3 text-2xl font-medium'>Filtered Clothings</h1>
          {error && <p className="text-red-500">{error}</p>}
          {response.length === 0 && !error && <p>No products found.</p>}
          <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-20 gap-12 mt-5'>
            {response.map((product: any) => (
              <div key={product.id}>
                <Link href={`/dashboard/${product.id}`}>
                  <div className='relative rounded-lg'>
                    <img
                      src={product.images.split(',')[0]}
                      className='w-[250px] h-[300px] object-cover object-top rounded-lg'
                      alt={product.title}
                    />
                  </div>
                  <div className='flex items-center justify-between mt-4'>
                    <div>
                      <h1 className='text-[14px] font-medium max-w-[150px] whitespace-nowrap overflow-hidden'>
                        {product.title}
                      </h1>
                      <p className='text-[13px] opacity-60'>{product.store}</p>
                    </div>
                    <span className='px-2 font-medium bg-gray-100 rounded-lg'>${product.price}.00</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
