import { NextResponse, type NextRequest } from 'next/server';

export const GET = (request: NextRequest) =>
	NextResponse.redirect(new URL('/assets/logo-vm.png', request.url), 308);
