import { IProduct } from '@/Type/product.type';
import React from 'react';

const ProductCard = ({product}:{product:IProduct}) => {

    return (
        <div>
            <div
              key={product.id}
              className="w-full rounded-2xl border border-[#DCE5DE] bg-[#FAFCFA] p-3.5"
            >
              {" "}
              {/* Product information */}{" "}
              <div className="flex items-center gap-3">
                {" "}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-2xl">
                  {" "}
                  {product.categoryIcon}{" "}
                </div>{" "}
                <div>
                  {" "}
                  <h3 className="text-sm font-bold text-[#26332A]">
                    {" "}
                    {product.nameBn}{" "}
                  </h3>{" "}
                  <p className="text-xs text-gray-500">প্রতি কেজি</p>{" "}
                </div>{" "}
              </div>{" "}
              {/* Price and percentage */}{" "}
              <div className="mt-3 flex items-end justify-between">
                {" "}
                <div>
                  {" "}
                  <p className="text-[11px] text-gray-500"> আজকের দাম </p>{" "}
                  <p className="text-base font-bold text-[#26332A]">
                    {" "}
                    {product.today} টাকা{" "}
                  </p>{" "}
                </div>{" "}
                
                {/* {
                    pct < 0 ? 
                <span 
                className='text-red-500 bg-[#F0F5F0] rounded-3xl px-4 py-1'
                >
                  {" "}
                  ▲ {Math.abs(product.change.pct)}%{" "}
                </span> : <span 
                className='text-green-500 bg-[#F0F5F0] rounded-3xl px-4 py-1'
                >
                  {" "}
                  ▼ {Math.abs(product.change.pct)}%{" "}
                </span>
                } */}
              </div>{" "}
            </div>
        </div>
    );
};

export default ProductCard;