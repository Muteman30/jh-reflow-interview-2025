import React, {
  ReactNode, useState, createContext, useContext
} from 'react';
import TablePageControl from './TableControls/PageControl/TablePageControl';
import TableColumnControl from './TableControls/TableColumnControl';
import TablePageLengthControl from './TableControls/TablePageLengthControl';
import './Table.style.css';

export const TableContext = createContext({
  sortedCol: '',
  setSortedCol: (header)=>{},
  asc: true,
  setAsc: (asc)=>{},
});

const TableRoot = ({
  children
} :{children: ReactNode}) => {
  const [sortedCol, setSortedCol] = useState<string>('');
  const [asc, setAsc] = useState<boolean>(true);

  return <TableContext.Provider value={{
    sortedCol, asc, setAsc, setSortedCol,
  }}>
    <table className='table-fixed'>{children}</table>
  </TableContext.Provider>;
};

const TableHead = ({
  children
}: {children:ReactNode})=>{
  return <thead className="">{children}</thead>;
};

const TableHeadCell = ({
  children
}: {children: ReactNode})=>{
  const {} = useContext(TableContext);
  return <th>{children}</th>;
};

const TableBody = ({
  children,
  isLoading,
  pageLength=10,
  colLength=5
}: {children: ReactNode, isLoading: boolean, pageLength: number; colLength: number}) => {
  return isLoading ? (<tbody>
    <tr className="min-h-20">
      <td className='text-center min-h-20' rowSpan={pageLength} colSpan={colLength}>Loading...</td>
    </tr>
  </tbody>): 
    <tbody>{children}</tbody>;
};

const TableRow = ({
  children
}: {children: ReactNode}) => {
  return <tr>{children}</tr>;
};

const TableCell = ({
  children
}: {children:ReactNode}) => {
  return <td className="break-all p-2">{children}</td>;
};

const Table = {
  Root: TableRoot,
  PageControl: TablePageControl,
  PageLengthControl: TablePageLengthControl,
  ColumnControl: TableColumnControl,
  Head: TableHead,
  HeadCell: TableHeadCell,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell
};
export default Table;