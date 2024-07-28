import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

function Animation(props) {
  const [style] = useState(
    Object.entries(props.animationStyle).reduce((style, [attr, [from, to]]) => {
      style[attr] = useRef(new Animated.Value(props.isStartRender ? from : to)).current;
      return style;
    }, {})
  );

  useEffect(() => {
    if (props.renderKey === 0) return;
    Object.entries(props.animationStyle).forEach(([attr, [from, to]]) => {
      style[attr].setValue(from);
    });
  }, [props.renderKey]);

  Object.entries(props.animationStyle).forEach(([attr, [from, to]]) => {
    useEffect(() => {
      Animated.timing(style[attr], {
        toValue: to,
        duration: props.duration,
        useNativeDriver: false,
      }).start();
    }, [style[attr], props.renderKey]);
  });

  return props.isText ? (
    <Animated.Text style={[props.style, style]}>{props.children}</Animated.Text>
  ) : (
    <Animated.View style={[props.style, style]}>{props.children}</Animated.View>
  );
}

export default Animation;
