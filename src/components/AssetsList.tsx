import React, { useState, useRef } from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { useAssetsQuery } from "../redux/service";
import InfiniteScroll from "react-infinite-scroll-component";
import * as Type from "../common.type";
import chunk from "lodash/chunk";

const PAGE_ITEM_NUM = 20;
const OWNER_ADDRESS = "0x960DE9907A2e2f5363646d48D7FB675Cd2892e91";

export default function AssetsList() {
  const [request, setRequest] = useState<Type.ApiOpenSeaAssetsRequest>({
    format: "json",
    limit: PAGE_ITEM_NUM,
    offset: 0,
    owner: OWNER_ADDRESS,
  });

  const fetchedAssetsRef = useRef<Type.AssetItem[]>([]);
  const fetchedAssetsHash = useRef<Record<string, boolean>>({});

  const { data: assets = [] } = useAssetsQuery(request);

  const fetchData = () => {
    setRequest((state) => ({ ...state, offset: state.offset + PAGE_ITEM_NUM }));
  };

  assets.forEach((item) => {
    if (!fetchedAssetsHash.current[item.id]) {
      fetchedAssetsHash.current[item.id] = true;
      fetchedAssetsRef.current.push(item);
    }
  });

  const assetsChunks = chunk(fetchedAssetsRef.current, 2);

  return (
    <InfiniteScroll
      dataLength={fetchedAssetsRef.current.length}
      hasMore={true}
      next={fetchData}
      loader={<h4>Loading...</h4>}
    >
      <Stack direction="column" spacing={4} justifyContent="space-around">
        {assetsChunks.map((chunk, index) => (
          <Stack
            key={index}
            sx={{ width: "100%" }}
            direction="row"
            spacing={4}
            justifyContent="space-around"
          >
            {chunk.map((item) => (
              <Paper elevation={4} key={item.id} sx={{ width: "45%" }}>
                <img src={item.imageUrl} style={{ width: "90%" }}></img>
                <Box sx={{ padding: "8px" }}>{item.name}</Box>
              </Paper>
            ))}
          </Stack>
        ))}
      </Stack>
    </InfiniteScroll>
  );
}
