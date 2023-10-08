

export interface WalletDataPoint {
  lat: number;
  lng: number;
  timestamp: number;
}

export interface WalletData {
  [walletAddress: string]: WalletDataPoint;
}