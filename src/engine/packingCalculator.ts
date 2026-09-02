import { CartItem, PackageMetrics } from './types';

export function calculatePackageMetrics(items: CartItem[]): PackageMetrics {
  let totalWeightGrams = 0;
  let totalVolumeCm3 = 0;
  let maxDimensionCm = 0;
  let itemCount = 0;
  let hasFragile = false;
  let hasLiquid = false;
  let hasTemperatureSensitive = false;
  let hasHazardous = false;

  for (const item of items) {
    totalWeightGrams += item.weightGrams * item.quantity;
    
    const itemVolume = item.lengthCm * item.widthCm * item.heightCm;
    totalVolumeCm3 += itemVolume * item.quantity;
    
    const maxDim = Math.max(item.lengthCm, item.widthCm, item.heightCm);
    if (maxDim > maxDimensionCm) {
      maxDimensionCm = maxDim;
    }
    
    itemCount += item.quantity;
    
    if (item.isFragile) hasFragile = true;
    if (item.isLiquid) hasLiquid = true;
    if (item.isTemperatureSensitive) hasTemperatureSensitive = true;
    if (item.isHazardous) hasHazardous = true;
  }

  return {
    totalWeightGrams,
    totalVolumeCm3,
    maxDimensionCm,
    itemCount,
    hasFragile,
    hasLiquid,
    hasTemperatureSensitive,
    hasHazardous
  };
}
