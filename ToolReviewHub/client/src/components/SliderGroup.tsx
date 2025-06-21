import { useWeights } from '../context/WeightsContext';
import { Label } from './ui/label';
import { Slider } from './ui/slider';

export default function SliderGroup() {
  console.debug('SliderGroup: Rendering slider group.');
  const { weights, setWeights } = useWeights();

  const handleSliderChange = (key: string, value: number[]) => {
    console.debug(`SliderGroup: Updating weight for ${key} to ${value[0]}.`);
    setWeights(w => ({
      ...w,
      [key]: parseFloat(value[0].toFixed(2)),
    }));
  };

  return (
    <div className="grid gap-4 py-4">
      {Object.entries(weights).map(([key, val]) => (
        <div key={key} className="flex items-center space-x-2">
          <Label htmlFor={key} className="capitalize w-24">
            {key}:
          </Label>
          <Slider
            id={key}
            min={0}
            max={1}
            step={0.01}
            value={[val]}
            onValueChange={(value) => handleSliderChange(key, value)}
            className="flex-grow"
          />
          <span className="w-12 text-right">{(val * 100).toFixed(0)}%</span>
        </div>
      ))}
    </div>
  );
} 