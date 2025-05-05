'use client';

import React, { useState, useEffect } from 'react';
import { Vehicle } from '@/models/Vehicle.type';

import Table from '@/components/Table/Table';

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import {
  ChevronDownIcon, ChevronUpIcon, CaretSortIcon 
} from '@radix-ui/react-icons';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string|undefined>(undefined);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [pageLength, setPageLength] = useState<number>(10);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [orderBy, setOrderBy] = useState<string>('');
  const [asc, setAsc] = useState<boolean>(true);

  const [columns, setColumns] = useState<Record<string, boolean>>({});
  
  useEffect(()=>{
    setLoading(true);
    setErrorMessage(undefined);
    const getData = async ()=> {
      try{
        const vehicleResponse = await fetch(`/api/vehicle?limit=${pageLength}&page=${selectedPage}`);
        const vehicles = await vehicleResponse.json();
        const cols = Object.keys(vehicles.items[0]).reduce((obj, key, index) => {
          obj[key] = index < 5; 
          return obj;
        }, {} as Record<string, boolean>);

        if (Object.keys(columns).length < 1) {
          setColumns(cols);
          setOrderBy(Object.keys(cols)[0]);
        }

        setTotalRows(vehicles.total);
        setVehicles(vehicles.items);

      } catch(error){
        setErrorMessage('There has been an error getting data');
        console.error(`error getting data: ${error}`);
      } finally {
        setLoading(false);
      }
      
    };
    getData();
  }, [selectedPage, pageLength]);

  useEffect(()=>{
    const orderedVehicles = vehicles.sort((a:Vehicle,b:Vehicle)=>{
      let first = a, second = b;
      if(asc){
        first = b;
        second = a;
      }

      if(first[orderBy] < second[orderBy]){
        return -1;
      } else if(first[orderBy] > second[orderBy]){
        return 1;
      }
      return 0;
    });
    setVehicles(orderedVehicles);
  }, [orderBy, asc, vehicles]);

  const handleOrderBy = (col:string)=>{
    if(col === orderBy){
      setAsc(!asc);
    } else {
      setOrderBy(col);
      setAsc(true);
    }
  };

  const handleColumnChange = function (name:string){
    setColumns(prevState => ({
      ...prevState,
      [name]: !prevState[name]
    }));
  };

  const handleSelectPage = (pageNum:number) => {
    setSelectedPage(pageNum);
  };

  const handlePageLengthChange = (pageLength: number) => {
    setPageLength(pageLength);
  };

  //if(loading) return <p>Loading...</p>;
  if(errorMessage) return <p>Error: </p>;

  const filteredCols = Object.keys(columns)
    .filter(col => columns[col]) || [];

  return (<main>
    <div className="flex justify-between">
      <Table.PageLengthControl onPageLengthChange={handlePageLengthChange}/>
      <Table.ColumnControl columns={columns} onChange={handleColumnChange}/>
    </div>
    
    <Table.Root>
      <Table.Head>
        <Table.Row>
          {
            filteredCols.map(header => (
              <Table.HeadCell key={header}>
                <button className="w-full cursor-pointer flex justify-center items-center" type="button" onClick={()=>handleOrderBy(header)}>
                  <span>{header}</span>
                  {orderBy === header ? (asc ? <ChevronDownIcon/> : <ChevronUpIcon/>) : <CaretSortIcon/>}
                </button>
              </Table.HeadCell>)
            )
          }
        </Table.Row>
      </Table.Head>
      <Table.Body isLoading={loading} pageLength={pageLength} colLength={filteredCols.length}>
        {vehicles.map((vehicle:Vehicle) => {
          return <Table.Row key={vehicle.id}>
            {filteredCols.map((header) => {
              const value = vehicle[header];
              const cellText:string = typeof value === 'string' ? value : JSON.stringify(value);
              return <Table.Cell key={`${vehicle.id}-${header}`}>{cellText}</Table.Cell>;
            })}
          </Table.Row>;
        })}

      </Table.Body>
    </Table.Root>
    {totalRows > pageLength && 
      <Table.PageControl onChange={handleSelectPage} pageCount={Math.ceil(totalRows / pageLength)} selectedPage={selectedPage}/>
    }
  </main>
  );
}
