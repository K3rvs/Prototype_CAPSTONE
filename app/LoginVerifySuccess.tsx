import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginVerifySuccess() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { role, school } = route.params || {};

  const config = {
    admin: {
      title: "Welcome, School Admin! 🎉",
      sub: "Your School Domain has been provisioned.",
      color: "bg-purple-600",
      steps: [
        "Check your inbox for SSO credentials",
        "Set up Multi-Factor Authentication (MFA)",
        "Begin onboarding teachers",
      ],
    },
    teacher: {
      title: "You're approved, Teacher! 📚",
      sub: "Your School Admin has cleared you for the classroom.",
      color: "bg-teal-600",
      steps: [
        "Click the SSO link in your email",
        "Create your Classroom Sub-Domains",
        "Upload syllabi for Classroom AI",
      ],
    },
    student: {
      title: "Welcome to i++! 🚀",
      sub: "Your wallet-less Academic Passport is ready.",
      color: "bg-orange-600",
      steps: [
        "Sign in via SSO from your email",
        "Join your enrolled classes",
        "Earn your first Soulbound Token!",
      ],
    },
  }[role as string] || {
    title: "Success!",
    sub: "You are verified.",
    color: "bg-indigo-600",
    steps: [],
  };

  const translateY = useSharedValue(0);
  const ringScale = useSharedValue(0.5);
  const ringOpacity = useSharedValue(1);

  useEffect(() => {
    translateY.value = 0;
    translateY.value = withRepeat(
      withSequence(
        withTiming(-12, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );

    ringScale.value = 0.5;
    ringOpacity.value = 1;
    ringScale.value = withTiming(2.5, {
      duration: 1200,
      easing: Easing.out(Easing.ease),
    });
    ringOpacity.value = withTiming(0, {
      duration: 1200,
      easing: Easing.out(Easing.ease),
    });
  }, []);

  const floatingStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ringScale.value }],
    opacity: ringOpacity.value,
  }));

  return (
    <SafeAreaView className="flex-1 bg-indigo-50">
      <ScrollView contentContainerClassName="flex-grow justify-center p-4 sm:p-6 mx-auto w-full max-w-xl">
        <Animated.View
          entering={FadeInDown.duration(600)}
          className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-lg items-center"
        >
          <Animated.View entering={FadeIn.delay(300)}>
            <View className="relative items-center justify-center mb-6">
              <Animated.View
                style={ringStyle}
                className={`absolute w-24 h-24 rounded-full ${config.color}`}
              />
              <Animated.View
                style={floatingStyle}
                className={`h-24 w-24 rounded-full ${config.color} items-center justify-center shadow-lg z-10`}
              >
                <MaterialCommunityIcons
                  name="check-decagram"
                  size={56}
                  color="white"
                />
              </Animated.View>
            </View>
          </Animated.View>

          <Text className="text-3xl font-bold text-slate-900 mb-2 text-center">
            {config.title}
          </Text>
          <Text className="text-slate-600 text-center mb-8 text-base">
            {config.sub}
          </Text>

          <View className="w-full bg-indigo-50 rounded-2xl p-5 mb-8 border border-indigo-100">
            <View className="flex-row items-center gap-2 mb-2">
              <MaterialCommunityIcons
                name="email-fast"
                size={20}
                color="#4f46e5"
              />
              <Text className="text-indigo-800 font-bold">
                Encrypted email sent to:
              </Text>
            </View>
            <Text className="text-slate-900 font-medium">
              user@
              {school
                ? String(school).replace(/\s+/g, "").toLowerCase()
                : "school"}
              .edu.ph
            </Text>
          </View>

          <View className="w-full space-y-3 gap-3 mb-10">
            <Text className="text-slate-700 font-bold mb-1">Next steps:</Text>
            {config.steps.map((step, index) => (
              <View
                key={index}
                className="flex-row items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100"
              >
                <View
                  className={`h-8 w-8 rounded-full ${config.color} items-center justify-center`}
                >
                  <Text className="text-white font-bold">{index + 1}</Text>
                </View>
                <Text className="text-slate-700 flex-1 font-medium">
                  {step}
                </Text>
              </View>
            ))}
          </View>

          <Pressable
            onPress={() => {
              const currentRole = Array.isArray(role) ? role[0] : role;
              if (currentRole === "admin") {
                navigation.replace("admin");
              } else if (currentRole === "teacher") {
                navigation.replace("teacher");
              } else if (currentRole === "student") {
                navigation.replace("student");
              } else {
                navigation.replace("index");
              }
            }}
            className={`w-full py-4 rounded-2xl ${config.color} items-center shadow-md active:opacity-80`}
          >
            <Text className="text-white font-bold text-lg flex-row items-center">
              Go to Dashboard{" "}
              <MaterialCommunityIcons
                name="arrow-right"
                size={18}
                color="white"
              />
            </Text>
          </Pressable>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
