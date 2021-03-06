import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

// @ts-ignore
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { store } from "./redux/store";
import AssetDetail from "./components/AssetDetail";
import AssetsList from "./components/AssetsList";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="assets" element={<AssetsList />}></Route>
            <Route path=":address" element={<Outlet />}>
              <Route path=":tokenId" element={<AssetDetail />}></Route>
            </Route>
            <Route index element={<Navigate to="/assets" />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
