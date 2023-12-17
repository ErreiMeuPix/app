/* eslint-disable import/extensions */
/* eslint-disable camelcase */
import { EndpointInterface } from "./endpoint.interface.ts";

export interface EfiConfig {
  client_id: string;
  client_secret: string;
  certificate?: ArrayBuffer | string;
  pemKey?: ArrayBuffer | string;
  sandbox: boolean;
  partnerToken?: string;
  rawResponse?: any;
  baseUrl?: string;
  validateMtls?: boolean;
  authRoute?: EndpointInterface;
  agent?: any;
}
