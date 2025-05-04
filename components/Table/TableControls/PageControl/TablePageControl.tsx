import React from 'react';
import './TablePageControl.style.css';

type TablePageControlProps = {
  onChange: (pageNum:number) => void,
  pageCount: number,
  selectedPage: number
}

/**
 * TablePageControl Component
 * 
 * A React component that renders a pagination control. It displays
 * a series of numbered pages and provides functionality for navigating
 * between pages. The currently selected page is displayed as plain text,
 * while other pages are displayed as buttons that trigger the `onChange` callback.
 * 
 * @component
 * @param {object} props - The props for the TablePageControl component.
 * @param {function} props.onChange - Callback function triggered when a page button is clicked.
 * @param {number} props.pageCount - Total number of pages to display.
 * @param {number} props.selectedPage - The currently active page number.
 * @returns {JSX.Element} - The rendered pagination control.
 * 
 * @example
 * // Example usage:
 * <TablePageControl
 *   onChange={handlePageChange}
 *   pageCount={10}
 *   selectedPage={1}
 * />
 */
function TablePageControl({
  onChange, pageCount, selectedPage
}: TablePageControlProps){
  const pageArray = Array.from({
    length: pageCount
  }, (_, i) => i+1);
  return (<div className="flex justify-center m-2">
    {pageArray.map(pageNum => 
      <button className="m-1 pl-1 pr-1 cursor-pointer hover:font-bold disabled:font-bold" 
        disabled={selectedPage === pageNum}
        key={pageNum}
        onClick={() => onChange(pageNum)}
      >
        {pageNum}
      </button>
    )}
  </div>);
}

export default TablePageControl;