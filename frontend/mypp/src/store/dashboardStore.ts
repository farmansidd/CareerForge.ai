import { create } from "zustand";
import * as api from '../services/api';
import { DashboardData } from '../types';

interface DashboardStore {
  dashboardData: DashboardData | null;
  loading: boolean;
  error: string | null;
  fetchDashboardData: () => Promise<void>;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  dashboardData: null,
  loading: false,
  error: null,
  fetchDashboardData: async () => {
    try {
      set({ loading: true, error: null });
      const data = await api.getDashboard();
      set({ dashboardData: data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch dashboard data', loading: false });
    }
  },
}));