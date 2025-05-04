'use client';

import React, { useState, useEffect } from 'react';
import { Vehicle } from '@/models/Vehicle.type';

import Table from '@/components/Table/Table';

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string|undefined>(undefined);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [pageLength, setPageLength] = useState<number>(10);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);

  const [columns, setColumns] = useState<Record<string, boolean>>({});
  
  useEffect(()=>{
    setLoading(true);
    setErrorMessage(undefined);
    const getData = async ()=> {
      try{
        const vehicleResponse = await fetch(`/api/vehicle?limit=${pageLength}&page=${selectedPage}`);
        const vehicles = await vehicleResponse.json();

        setTotalRows(vehicles.total);
        setVehicles(vehicles.items);
        
        const columns = Object.keys(vehicles.items[0]).reduce((obj, key, index) => {
          obj[key] = index < 5; 
          return obj;
        }, {} as Record<string, boolean>);
        setColumns(columns);

      } catch(error){
        setErrorMessage('There has been an error getting data');
        console.error(`error getting data: ${error}`);
      } finally {
        setLoading(false);
      }
      
    };
    getData();
  }, [selectedPage, pageLength]);

  const handleColumnChange = function (name:string){
    setColumns(prevState => ({
      ...prevState,
      name: !prevState[name]
    }));
  };

  const handleSelectPage = (pageNum:number) => {
    setSelectedPage(pageNum);
  };

  //if(loading) return <p>Loading...</p>;
  if(errorMessage) return <p>Error: </p>;

  const filteredCols = Object.keys(columns)
    .filter(col => columns[col]) || [];

  return (<main>
    <div className="flex justify-between">
    </div>
    
    <Table.Root>
      <Table.Head>
        <Table.Row>
          {
            filteredCols.map(header => <Table.HeadCell key={header}>{header}</Table.HeadCell>)
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
