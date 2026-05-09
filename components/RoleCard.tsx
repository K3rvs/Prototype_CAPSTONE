import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Platform,
  Pressable,
  Text,
  View
} from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface RoleCardProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  description: string;
  color: string;
  activeColor: string;
  lightBg: string;
  emoji: string;
  onClick: () => void;
}

export function RoleCard({
  icon,
  title,
  description,
  color,
  activeColor,
  lightBg,
  emoji,
  onClick,
}: RoleCardProps) {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const isHovered = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      isHovered.value,
      [0, 1],
      ["#ffffff", lightBg],
    );

    return {
      transform: [{ scale: scale.value }, { translateY: translateY.value }],
      shadowOpacity: interpolate(isHovered.value, [0, 1], [0.05, 0.25]),
      shadowRadius: interpolate(isHovered.value, [0, 1], [10, 30]),
      shadowOffset: { width: 0, height: 10 },
      shadowColor: activeColor,
      elevation: interpolate(isHovered.value, [0, 1], [2, 15]),
      backgroundColor,
    };
  });

  const handleHoverIn = () => {
    translateY.value = withTiming(-12, { duration: 200 });
    scale.value = withTiming(1.05, { duration: 200 });
    isHovered.value = withTiming(1, { duration: 200 });
  };

  const handleHoverOut = () => {
    translateY.value = withTiming(0, { duration: 200 });
    scale.value = withTiming(1, { duration: 200 });
    isHovered.value = withTiming(0, { duration: 200 });
  };

  // DESKTOP LAYOUT (Web)
  if (Platform.OS === "web") {
    return (
      <Animated.View
        style={[
          animatedStyle,
          { borderRadius: 48, width: 300, height: 340 },
        ]}
        className="mb-6 sm:m-4 flex-none border-2 border-slate-100/80"
      >
        <Pressable
          onPressIn={() => { scale.value = withTiming(0.96, { duration: 150 }); }}
          onPressOut={() => { scale.value = withTiming(1, { duration: 150 }); }}
          onPress={onClick}
          onHoverIn={handleHoverIn}
          onHoverOut={handleHoverOut}
          className="flex-1 w-full h-full p-6 overflow-hidden flex-col justify-center items-center"
          style={{ borderRadius: 48 }}
        >
          <View
            style={{ borderRadius: 32 }}
            className={`items-center justify-center ${color} shadow-lg mb-6 h-24 w-24`}
          >
            <Text className="text-5xl text-center">{emoji}</Text>
          </View>
          <View className="flex-1 items-center justify-center w-full">
            <Text className="text-2xl text-center mb-3 font-black text-slate-900 tracking-tight w-full" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-sm text-slate-500 font-medium leading-relaxed text-center px-4 w-full" numberOfLines={3}>
              {description}
            </Text>
          </View>
        </Pressable>
      </Animated.View>
    );
  }

  // MOBILE LAYOUT (Android/iOS)
  return (
    <Animated.View style={{ transform: [{ scale: scale.value }] }} className="w-full mb-3 px-2">
      <Pressable
        onPressIn={() => { scale.value = withTiming(0.96, { duration: 150 }); }}
        onPressOut={() => { scale.value = withTiming(1, { duration: 150 }); }}
        onPress={onClick}
        className={`w-full ${lightBg} p-5 rounded-[28px] border border-slate-200 flex-row items-center gap-4 shadow-sm active:border-slate-300`}
      >
        <View className={`w-16 h-16 rounded-2xl items-center justify-center ${color} shadow-sm border border-white`}>
          <Text className="text-4xl">{emoji}</Text>
        </View>
        <View className="flex-1 pr-2">
          <Text className="text-xl font-black text-slate-900 mb-0.5" numberOfLines={1}>{title}</Text>
          <Text className="text-xs text-slate-600 font-medium leading-relaxed" numberOfLines={2}>{description}</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={24} color="#cbd5e1" />
      </Pressable>
    </Animated.View>
  );
}
