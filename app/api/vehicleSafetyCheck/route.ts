import { NextResponse } from 'next/server';
import { ReflowServerResponse } from '@/models/response.type';
import { VehicleSafetyCheck } from '@/models/VehicleSafetyCheck.type';
import { getData } from '@/utils/api';

export async function GET(){
  const vehicles:ReflowServerResponse<VehicleSafetyCheck> = await getData('/VehicleSafetyCheck');
  return NextResponse.json(vehicles.data.items);
}