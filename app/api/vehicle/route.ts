import { NextResponse } from 'next/server';
import { ReflowServerResponse } from '@/models/response.type';
import { Vehicle } from '@/models/Vehicle.type';
import { getData } from '@/utils/api';

export async function GET(){
  const vehicles:ReflowServerResponse<Vehicle> = await getData('/Vehicles');
  return NextResponse.json(vehicles.data.items);
}