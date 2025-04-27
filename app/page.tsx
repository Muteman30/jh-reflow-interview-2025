'use client';

import React, { useState, useEffect } from 'react';
import { Vehicle } from '@/models/Vehicle.type';
import { VehicleSafetyCheck } from '@/models/VehicleSafetyCheck.type';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string|undefined>(undefined);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [vehicleSafetyChecks, setVehicleSafetyChecks] = useState<VehicleSafetyCheck[]>([]);
  
  useEffect(()=>{
    setLoading(true);
    setErrorMessage(undefined);
    const getData = async ()=> {
      try{
        const vehicleSafetyCheckResponse = await fetch('/api/vehicleSafetyCheck');
        const vehicleSafetyChecks:VehicleSafetyCheck[] = await vehicleSafetyCheckResponse.json();
        setVehicleSafetyChecks(vehicleSafetyChecks);

        const vehicleResponse = await fetch('/api/vehicle');
        const vehicles = await vehicleResponse.json();
        setVehicles(vehicles);
      } catch(error){
        setErrorMessage(error);
        console.error(`error getting data: ${error}`);
      } finally {
        setLoading(false);
      }
      
    };
    getData();
  }, []);

  if(loading) return <p>Loading...</p>;

  return (<>
    {errorMessage && (<p>Error: </p>)}
    {vehicles.map(vehicle => {
      console.log('Vehicle: ', vehicle);
      return <p key={vehicle.id}>{vehicle.id}</p>;
    })}
    {vehicleSafetyChecks.map(vehicleSafetyCheck => {
      console.log('SafetyCheck: ', vehicleSafetyCheck);
      return <p key={vehicleSafetyCheck.id}>{vehicleSafetyCheck.id}</p>;
    })}
  </>
  );
}
