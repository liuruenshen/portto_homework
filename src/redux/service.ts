import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as Type from "../common.type";
import camelcaseKeys from "camelcase-keys";

export const serviceUrl = "https://api.opensea.io";

export const openSeaService = createApi({
  reducerPath: "openSeaService",
  baseQuery: fetchBaseQuery({
    baseUrl: serviceUrl,
  }),
  endpoints: (builder) => ({
    assets: builder.query<
      Type.ApiOpenSeaAssetsResponse["assets"],
      Type.ApiOpenSeaAssetsRequest
    >({
      query(params) {
        return {
          url: "api/v1/assets",
          params,
        };
      },
      transformResponse(data: Type.ApiOpenSeaAssetsResponse) {
        return camelcaseKeys(data.assets, {
          deep: true,
        }) as Type.ApiOpenSeaAssetsResponse["assets"];
      },
    }),
    assetDetail: builder.query<
      Type.ApiOpenSeaAssetDetailResponse,
      Type.ApiOpenSeaAssetDetailRequest
    >({
      query(param) {
        return {
          url: `api/v1/asset/${param.address}/${param.tokenId}`,
        };
      },
      transformResponse(data: Type.ApiOpenSeaAssetDetailResponse) {
        return camelcaseKeys(data, { deep: true });
      },
    }),
  }),
});

export const { useAssetsQuery, useAssetDetailQuery } = openSeaService;
