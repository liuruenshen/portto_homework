import React from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

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
    <Stack
      direction="column"
      sx={{ width: "100%" }}
      spacing={4}
      justifyContent="center"
      alignItems="center"
    >
      <Paper
        elevation={8}
        sx={{ width: "90%", padding: "20px", boxSizing: "border-box" }}
      >
        <Stack direction="column" spacing={4} justifyContent="space-around">
          <Box>{data.collection.name}</Box>
          <Box>
            <img src={data.imageUrl} style={{ width: "90%" }}></img>
          </Box>
          <Box>{data.name}</Box>
          <Box>{data.description}</Box>
          <Box>
            <Link component={Button} href={data.permalink}>
              {"View on OpenSea"}
            </Link>
          </Box>
          <Box>
            <Button component={RouterLink} to="/assets">
              {"Return to the list"}
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Stack>
  );
}
