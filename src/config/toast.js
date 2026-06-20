import React, { useRef, useMemo } from 'react';
import { Animated, PanResponder } from 'react-native';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

const SWIPE_THRESHOLD = 80;

const SwipeableToast = ({ children, hide }) => {
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gs) =>
          Math.abs(gs.dx) > 10 && Math.abs(gs.dx) > Math.abs(gs.dy),
        onPanResponderMove: (_, gs) => {
          const clamped = Math.max(-200, Math.min(200, gs.dx));
          translateX.setValue(clamped);
        },
        onPanResponderRelease: (_, gs) => {
          if (Math.abs(gs.dx) > SWIPE_THRESHOLD) {
            Animated.timing(translateX, {
              toValue: gs.dx > 0 ? 400 : -400,
              duration: 200,
              useNativeDriver: true,
            }).start(() => hide?.());
          } else {
            Animated.spring(translateX, {
              toValue: 0,
              useNativeDriver: true,
              friction: 7,
            }).start();
          }
        },
      }),
    [hide],
  );

  const opacity = translateX.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [0.3, 1, 0.3],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={{ transform: [{ translateX }], opacity }}
      {...panResponder.panHandlers}
    >
      {children}
    </Animated.View>
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