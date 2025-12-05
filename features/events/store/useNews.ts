import { create } from 'zustand';
import { NewsItem } from '../types';

type Store = {
  news: NewsItem | null;
  setNews: (news: NewsItem) => void;
  clearNews: () => void;
};

export const useNews = create<Store>()((set) => ({
  news: null,
  setNews: (news) => set({ news }),
  clearNews: () => set({ news: null }),
}));
