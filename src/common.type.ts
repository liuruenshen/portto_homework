export interface AssetItem {
  id: number;
  tokenId: string;
  imageUrl: string;
  name: string;
  assetContract: {
    address: string;
  };
}

export interface ApiOpenSeaAssetsResponse {
  assets: AssetItem[];
}

export interface ApiOpenSeaAssetsRequest {
  owner: string;
  format: "json";
  offset: number;
  limit: number;
}

interface AssetCollection {
  name: string;
}

export interface ApiOpenSeaAssetDetailResponse {
  id: number;
  tokenId: string;
  imageUrl: string;
  description: string;
  collection: AssetCollection;
  permalink: string;
  name: string;
}

export interface ApiOpenSeaAssetDetailRequest {
  address: string;
  tokenId: string;
}
