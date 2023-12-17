import EfiPay from "https://esm.sh/v135/sdk-typescript-apis-efi@1.0.2?target=deno";


export const EfiPayClient = new EfiPay({
  sandbox: true,
  client_id: "Client_Id_f8237c826cec21b6d6b677144f35491461828238",
  client_secret: "Client_Secret_3cd969359713f0f3179f5b8f8b3657e088883d49",
  certificate: "./homologacao.p12",
});
