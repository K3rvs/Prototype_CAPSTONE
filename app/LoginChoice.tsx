import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginChoice() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { role } = route.params || {};

  const roleConfig = {
    admin: { color: "bg-purple-600", active: "active:bg-purple-700", text: "text-purple-600", bgLight: "bg-purple-50", icon: "shield-account" },
    teacher: { color: "bg-teal-600", active: "active:bg-teal-700", text: "text-teal-600", bgLight: "bg-teal-50", icon: "book-open-outline" },
    student: { color: "bg-orange-600", active: "active:bg-orange-700", text: "text-orange-600", bgLight: "bg-orange-50", icon: "school" },
  }[role as string] || { color: "bg-indigo-600", active: "active:bg-indigo-700", text: "text-indigo-600", bgLight: "bg-indigo-50", icon: "account" };

  return (
    <SafeAreaView className={`flex-1 ${roleConfig.bgLight} justify-center items-center p-6`}>
      <View className="absolute top-6 left-6 z-50">
        <Pressable onPress={() => navigation.goBack()} className="flex-row items-center justify-center w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm active:bg-slate-50 transition-colors">
          <MaterialCommunityIcons name="arrow-left" size={24} color="#475569" />
        </Pressable>
      </View>

      <Animated.View entering={FadeInDown.duration(400)} className="w-full max-w-md bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-xl border border-slate-200 items-center">
        <View className={`w-28 h-28 rounded-[2rem] items-center justify-center mb-6 shadow-md border-4 border-white ${roleConfig.color}`}>
          <MaterialCommunityIcons name={roleConfig.icon as any} size={56} color="white" />
        </View>
        
        <Text className="text-3xl font-black text-slate-900 mb-2 capitalize tracking-tight">{role} Portal</Text>
        <Text className="text-slate-600 text-center font-medium mb-10 leading-relaxed">
          Welcome to the i++ LMS ecosystem. How would you like to proceed with your {role} account today?
        </Text>

        <View className="w-full gap-4">
          <Pressable 
            onPress={() => navigation.navigate("LoginAuth", { role })} 
            className={`w-full py-5 rounded-2xl items-center shadow-lg transition-transform active:scale-95 ${roleConfig.color} ${roleConfig.active}`}
          >
            <Text className="text-white font-black text-lg tracking-wide flex-row items-center gap-2">
               <MaterialCommunityIcons name="login" size={20} color="white" /> Log In
            </Text>
          </Pressable>
          
          <Pressable 
            onPress={() => navigation.navigate("LoginVerifySchool", { role })} 
            className="w-full py-5 rounded-2xl items-center bg-white border-2 border-slate-200 active:bg-slate-50 transition-transform active:scale-95"
          >
            <Text className="text-slate-700 font-bold text-lg tracking-wide flex-row items-center gap-2">
              <MaterialCommunityIcons name="account-plus-outline" size={20} color="#334155" /> Sign Up / Verify
            </Text>
          </Pressable>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}