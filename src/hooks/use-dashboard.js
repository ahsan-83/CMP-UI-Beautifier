import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Types
















// Mock Data
const MOCK_STATS = {
  contracts: 1,
  services: 2,
  activeResources: 195,
  newRequests: 132,
};

const MOCK_SERVICES = [
  {
    id: "SRV-2023-001",
    serviceName: "Land Use Clearance",
    provider: "Town Planning Department",
    status: "Pending",
    createdAt: "2023-10-15T10:00:00Z",
    applicant: "Rahim Uddin",
  },
  {
    id: "SRV-2023-002",
    serviceName: "Building Construction Approval",
    provider: "Development Control",
    status: "Active",
    createdAt: "2023-10-12T14:30:00Z",
    applicant: "Karim Group Ltd.",
  },
  {
    id: "SRV-2023-003",
    serviceName: "Large Scale Project Clearance",
    provider: "Town Planning Department",
    status: "Completed",
    createdAt: "2023-09-28T09:15:00Z",
    applicant: "Jamal Enterprises",
  },
  {
    id: "SRV-2023-004",
    serviceName: "Occupancy Certificate",
    provider: "Development Control",
    status: "Active",
    createdAt: "2023-10-18T11:45:00Z",
    applicant: "Fatima Begum",
  },
  {
    id: "SRV-2023-005",
    serviceName: "Special Project Approval",
    provider: "Estate Department",
    status: "Pending",
    createdAt: "2023-10-20T16:20:00Z",
    applicant: "National Housing Authority",
  }
];

// Hooks
export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: async () => {
      // Simulate network latency
      await new Promise(resolve => setTimeout(resolve, 600));
      return MOCK_STATS;
    },
  });
}

export function useServiceRequests() {
  return useQuery({
    queryKey: ["services", "list"],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      return MOCK_SERVICES;
    },
  });
}

export function useUpdateServiceStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status }) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { id, status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services", "list"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
}
