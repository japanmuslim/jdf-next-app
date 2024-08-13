import { NextRequest, NextResponse } from 'next/server';

interface MiddlewareContext {
  res: NextResponse;
}

export const Middleware = (res: MiddlewareContext) => {
  // Logics here
};

export default Middleware;
