import React from "react";
import ReactDOM from "react-dom/client";
import {Link,  BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Pet from "./Pet";
import SearchParams from "./SearchParams";
import Details from "./Details";


const queryClient = new QueryClient({
  defaultOptions: {
    queries:{
      staleTime : Infinity,
      cacheTime : Infinity,
    },
  },
})
const App = () => {
  return (
    <div>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <header>
        <Link to="">Adopt Me !</Link>
      </header>
     
     <Routes>
     <Route path="/details/:id"  element={<Details/>}>
      
      </Route>
      <Route path="/" element={<SearchParams />}>
      
      </Route>
     </Routes>
     </QueryClientProvider>
    </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
