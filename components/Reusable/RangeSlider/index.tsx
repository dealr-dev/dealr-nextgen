import Slider from '@react-native-community/slider';
import React, { useCallback, useMemo, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';

type Props = {
  min: number;
  max: number;
  initialFromValue?: number;
  initialToValue?: number;
  fromValueOnChange?: (v: number) => void;
  toValueOnChange?: (v: number) => void;
  step?: number;

  // visual props kept for API compatibility
  inRangeBarColor?: string;        // center segment
  outOfRangeBarColor?: string;     // base track color
  fromKnobColor?: string;
  toKnobColor?: string;
  showRangeLabels?: boolean;
  showValueLabels?: boolean;
  style?: any;
};

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

export default function RangeSlider({
  min,
  max,
  initialFromValue,
  initialToValue,
  fromValueOnChange,
  toValueOnChange,
  step = 1,
  inRangeBarColor = '#3b82f6',
  outOfRangeBarColor = '#d1d5db',
  fromKnobColor = '#3b82f6',
  toKnobColor = '#3b82f6',
  showRangeLabels = false,    // kept for compatibility; not rendered here
  showValueLabels = false,    // kept for compatibility; not rendered here
  style,
}: Props) {
  const [width, setWidth] = useState(0);

  const initialFrom = useMemo(
    () => clamp(initialFromValue ?? min, min, max),
    [initialFromValue, min, max]
  );
  const initialTo = useMemo(
    () => clamp(initialToValue ?? max, min, max),
    [initialToValue, min, max]
  );

  const [from, setFrom] = useState<number>(Math.min(initialFrom, initialTo));
  const [to, setTo] = useState<number>(Math.max(initialFrom, initialTo));

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  }, []);

  const rangePct = useMemo(() => {
    const span = max - min || 1;
    const left = ((from - min) / span) * 100;
    const right = 100 - ((to - min) / span) * 100;
    return { left, right };
  }, [from, to, min, max]);

  // Handlers keep thumbs from crossing
  const handleFromChange = useCallback(
    (v: number) => {
      const next = clamp(v, min, to);
      setFrom(next);
      fromValueOnChange?.(next);
    },
    [min, to, fromValueOnChange]
  );

  const handleToChange = useCallback(
    (v: number) => {
      const next = clamp(v, from, max);
      setTo(next);
      toValueOnChange?.(next);
    },
    [from, max, toValueOnChange]
  );

  return (
    <View style={[styles.container, style]} onLayout={onLayout}>
      {/* Base track */}
      <View style={[styles.track, { backgroundColor: outOfRangeBarColor }]} />

      {/* In-range segment */}
      <View
        pointerEvents="none"
        style={[
          styles.inRange,
          {
            left: `${rangePct.left}%`,
            right: `${rangePct.right}%`,
            backgroundColor: inRangeBarColor,
          },
        ]}
      />

      {/* Overlaid sliders with transparent tracks; only thumbs visible */}
      <Slider
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={from}
        onValueChange={handleFromChange}
        minimumTrackTintColor="transparent"
        maximumTrackTintColor="transparent"
        thumbTintColor={fromKnobColor}
        style={[styles.slider, { width }]}
      />
      <Slider
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={to}
        onValueChange={handleToChange}
        minimumTrackTintColor="transparent"
        maximumTrackTintColor="transparent"
        thumbTintColor={toKnobColor}
        style={[styles.slider, { width }]}
      />
    </View>
  );
}

const THUMB_TOUCH_HEIGHT = 40; // improves touch area

const styles = StyleSheet.create({
  container: {
    height: THUMB_TOUCH_HEIGHT,
    justifyContent: 'center',
  },
  track: {
    position: 'absolute',
    height: 6,
    borderRadius: 6,
    left: 0,
    right: 0,
  },
  inRange: {
    position: 'absolute',
    height: 6,
    borderRadius: 6,
  },
  slider: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: THUMB_TOUCH_HEIGHT,
  },
});
