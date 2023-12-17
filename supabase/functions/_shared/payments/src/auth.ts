import axios from "https://deno.land/x/axiod/mod.ts";
import https from "https://deno.land/std@0.177.1/node/https.ts";
import { EfiConfig } from "./interfaces/efiConfig.interface.ts";
import { EndpointInterface } from "./interfaces/endpoint.interface.ts";
import { base64ToBytes } from "https://deno.land/std@0.177.1/node/internal_binding/_utils.ts";

class Auth {
  private constants: any;

  private client_id: String;

  private client_secret: String;

  private baseUrl?: String;

  private agent!: any;

  private authRoute!: EndpointInterface;

  constructor(options: EfiConfig, constants: any) {
    this.constants = constants;
    this.client_id = options.client_id;
    this.client_secret = options.client_secret;
    this.baseUrl = options.baseUrl;

    if (options.agent) {
      this.agent = options.agent;
    }
    if (options.authRoute) {
      this.authRoute = options.authRoute;
    }
  }

  public getAccessToken(): Promise<any> {
    let postParams: any;

    if (
      this.constants.APIS.DEFAULT.URL.PRODUCTION === this.baseUrl ||
      this.constants.APIS.DEFAULT.URL.SANDBOX === this.baseUrl
    ) {
      postParams = {
        method: "POST",
        url: this.baseUrl +
          this.constants.APIS.DEFAULT.ENDPOINTS.authorize.route,
        headers: {
          "api-sdk": `typescript-1.0.2`,
        },
        data: {
          grant_type: "client_credentials",
        },
        auth: {
          username: this.client_id,
          password: this.client_secret,
        },
      };
    } else {
      const data_credentials = `${this.client_id}:${this.client_secret}`;

      const encoder = new TextEncoder();
      const data = encoder.encode(data_credentials);

      postParams = {
        method: "POST",
        url: this.baseUrl + this.authRoute.route,
        headers: {
          Authorization: `Basic ${btoa(String.fromCharCode.apply(null, data))}`,
          "Content-Type": "application/json",
        //   "api-sdk": `typescript-1.0.2`,
        },
        httpsAgent: this.agent,
        data: {
          grant_type: "client_credentials",
        },
      };
    }

    const response = axios(postParams)
      .then((res: any) => {
        return res.data;
      })
      .catch((error: any) => {
        console.log(error);
        return error.response.data;
      });

    return response;
  }
}

export default Auth;
