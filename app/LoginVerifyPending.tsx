import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginVerifyPending() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { role, school } = route.params || {};
  const [step, setStep] = useState(0);

  const spinValue = useSharedValue(0);
  const progressValue = useSharedValue(0);
  const pulseValue = useSharedValue(1);
  const ripple1 = useSharedValue(0);
  const ripple2 = useSharedValue(0);
  const ripple3 = useSharedValue(0);

  const steps = [
    "Encrypting credentials (SHA-256)...",
    "Securing your School Domain...",
    "i++ developers verifying identity...",
    "Dispatching SSO + MFA setup email...",
  ];

  useEffect(() => {
    // Continuous spinning animation
    spinValue.value = 0;
    spinValue.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.linear }),
      -1,
      false,
    );

    // Radar ripple animation
    ripple1.value = 0;
    ripple2.value = 0;
    ripple3.value = 0;
    ripple1.value = withRepeat(
      withTiming(1, { duration: 3000, easing: Easing.out(Easing.ease) }),
      -1,
      false,
    );
    ripple2.value = withDelay(
      1000,
      withRepeat(
        withTiming(1, { duration: 3000, easing: Easing.out(Easing.ease) }),
        -1,
        false,
      ),
    );
    ripple3.value = withDelay(
      2000,
      withRepeat(
        withTiming(1, { duration: 3000, easing: Easing.out(Easing.ease) }),
        -1,
        false,
      ),
    );

    // Pulse animation for the bypass button
    pulseValue.value = 1;
    pulseValue.value = withRepeat(
      withSequence(
        withTiming(1.02, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );

    // Simulate progression
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev < steps.length - 1) {
          progressValue.value = withTiming(((prev + 1) / steps.length) * 100, {
            duration: 500,
          });
          return prev + 1;
        }
        clearInterval(interval);
        setTimeout(() => handleComplete(), 1000);
        return prev;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const animatedSpin = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spinValue.value * 360}deg` }],
  }));

  const animatedProgress = useAnimatedStyle(() => ({
    width: `${progressValue.value}%`,
  }));

  const animatedPulse = useAnimatedStyle(() => ({
    transform: [{ scale: pulseValue.value }],
  }));

  const rStyle1 = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + ripple1.value * 2 }],
    opacity: 1 - ripple1.value,
  }));
  const rStyle2 = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + ripple2.value * 2 }],
    opacity: 1 - ripple2.value,
  }));
  const rStyle3 = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + ripple3.value * 2 }],
    opacity: 1 - ripple3.value,
  }));

  const handleComplete = () => {
    navigation.replace("LoginVerifySuccess", { role, school });
  };

  return (
    <SafeAreaView className="flex-1 bg-indigo-50">
      <ScrollView contentContainerClassName="flex-grow justify-center p-4 sm:p-6 mx-auto w-full max-w-xl">
        <View className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-lg items-center">
          <View className="relative items-center justify-center mb-8 mt-4">
            <Animated.View
              style={rStyle1}
              className="absolute w-24 h-24 rounded-full border-2 border-indigo-400"
            />
            <Animated.View
              style={rStyle2}
              className="absolute w-24 h-24 rounded-full border-2 border-indigo-400"
            />
            <Animated.View
              style={rStyle3}
              className="absolute w-24 h-24 rounded-full border-2 border-indigo-400"
            />
            <Animated.View
              style={animatedSpin}
              className="h-24 w-24 rounded-full border-4 border-indigo-100 border-t-indigo-600 border-r-indigo-600 items-center justify-center bg-white shadow-sm z-10"
            >
              <MaterialCommunityIcons
                name="shield-check"
                size={40}
                color="#4f46e5"
              />
            </Animated.View>
          </View>

          <Text className="text-2xl font-bold text-slate-900 mb-2">
            Verification Pending
          </Text>
          <Text className="text-slate-600 text-center mb-8">
            Hang tight — we're securing your academic workspace.
          </Text>

          <View className="w-full h-3 bg-slate-100 rounded-full mb-6 overflow-hidden">
            <Animated.View
              style={animatedProgress}
              className="h-full bg-indigo-600 rounded-full"
            />
          </View>

          <View className="w-full space-y-3 gap-3 mb-8">
            {steps.map((label, index) => {
              const isActive = index === step;
              const isDone = index < step;
              return (
                <View
                  key={index}
                  className={`flex-row items-center gap-3 p-4 rounded-2xl border ${isActive ? "bg-indigo-50 border-indigo-200" : isDone ? "bg-emerald-50 border-emerald-200" : "bg-slate-50 border-slate-100"}`}
                >
                  {isActive ? (
                    <ActivityIndicator color="#4f46e5" />
                  ) : (
                    <MaterialCommunityIcons
                      name={isDone ? "check-circle" : "circle-outline"}
                      size={24}
                      color={isDone ? "#10b981" : "#cbd5e1"}
                    />
                  )}
                  <Text
                    className={`font-medium ${isActive ? "text-indigo-800" : isDone ? "text-emerald-800" : "text-slate-400"}`}
                  >
                    {label}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* Bypass Button */}
          <Animated.View style={animatedPulse} className="w-full mt-4">
            <Pressable
              onPress={handleComplete}
              className="w-full py-4 rounded-2xl border border-slate-300 bg-white items-center hover:bg-slate-50 active:bg-slate-100 transition-colors"
            >
              <Text className="text-slate-700 font-bold">
                Bypass Verification (Dev Mode)
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
