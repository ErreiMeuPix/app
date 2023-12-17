// import https from "https://deno.land/std@0.177.1/node/https.ts";
// import { EfiPayClient } from "../_shared/efiPayments.ts";
import { PixKey } from "../_shared/entities/pixKey.ts";
import { supabaseClient } from "../_shared/supabaseClient.ts";
import { ErrorHandler, ResponseHandler } from "../_shared/utils.ts";
import EfiPay from "../_shared/payments/index.ts";

Deno.serve(async (req) => {
  try {
    const { pix_target, amount }: { pix_target: string; amount: number } =
      await req.json();

    // const { data, error } = await supabaseClient
    //   .storage
    //   .from("chaves")
    //   .download("homologacao.p12");

    // const certificate = await data?.arrayBuffer();

    const cert64 = Deno.env.get("_BASE64");
    const certBuffer = Uint8Array.from(
      atob(cert64 as string),
      (c) => c.charCodeAt(0),
    );

    const pix = new PixKey(pix_target);

    if (!pix.valid()) {
      return ErrorHandler("INVALID_PIX", "Pix key is invalid", 422);
    }

    const EfiPayClient = new EfiPay({
      sandbox: true,
      client_id: "Client_Id_f8237c826cec21b6d6b677144f35491461828238",
      client_secret: "Client_Secret_3cd969359713f0f3179f5b8f8b3657e088883d49",
      certificate: certBuffer,
    });

    EfiPayClient.pixCreateImmediateCharge({
      calendario: {
        expiracao: 3600,
      },
      devedor: {
        cpf: "94271564656",
        nome: "Gorbadock Oldbuck",
      },
      valor: {
        original: "123.45",
      },
      chave: "2b63641c-77f6-429e-8e0b-c9b857dd9a78",
      // infoAdicionais: [
      //   {
      //     nome: "Pagamento em",
      //     valor: "NOME DO SEU ESTABELECIMENTO",
      //   },
      //   {
      //     nome: "Pedido",
      //     valor: "NUMERO DO PEDIDO DO CLIENTE",
      //   },
      // ],
    })
      .then((resposta: any) => {
        console.log("ENTREI NA BOA", resposta);
      })
      .catch((error: any) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }

  return ResponseHandler(null, 200);
});
