import { decode } from "https://deno.land/x/djwt@v3.0.1/mod.ts";

export function recoverUserId(authorizationHeader: string): string {
  const [header, payload, signature] = decode(authorizationHeader);

  const { sub } = payload as { sub: string };

  return sub;
}

export function ResponseHandler(data: any, status: number) {
  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" }, status: status },
  );
}

export function ErrorHandler(hint: string, message: string, status: number) {
  return ResponseHandler({ message: message, hint: hint }, status);
}

export function HandlerDangerLogger(
  {
    plusMessage,
    message,
    status,
  }: {
    plusMessage: string;
    message: string;
    status: number;
  },
) {
  return { plusMessage: plusMessage, message: message, status: status };
}
