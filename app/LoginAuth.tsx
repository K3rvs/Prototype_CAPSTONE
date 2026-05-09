import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from "react-native";
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginAuth() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { role } = route.params || {};

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const roleConfig = {
    admin: { color: "bg-purple-600", activeColor: "active:bg-purple-700", text: "text-purple-700", focus: "focus:border-purple-500", bgLight: "bg-purple-50", icon: "shield-account" },
    teacher: { color: "bg-teal-600", activeColor: "active:bg-teal-700", text: "text-teal-700", focus: "focus:border-teal-500", bgLight: "bg-teal-50", icon: "book-open-outline" },
    student: { color: "bg-orange-500", activeColor: "active:bg-orange-600", text: "text-orange-700", focus: "focus:border-orange-500", bgLight: "bg-orange-50", icon: "controller-classic" },
  }[role as string] || { color: "bg-indigo-600", activeColor: "active:bg-indigo-700", text: "text-indigo-700", focus: "focus:border-indigo-500", bgLight: "bg-indigo-50", icon: "account" };

  const float1 = useSharedValue(0);
  const float2 = useSharedValue(0);

  useEffect(() => {
    if (role === 'student') {
      float1.value = withRepeat(withSequence(withTiming(-15, { duration: 1500 }), withTiming(0, { duration: 1500 })), -1, true);
      float2.value = withRepeat(withSequence(withTiming(15, { duration: 1800 }), withTiming(0, { duration: 1800 })), -1, true);
    }
  }, [role]);

  const floatStyle1 = useAnimatedStyle(() => ({ transform: [{ translateY: float1.value }] }));
  const floatStyle2 = useAnimatedStyle(() => ({ transform: [{ translateY: float2.value }] }));

  const handleLogin = () => {
    setIsAuthenticating(true);
    // Simulate API Auth Request
    setTimeout(() => {
      setIsAuthenticating(false);
      const dashboardRoute = role === "admin" ? "admin" : role === "teacher" ? "teacher" : "student";
      navigation.replace(dashboardRoute);
    }, 1500);
  };

  return (
    <SafeAreaView className={`flex-1 ${roleConfig.bgLight} relative overflow-hidden`}>
      {/* Fun Student Decorators */}
      {role === 'student' && (
        <>
          {Platform.OS === "web" && (
            <>
              <View className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-orange-400/20 rounded-full blur-[80px] pointer-events-none z-0" />
              <View className="absolute bottom-[-50px] right-[-50px] w-72 h-72 bg-amber-400/20 rounded-full blur-[100px] pointer-events-none z-0" />
            </>
          )}

          <Animated.View style={floatStyle1} className="absolute top-[15%] right-[10%] opacity-50 pointer-events-none hidden sm:flex z-0">
            <Text className="text-6xl">🚀</Text>
          </Animated.View>
          <Animated.View style={floatStyle2} className="absolute bottom-[15%] left-[10%] opacity-50 pointer-events-none hidden sm:flex z-0">
            <Text className="text-6xl">🏆</Text>
          </Animated.View>
          <Animated.View style={floatStyle1} className="absolute top-[40%] left-[5%] opacity-40 pointer-events-none z-0">
            <Text className="text-4xl">🌟</Text>
          </Animated.View>
          <Animated.View style={floatStyle2} className="absolute top-[60%] right-[5%] opacity-40 pointer-events-none z-0">
            <Text className="text-4xl">💡</Text>
          </Animated.View>
        </>
      )}

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 justify-center items-center p-6 z-10">
        <View className="absolute top-6 left-2 sm:left-6 z-50">
          <Pressable onPress={() => navigation.goBack()} className="flex-row items-center justify-center w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm active:bg-slate-50 transition-colors">
            <MaterialCommunityIcons name="arrow-left" size={24} color="#475569" />
          </Pressable>
        </View>

        <Animated.View entering={FadeInDown.duration(400)} className="w-full max-w-md bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-300/50 border border-slate-200 z-20">
          <View className="items-center mb-8">
            <View className={`w-20 h-20 rounded-[1.5rem] items-center justify-center mb-4 shadow-sm ${roleConfig.color}`}>
              <MaterialCommunityIcons name={roleConfig.icon as any} size={40} color="white" />
            </View>
            <Text className="text-3xl font-black text-slate-900 tracking-tight capitalize text-center">{role === 'student' ? 'Student Portal' : `${role} Login`}</Text>
            <Text className="text-slate-600 font-medium mt-2 text-center leading-relaxed px-2">
              {role === 'student' ? "Level up your learning! Enter your credentials to jump back into the game." : "Enter your credentials to securely access your workspace."}
            </Text>
          </View>

          <View className="gap-5">
            <View>
              <Text className="text-slate-800 font-bold mb-2 ml-1 text-sm">Email Address</Text>
              <View className={`flex-row items-center bg-slate-50 border border-slate-300 rounded-2xl px-4 py-2 focus-within:bg-white transition-colors ${roleConfig.focus}`}>
                <MaterialCommunityIcons name="email-outline" size={22} color="#64748b" />
                <TextInput
                  placeholder={role === 'student' ? "student@school.edu.ph" : "name@school.edu.ph"}
                  placeholderTextColor="#94a3b8"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="flex-1 h-12 ml-3 text-slate-900 text-base outline-none font-bold"
                />
              </View>
            </View>

            <View>
              <Text className="text-slate-800 font-bold mb-2 ml-1 text-sm">Password</Text>
              <View className={`flex-row items-center bg-slate-50 border border-slate-300 rounded-2xl px-4 py-2 focus-within:bg-white transition-colors ${roleConfig.focus}`}>
                <MaterialCommunityIcons name="lock-outline" size={22} color="#64748b" />
                <TextInput
                  placeholder="••••••••"
                  placeholderTextColor="#94a3b8"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  className="flex-1 h-12 ml-3 text-slate-900 text-base outline-none font-bold tracking-widest"
                />
                <Pressable onPress={() => setShowPassword(!showPassword)} className="p-2 -mr-2">
                  <MaterialCommunityIcons name={showPassword ? "eye-off-outline" : "eye-outline"} size={22} color="#64748b" />
                </Pressable>
              </View>
            </View>

            <View className="flex-row justify-end mb-2">
              <Pressable className="px-2 py-1">
                <Text className={`${roleConfig.text} font-bold text-sm hover:underline`}>Forgot Password?</Text>
              </Pressable>
            </View>

            <Pressable
              onPress={handleLogin}
              disabled={isAuthenticating || !email || !password}
              className={`w-full py-4.5 rounded-2xl items-center justify-center flex-row shadow-md transition-transform active:scale-95 ${!email || !password ? "bg-slate-300" : `${roleConfig.color} ${roleConfig.activeColor}`}`}
            >
              {isAuthenticating ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-black text-lg tracking-wide uppercase">Sign In</Text>
              )}
            </Pressable>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}