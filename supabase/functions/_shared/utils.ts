import { decode } from "https://deno.land/x/djwt/mod.ts";

export function recoverUserId(authorizationHeader: string): string {
    const [header, payload, signature] = decode(authorizationHeader);

    return payload.sub as string;
}


export function SuccessResponse(data: any, status: number) {
    return new Response(
        JSON.stringify(data),
        { headers: { "Content-Type": "application/json" }, status: status },
    )
}