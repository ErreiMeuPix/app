/* eslint-disable camelcase */

export interface EfiCredentials {
  client_id: string;
  client_secret: string;
  certificate?: ArrayBuffer | string;
  pix_cert?: ArrayBuffer | string;
  pathCert?: ArrayBuffer | string;
  pemKey?: ArrayBuffer | string;
  sandbox: boolean;
  validateMtls?: boolean;
  partnerToken?: string;
}
