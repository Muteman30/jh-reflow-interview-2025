import React, { useState } from'react';
import { DropdownMenu } from 'radix-ui';
import { ChevronDownIcon } from '@radix-ui/react-icons';

function TablePageLengthControl({
  onPageLengthChange
}: {
  onPageLengthChange: (num:number) => void
}){
  const pageOptions = [10,20,50,100] as const;
  type pageOptionsType = typeof pageOptions[number];
  const [pageViewLength, setPageViewLength] = useState<pageOptionsType>(pageOptions[0]);

  const handleSelect = (pageViewLength:pageOptionsType) => {
    setPageViewLength(pageViewLength);
    onPageLengthChange(pageViewLength);
  };

  return <div>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="cursor-pointer p-1 m-1 bg-gray-200 rounded-md">
        <div className="flex items-center">
          Page Length: {pageViewLength}
          <ChevronDownIcon/>
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="shadow-md bg-white p-2">
          {pageOptions.map(option => (
            <DropdownMenu.Item onSelect={()=>handleSelect(option)} key={option} className="cursor-pointer">
              {option}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  </div>;
}

export default TablePageLengthControl;