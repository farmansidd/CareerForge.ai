import { create } from "zustand"; 
import * as api from '../services/api';
import { Roadmap } from '../types/index';

const useMockData = !process.env.REACT_APP_API_URL;

interface RoadmapStore {
  roadmaps: Roadmap[];
  loading: boolean; 
  error: string | null;
  fetchRoadmaps: () => Promise<void>;
  fetchRoadmapById: (roadmapId: number) => Promise<Roadmap | null>;
  createRoadmap: (roadmap: { title: string; description: string }) => Promise<void>;
  generateRoadmap: (goal: string) => Promise<Roadmap | null>;
}

const mockRoadmaps: Roadmap[] = [];

export const useRoadmapStore = create<RoadmapStore>((set) => ({
  roadmaps: useMockData ? mockRoadmaps : [],
  loading: false,
  error: null,
  fetchRoadmaps: async () => {
    if (useMockData) return;
    try {
      set({ loading: true, error: null });
      const roadmaps = await api.getRoadmaps();
      set({ roadmaps: roadmaps || [], loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch roadmaps', loading: false });
    }
  },
  fetchRoadmapById: async (roadmapId: number) => {
    if (useMockData) return null;
    try {
      set({ loading: true, error: null });
      const roadmap = await api.getRoadmap(roadmapId.toString());
      set({ loading: false });
      return roadmap;
    } catch (error) {
      set({ error: 'Failed to fetch roadmap', loading: false });
      return null;
    }
  },
  createRoadmap: async (roadmap) => {
    if (useMockData) return;
    try {
      set({ loading: true, error: null });
      const newRoadmap = await api.createRoadmap(roadmap);
      set((state) => ({ roadmaps: [...state.roadmaps, newRoadmap], loading: false }));
    } catch (error) {
      set({ error: 'Failed to create roadmap', loading: false });
    }
  },
  generateRoadmap: async (goal) => {
    if (useMockData) return null;
    try {
      set({ loading: true, error: null });
      const newRoadmap = await api.generateRoadmap(goal);
      set((state) => ({
        roadmaps: newRoadmap ? [...state.roadmaps, newRoadmap] : state.roadmaps,
        loading: false,
      }));
      return newRoadmap;
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 'Failed to generate roadmap';
      set({ error: errorMessage, loading: false });
      throw error; // Re-throw the error so the calling component can handle it
    }
  },
}));
