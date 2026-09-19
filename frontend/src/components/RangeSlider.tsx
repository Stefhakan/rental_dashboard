interface RangeSliderProps {
  min: number
  max: number
  step: number
  low: number
  high: number
  onChange: (low: number, high: number) => void
  labelLow: string
  labelHigh: string
}

/**
 * Two native range inputs stacked on one track. Only the thumbs take pointer
 * events, so whichever thumb you grab is the one that moves.
 */
export function RangeSlider({
  min,
  max,
  step,
  low,
  high,
  onChange,
  labelLow,
  labelHigh,
}: RangeSliderProps) {
  const span = max - min
  const leftPct = ((low - min) / span) * 100
  const rightPct = ((high - min) / span) * 100

  return (
    <div className="range">
      <span className="range-value">{labelLow}</span>

      <div
        className="range-track"
        style={{
          ['--range-start' as string]: `${leftPct}%`,
          ['--range-end' as string]: `${rightPct}%`,
        }}
      >
        <div className="range-rail" aria-hidden="true" />
        <div className="range-fill" aria-hidden="true" />
        <input
          type="range"
          className="range-input"
          min={min}
          max={max}
          step={step}
          value={low}
          aria-label="Minimum budget"
          onChange={(event) =>
            onChange(Math.min(Number(event.target.value), high - step), high)
          }
        />
        <input
          type="range"
          className="range-input"
          min={min}
          max={max}
          step={step}
          value={high}
          aria-label="Maximum budget"
          onChange={(event) =>
            onChange(low, Math.max(Number(event.target.value), low + step))
          }
        />
      </div>

      <span className="range-value">{labelHigh}</span>
    </div>
  )
}
