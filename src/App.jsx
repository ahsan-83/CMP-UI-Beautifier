import React from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { AppLayout } from "./components/layout/AppLayout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import Dashboard from "./pages/Dashboard";
import ContractsPage from "./pages/ContractsPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import RequestServicesPage from "./pages/RequestServicesPage";
import WishlistPage from "./pages/WishlistPage";
import OrderListPage from "./pages/OrderListPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import ResourceDetailPage from "./pages/ResourceDetailPage";
import NotificationsPage from "./pages/NotificationsPage";
import CustomerListPage from "./pages/CustomerListPage";
import InventoryListPage from "./pages/InventoryListPage";
import CustomerManagerDashboard from "./pages/CustomerManagerDashboard";
import NotFound from "./pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function DashboardRouter() {
  return (
    <AppLayout withSidebar={true}>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/contracts" component={ContractsPage} />
        <Route path="/contracts/:contractId" component={ContractsPage} />
        <Route path="/services/:serviceId" component={ServiceDetailPage} />
        <Route path="/request-services" component={RequestServicesPage} />
        <Route path="/wishlist" component={WishlistPage} />
        <Route path="/orders" component={OrderListPage} />
        <Route path="/orders/:orderId" component={OrderDetailPage} />
        <Route path="/resources/:resourceId" component={ResourceDetailPage} />
        <Route path="/notifications" component={NotificationsPage} />
        <Route path="/customers" component={CustomerListPage} />
        <Route path="/inventory" component={InventoryListPage} />
        <Route path="/customer-manager" component={CustomerManagerDashboard} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/landing" component={LandingPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegistrationPage} />
      <Route>{() => <DashboardRouter />}</Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
