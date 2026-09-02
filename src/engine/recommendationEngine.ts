import { DeliveryOption, ScoredOption, PreferenceWeight } from './types';

const weights = {
  FASTEST: { time: 0.6, cost: 0.15, sustainability: 0.1, reliability: 0.15 },
  CHEAPEST: { time: 0.15, cost: 0.6, sustainability: 0.1, reliability: 0.15 },
  SUSTAINABLE: { time: 0.1, cost: 0.15, sustainability: 0.6, reliability: 0.15 }
};

export function scoreDeliveryOptions(options: DeliveryOption[], preference: PreferenceWeight): ScoredOption[] {
  if (options.length === 0) return [];

  const maxTime = Math.max(...options.map(o => o.etaMinutes));
  const minTime = Math.min(...options.map(o => o.etaMinutes));
  const maxCost = Math.max(...options.map(o => o.customerFee));
  const minCost = Math.min(...options.map(o => o.customerFee));
  const maxCarbon = Math.max(...options.map(o => o.carbonEmissionsGrams));
  const minCarbon = Math.min(...options.map(o => o.carbonEmissionsGrams));

  const prefWeights = weights[preference];

  const scoredOptions: ScoredOption[] = options.map(opt => {
    const timeNorm = maxTime === minTime ? 1 : 1 - ((opt.etaMinutes - minTime) / (maxTime - minTime));
    const costNorm = maxCost === minCost ? 1 : 1 - ((opt.customerFee - minCost) / (maxCost - minCost));
    const carbonNorm = maxCarbon === minCarbon ? 1 : 1 - ((opt.carbonEmissionsGrams - minCarbon) / (maxCarbon - minCarbon));
    
    // reliabilityScore is assumed to be 0-1
    const score = (timeNorm * prefWeights.time) + (costNorm * prefWeights.cost) + (carbonNorm * prefWeights.sustainability) + (opt.reliabilityScore * prefWeights.reliability);
    
    const pros: string[] = [];
    const cons: string[] = [];

    if (timeNorm > 0.8) pros.push('Very fast delivery');
    else if (timeNorm < 0.3) cons.push('Slower delivery time');

    if (costNorm > 0.8) pros.push('Most affordable');
    else if (costNorm < 0.3) cons.push('Higher cost');

    if (carbonNorm > 0.8) pros.push('Environmentally friendly');
    else if (carbonNorm < 0.3) cons.push('High carbon footprint');

    return {
      ...opt,
      score,
      pros,
      cons
    };
  });

  return scoredOptions.sort((a, b) => b.score - a.score);
}
