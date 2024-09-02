"use client";

import React, { useEffect } from "react";

interface PaginationProps {
  pagination: Array<{
    label: string;
    url: string | null;
    active: boolean;
  }> | null;
  
  listUpdateWithLink: (link: string) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pagination, listUpdateWithLink }) => {

  useEffect(() => {

  }, [pagination]);

  return (
    <div className="flex w-full justify-center">
      <div className="flex  gap-2 mb-4 mt-4">
        {pagination && pagination.length > 0 ? (
          pagination?.map((res: any, index: number) => {
          
            if (res.label === '&laquo; Previous') {
                res.label = " < "
            }

            if (res.label === 'Next &raquo;') {
                res.label = " > "
            }

            return (
                <div key={index} onClick={() => listUpdateWithLink(res.url)} className={`flex justify-center w-8 h-8 items-center rounded-md cursor-pointer text-black ${res.url === null ? 'text-red-900' : 'text-black'} ${res.active === true ? 'bg-system_yellon' : ''}`}>
                    {res.label}
                </div>
        )
        })
        ) : (
          <div>Carregando...</div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
