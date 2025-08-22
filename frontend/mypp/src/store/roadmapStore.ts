import { create } from "zustand"; 
import * as api from '../services/api';
import { Roadmap } from '../types/index';

const useMockData = !process.env.REACT_APP_API_URL;

interface RoadmapStore {
  roadmaps: Roadmap[];
  loading: boolean; 
  error: string | null;
  fetchRoadmaps: () => Promise<void>;
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
    } catch (error) {
      set({ error: 'Failed to generate roadmap', loading: false });
      return null;
    }
  },
}));
