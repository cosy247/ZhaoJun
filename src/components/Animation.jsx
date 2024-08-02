import { useEffect, useRef, useState } from 'react';
import { Animated, View } from 'react-native';

function Animation({ animationStyle, isStartRender, renderKey, duration, delay, isText, style, children }) {
  const [cStyle] = useState(
    Object.entries(animationStyle).reduce((style, [attr, [from, to]]) => {
      style[attr] = useRef(new Animated.Value(isStartRender ? from : to)).current;
      return style;
    }, {})
  );

  useEffect(() => {
    if (renderKey === 0) return;
    Object.entries(animationStyle).forEach(([attr, [from, to]]) => {
      cStyle[attr].setValue(from);
    });
  }, [renderKey]);

  Object.entries(animationStyle).forEach(([attr, [from, to]]) => {
    useEffect(() => {
      setTimeout(() => {
        Animated.timing(cStyle[attr], {
          toValue: to,
          duration: duration,
          useNativeDriver: false,
        }).start();
      }, delay || 0);
    }, [cStyle[attr], renderKey]);
  });

  return isText ? (
    <Animated.Text style={[style, cStyle]}>{children}</Animated.Text>
  ) : (
    <Animated.View style={[style, cStyle]}>{children}</Animated.View>
  );
}

export default Animation;
