import { NextResponse } from 'next/server'

export function middleware(request) {
    const response = NextResponse.next();

    if (!request.cookies.get("tasks")) {
        response.cookies.set({
            name: "tasks",
            value: [],
            maxAge: 30 * 24 * 60 * 60
        });
    }

    return response
}
