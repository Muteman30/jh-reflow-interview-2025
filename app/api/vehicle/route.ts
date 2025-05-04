import { NextRequest, NextResponse } from 'next/server';
import { ReflowServerResponse } from '@/models/response.type';
import { Vehicle } from '@/models/Vehicle.type';
import { getData } from '@/utils/api';

export async function GET(req: NextRequest){
  const url = new URL(req.url);
  const limit = parseInt(url.searchParams.get('limit') || '');
  const limitQP = !isNaN(limit) ? `limit=${limit}` :  '';
  const page = parseInt(url.searchParams.get('page') || '');
  const pageQP = !isNaN(page) ? `offset=${(page*limit) - limit}` : '';

  const vehicles:ReflowServerResponse<Vehicle> = await getData(`/Vehicles?${limitQP}&${pageQP}`);
  return NextResponse.json(vehicles.data);
}