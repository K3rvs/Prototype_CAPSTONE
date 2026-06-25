import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Platform, Pressable, ScrollView, Text, TextInput, View, Image } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useAuth } from "@/AuthContext";
import { useNavigation } from "@react-navigation/native";

export const TeacherProfileSection = ({ goBack }: any) => {
  const { logout } = useAuth();
  const navigation = useNavigation<any>();

  const handleLogout = () => {
    logout();
    navigation.replace("index");
  };

  return (
    <View 
      className="flex-1 w-full bg-slate-50/50 z-30" 
      style={Platform.OS === 'web' ? { position: 'fixed', top: 64, left: 0, right: 0, bottom: 0 } as any : {}}
    >
      <ScrollView className="flex-1 w-full" contentContainerClassName="p-4 sm:p-8 pb-16 flex-grow">
        <Animated.View entering={FadeIn} className="flex-1 max-w-4xl mx-auto w-full">
          {/* Header */}
          <View className="flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm z-10">
            <View className="flex-row items-center gap-4 flex-1">
              <Pressable onPress={goBack} className="w-8 h-8 bg-slate-100 rounded-full items-center justify-center hover:bg-slate-200 active:bg-slate-300 transition-colors">
                 <MaterialCommunityIcons name="arrow-left" size={20} color="#475569" />
              </Pressable>
              <View className="flex-1">
                <Text className="text-2xl font-black text-slate-900 tracking-tight">My Profile</Text>
                <Text className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed font-medium">
                  Manage your personal details, security settings, and preferences.
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-col lg:flex-row gap-8">
            {/* Left Col: Overview */}
            <Animated.View entering={FadeInDown.delay(100)} className="w-full lg:w-1/3 flex-col gap-4">
              <View className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm items-center">
                <View className="w-24 h-24 bg-teal-100 rounded-full items-center justify-center border-4 border-teal-50 shadow-sm mb-3 relative">
                  <Image source={{ uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" }} style={{ width: '100%', height: '100%', borderRadius: 999 }} />
                  <Pressable className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full items-center justify-center shadow-md border border-slate-100 active:bg-slate-50 transition-colors">
                    <MaterialCommunityIcons name="camera-outline" size={16} color="#64748b" />
                  </Pressable>
                </View>
                <Text className="text-xl font-black text-slate-900 mb-1">Milio Velasquez</Text>
                <Text className="text-slate-500 font-medium text-sm mb-3">m.velasquez@deped.gov.ph</Text>
                
                <View className="bg-teal-50 px-3 py-1.5 rounded-full border border-teal-200">
                  <Text className="text-teal-800 text-[10px] font-black uppercase tracking-widest">Subject Teacher</Text>
                </View>
              </View>

              <View className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm gap-3">
                <Text className="text-base font-black text-slate-800 mb-1">Account Activity</Text>
                <View className="flex-row items-center justify-between py-2 border-b border-slate-100">
                  <Text className="text-slate-500 font-medium text-sm">Last Login</Text>
                  <Text className="text-slate-800 font-bold text-sm">Today, 08:45 AM</Text>
                </View>
                <View className="flex-row items-center justify-between py-2 border-b border-slate-100">
                  <Text className="text-slate-500 font-medium text-sm">Active Sessions</Text>
                  <Text className="text-slate-800 font-bold text-sm">1 Device</Text>
                </View>
                <View className="flex-row items-center justify-between py-2">
                  <Text className="text-slate-500 font-medium text-sm">Password Changed</Text>
                  <Text className="text-slate-800 font-bold text-sm">6 months ago</Text>
                </View>
              </View>

            </Animated.View>

            {/* Right Col: Edit Form */}
            <Animated.View entering={FadeInDown.delay(200)} className="w-full lg:w-2/3 flex-col gap-4">
              <View className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
                <Text className="text-lg font-black text-slate-900 mb-4">Personal Information</Text>
                
                <View className="gap-4 mb-6">
                  <View className="flex-col sm:flex-row gap-4">
                    <View className="flex-1">
                      <Text className="text-slate-700 font-bold mb-2 text-sm">First Name</Text>
                      <TextInput defaultValue="Milio" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 outline-none text-slate-800 text-sm focus:border-teal-500 focus:bg-white transition-colors shadow-sm" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-slate-700 font-bold mb-2 text-sm">Last Name</Text>
                      <TextInput defaultValue="Velasquez" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 outline-none text-slate-800 text-sm focus:border-teal-500 focus:bg-white transition-colors shadow-sm" />
                    </View>
                  </View>
                  <View>
                    <Text className="text-slate-700 font-bold mb-2 text-sm">Email Address</Text>
                    <TextInput defaultValue="m.velasquez@deped.gov.ph" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 outline-none text-slate-800 text-sm focus:border-teal-500 focus:bg-white transition-colors shadow-sm" />
                  </View>
                </View>

                <View className="flex-row justify-end">
                  <Pressable className="bg-teal-600 px-6 py-3 rounded-lg items-center active:bg-teal-700 shadow-md shadow-teal-500/30 transition-transform active:scale-95">
                    <Text className="text-white font-bold text-sm">Save Changes</Text>
                  </Pressable> 
                </View>
              </View>

              <View className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
                <Text className="text-lg font-black text-slate-900 mb-4">Security Settings</Text>
                <View className="flex-col sm:flex-row justify-between items-start sm:items-center py-3 border-b border-slate-100 gap-3">
                  <View>
                    <Text className="font-bold text-slate-800 text-sm">Two-Factor Authentication</Text>
                    <Text className="text-slate-500 text-xs mt-0.5">Add an extra layer of security to your account.</Text>
                  </View>
                  <View className="w-12 h-6 bg-slate-300 rounded-full p-0.5 cursor-pointer shadow-inner">
                    <View className="w-5 h-5 bg-white rounded-full shadow-sm" />
                  </View>
                </View>

                <View className="flex-col sm:flex-row justify-between items-start sm:items-center py-3 border-b border-slate-100 gap-3">
                  <View>
                    <Text className="font-bold text-slate-800 text-sm">Password</Text>
                    <Text className="text-slate-500 text-xs mt-0.5">Last changed 6 months ago.</Text>
                  </View>
                  <Pressable className="bg-slate-100 px-4 py-2 rounded-lg active:bg-slate-200 transition-colors border border-slate-200">
                    <Text className="text-slate-700 font-bold text-xs">Update Password</Text>
                  </Pressable>
                </View>
              </View>

              {/* Logout Button */}
              <Pressable 
                onPress={handleLogout} 
                className="bg-red-50 border border-red-200 rounded-2xl p-5 sm:p-6 shadow-sm flex-row items-center justify-between active:bg-red-100 transition-colors"
              >
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 bg-red-100 rounded-xl items-center justify-center border border-red-200">
                    <MaterialCommunityIcons name="logout" size={20} color="#dc2626" />
                  </View>
                  <View>
                    <Text className="text-red-800 font-black text-sm">Sign Out</Text>
                    <Text className="text-red-600 text-xs font-medium mt-0.5">Log out of your account</Text>
                  </View>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={22} color="#dc2626" />
              </Pressable>
            </Animated.View>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};