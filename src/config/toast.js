import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

const SWIPE_THRESHOLD = 80;
const DISMISS_DISTANCE = 400;
const CLAMP = 200;

const SwipeableToast = ({ children, hide }) => {
  const translateX = useSharedValue(0);
  const isActive = useSharedValue(false);

  const dismissToast = () => {
    hide?.();
  };

  const pan = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-20, 20])
    .onStart(() => {
      isActive.value = true;
    })
    .onUpdate(event => {
      translateX.value = Math.max(-CLAMP, Math.min(CLAMP, event.translationX));
    })
    .onEnd(event => {
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        // Swiped past threshold — dismiss
        const direction = event.translationX > 0 ? DISMISS_DISTANCE : -DISMISS_DISTANCE;
        translateX.value = withTiming(direction, { duration: 200 }, () => {
          runOnJS(dismissToast)();
        });
      } else {
        // Snap back to center
        translateX.value = withSpring(0, {
          damping: 15,
          stiffness: 150,
        });
      }
      isActive.value = false;
    });

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      Math.abs(translateX.value),
      [0, CLAMP],
      [1, 0.3],
      Extrapolation.CLAMP,
    );

    const scale = interpolate(
      Math.abs(translateX.value),
      [0, CLAMP],
      [1, 0.95],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{ translateX: translateX.value }, { scale }],
      opacity,
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={animatedStyle}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

const baseStyle = {
  borderLeftWidth: 0,
  width: '92%',
  borderRadius: 14,
  elevation: 6,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.18,
  shadowRadius: 6,
};

const text1Style = {
  fontSize: 15,
  fontWeight: '600',
  color: '#FFFFFF',
};

const text2Style = {
  fontSize: 13,
};

const contentContainerStyle = {
  paddingHorizontal: 16,
};

export const toastConfig = {
  success: props => (
    <SwipeableToast hide={props.hide}>
      <BaseToast
        {...props}
        style={{ ...baseStyle, backgroundColor: '#16A34A' }}
        contentContainerStyle={contentContainerStyle}
        text1Style={text1Style}
        text2Style={{ ...text2Style, color: '#F0FDF4' }}
      />
    </SwipeableToast>
  ),
  error: props => (
    <SwipeableToast hide={props.hide}>
      <ErrorToast
        {...props}
        style={{ ...baseStyle, backgroundColor: '#DC2626' }}
        contentContainerStyle={contentContainerStyle}
        text1Style={text1Style}
        text2Style={{ ...text2Style, color: '#FEF2F2' }}
      />
    </SwipeableToast>
  ),
  warning: props => (
    <SwipeableToast hide={props.hide}>
      <BaseToast
        {...props}
        style={{ ...baseStyle, backgroundColor: '#F59E0B' }}
        contentContainerStyle={contentContainerStyle}
        text1Style={text1Style}
        text2Style={{ ...text2Style, color: '#FFFBEB' }}
      />
    </SwipeableToast>
  ),
  info: props => (
    <SwipeableToast hide={props.hide}>
      <ErrorToast
        {...props}
        style={{ ...baseStyle, backgroundColor: '#2563EB' }}
        contentContainerStyle={contentContainerStyle}
        text1Style={text1Style}
        text2Style={{ ...text2Style, color: '#EFF6FF' }}
      />
    </SwipeableToast>
  ),
};