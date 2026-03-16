import React from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "@/pages/Dashboard";
import ContractsPage from "@/pages/ContractsPage";
import ServiceDetailPage from "@/pages/ServiceDetailPage";
import RequestServicesPage from "@/pages/RequestServicesPage";
import WishlistPage from "@/pages/WishlistPage";
import OrderListPage from "@/pages/OrderListPage";
import OrderDetailPage from "@/pages/OrderDetailPage";
import ResourceDetailPage from "@/pages/ResourceDetailPage";
import NotificationsPage from "@/pages/NotificationsPage";
import CustomerListPage from "@/pages/CustomerListPage";
import InventoryListPage from "@/pages/InventoryListPage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

function Router() {
  return (
    React.createElement(Switch, {}
      , React.createElement(Route, { path: "/", component: Dashboard} )
      , React.createElement(Route, { path: "/contracts", component: ContractsPage} )
      , React.createElement(Route, { path: "/contracts/:contractId", component: ContractsPage} )
      , React.createElement(Route, { path: "/services/:serviceId", component: ServiceDetailPage} )
      , React.createElement(Route, { path: "/request-services", component: RequestServicesPage} )
      , React.createElement(Route, { path: "/wishlist", component: WishlistPage} )
      , React.createElement(Route, { path: "/orders", component: OrderListPage} )
      , React.createElement(Route, { path: "/orders/:orderId", component: OrderDetailPage} )
      , React.createElement(Route, { path: "/resources/:resourceId", component: ResourceDetailPage} )
      , React.createElement(Route, { path: "/notifications", component: NotificationsPage} )
      , React.createElement(Route, { path: "/customers", component: CustomerListPage} )
      , React.createElement(Route, { path: "/inventory", component: InventoryListPage} )
      , React.createElement(Route, { component: NotFound} )
    )
  );
}

function App() {
  return (
    React.createElement(QueryClientProvider, { client: queryClient}
      , React.createElement(TooltipProvider, {}
        , React.createElement(WouterRouter, { base: import.meta.env.BASE_URL.replace(/\/$/, "")}
          , React.createElement(Router)
        )
        , React.createElement(Toaster)
      )
    )
  );
}

export default App;
