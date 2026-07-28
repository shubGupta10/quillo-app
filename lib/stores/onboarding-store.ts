import { useState, useEffect } from 'react';
import { IProjectOnboarding } from '@/features/projects/models/project.interface';

type OnboardingState = {
    projectId: string;
    projectName: string;
    onboarding: IProjectOnboarding;
} | null;

type Listener = (state: OnboardingState) => void;

class OnboardingStore {
    private state: OnboardingState = null;
    private listeners: Set<Listener> = new Set();

    getState() {
        return this.state;
    }

    setState(state: OnboardingState) {
        this.state = state;
        this.listeners.forEach(l => l(state));
    }

    clear() {
        this.state = null;
        this.listeners.forEach(l => l(null));
    }

    subscribe(listener: Listener) {
        this.listeners.add(listener);
        return () => {
            this.listeners.delete(listener);
        };
    }
}

export const onboardingStore = new OnboardingStore();

export function useOnboardingState() {
    const [state, setState] = useState(onboardingStore.getState());

    useEffect(() => {
        return onboardingStore.subscribe(setState);
    }, []);

    return state;
}
