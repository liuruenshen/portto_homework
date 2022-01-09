import React from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { useAssetDetailQuery } from "../redux/service";
import * as Type from "../common.type";
import { useParams } from "react-router-dom";

export default function AssetDetail() {
  const queryParam = useParams<
    Type.ApiOpenSeaAssetDetailRequest & Record<string, string>
  >();

  const { address = "", tokenId = "" } = queryParam;

  const { data, isLoading } = useAssetDetailQuery({ address, tokenId });

  if (isLoading) {
    return <h4>Loading Data...</h4>;
  }

  if (!data) {
    return null;
  }

  return (
    <Paper>
      <Stack direction="column" spacing={4} justifyContent="space-around">
        <Box>{data.collection.name}</Box>
        <Box>
          <img src={data.imageUrl} style={{ width: "90%" }}></img>
        </Box>
        <Box>{data.description}</Box>
        <Box>{data.permalink}</Box>
      </Stack>
    </Paper>
  );
}
