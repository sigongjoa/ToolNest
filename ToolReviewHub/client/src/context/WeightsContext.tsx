import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Weights {
  accuracy: number;
  latency: number;
  cost: number;
  usability: number;
  stability: number;
}

interface WeightsContextType {
  weights: Weights;
  setWeights: React.Dispatch<React.SetStateAction<Weights>>;
}

const WeightsContext = createContext<WeightsContextType | undefined>(undefined);

export const WeightsProvider = ({ children }: { children: ReactNode }) => {
  console.debug('WeightsProvider: Initializing weights state.');
  const [weights, setWeights] = useState<Weights>({
    accuracy: 0.2,
    latency: 0.2,
    cost: 0.2,
    usability: 0.2,
    stability: 0.2,
  });

  return (
    <WeightsContext.Provider value={{ weights, setWeights }}>
      {children}
    </WeightsContext.Provider>
  );
};

export const useWeights = () => {
  console.debug('useWeights: Hook called.');
  const context = useContext(WeightsContext);
  if (context === undefined) {
    console.error('useWeights must be used within a WeightsProvider');
    throw new Error('useWeights must be used within a WeightsProvider');
  }
  console.debug('useWeights: Returning context.', context.weights);
  return context;
}; 