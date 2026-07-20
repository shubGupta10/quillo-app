import { useState, useEffect } from 'react';

type Listener = (title: string | null) => void;

class BreadcrumbStore {
  private title: string | null = null;
  private listeners: Set<Listener> = new Set();

  getTitle() {
    return this.title;
  }

  setTitle(title: string | null) {
    this.title = title;
    this.listeners.forEach(l => l(title));
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

export const breadcrumbStore = new BreadcrumbStore();

export function useBreadcrumbTitle() {
  const [title, setTitle] = useState(breadcrumbStore.getTitle());

  useEffect(() => {
    return breadcrumbStore.subscribe(setTitle);
  }, []);

  return title;
}
