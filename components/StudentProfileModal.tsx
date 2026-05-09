/// <reference types="nativewind/types" />
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { GlobalModal, SubTabBar } from "./AdminUI";

export const StudentProfileModal = ({ isOpen, onClose }: any) => {
  const [subTab, setSubTab] = useState("profile");
  const navigation = useNavigation<any>();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState("+63 912 345 6789");

  const handleSignOut = () => {
    setIsSigningOut(true);
    setTimeout(() => {
      onClose(); // Close the native modal first
      setTimeout(() => {
        navigation.replace("index");
      }, 150); // Wait for the modal teardown before replacing the route context
    }, 1500);
  };

  return (
    <GlobalModal isOpen={isOpen} onClose={onClose} title="Student Profile">
      <View className="-mx-6 -mt-6 mb-4">
        <SubTabBar
          tabs={[
            { id: "profile", label: "Settings" },
            { id: "support", label: "Support" },
          ]}
          activeTab={subTab}
          setActiveTab={setSubTab}
          color="sky"
        />
      </View>
      <ScrollView
        className="max-h-[65vh] -mx-6 px-6"
        showsVerticalScrollIndicator={false}
      >
        {subTab === "profile" && (
          <Animated.View entering={FadeIn} className="gap-6 pb-6">
            <View className="items-center gap-4">
              <View className="w-24 h-24 bg-sky-100 rounded-3xl items-center justify-center border-[6px] border-sky-200 shadow-md relative">
                <Text className="text-3xl font-black text-sky-700">S</Text>
                <View className="absolute -bottom-2 -right-2 bg-emerald-500 w-8 h-8 rounded-full items-center justify-center border-2 border-white shadow-sm">
                  <MaterialCommunityIcons
                    name="check"
                    size={16}
                    color="white"
                  />
                </View>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-black text-slate-800">
                  Juan Dela Cruz
                </Text>
                {isEditing ? (
                  <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    onBlur={() => setIsEditing(false)}
                    autoFocus
                    className="border-b border-sky-400 py-1 mt-1 text-slate-800 outline-none text-center font-medium"
                  />
                ) : (
                  <Pressable onPress={() => setIsEditing(true)}>
                    <Text className="text-slate-600 font-medium">
                      {phone} ✎
                    </Text>
                  </Pressable>
                )}
                <Text className="text-sky-600 text-[10px] font-black mt-2 uppercase tracking-wider text-center">
                  Grade 11 - STEM
                </Text>
              </View>
            </View>

            <View className="bg-slate-50 border border-slate-200 p-4 rounded-2xl gap-4">
              <Text className="font-bold text-slate-800 text-base">
                Security & Web3 Binding
              </Text>

              <View className="flex-row items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                <View className="flex-row items-center gap-3">
                  <MaterialCommunityIcons
                    name="cellphone-key"
                    size={24}
                    color="#64748b"
                  />
                  <View className="flex-1">
                    <Text className="font-bold text-slate-800 text-sm">
                      MFA
                    </Text>
                    <Text className="text-emerald-600 text-[10px] font-bold">
                      Enabled via Authenticator App
                    </Text>
                  </View>
                </View>
                <Pressable className="bg-slate-100 px-3 py-2 rounded-lg active:bg-slate-200">
                  <Text className="text-slate-700 font-bold text-xs">
                    Manage
                  </Text>
                </Pressable>
              </View>

              <View className="flex-row items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                <View className="flex-row items-center gap-3">
                  <MaterialCommunityIcons
                    name="wallet-outline"
                    size={24}
                    color="#64748b"
                  />
                  <View className="flex-1">
                    <Text className="font-bold text-slate-800 text-sm">
                      Student Wallet
                    </Text>
                    <Text className="text-slate-500 text-[10px] font-medium">
                      Connected to Polygon
                    </Text>
                  </View>
                </View>
                <Pressable className="bg-sky-600 px-3 py-2 rounded-lg active:bg-sky-700">
                  <Text className="text-white font-bold text-xs">View</Text>
                </Pressable>
              </View>
            </View>

            <View className="border-t border-slate-200 pt-4">
              <Text className="font-bold text-slate-800 mb-2">
                Integration Hub
              </Text>
              <View className="flex-row items-center justify-between">
                <Text className="text-slate-600 text-sm font-medium">
                  Google Workspace Sync
                </Text>
                <Text className="text-emerald-600 font-mono font-bold text-sm">
                  Active
                </Text>
              </View>
            </View>

            {/* Secure Sign Out Sequence */}
            <View className="mt-2 pt-4 border-t border-slate-200">
              <Pressable
                onPress={handleSignOut}
                disabled={isSigningOut}
                className={`border py-4 rounded-xl items-center flex-row justify-center gap-2 shadow-sm ${isSigningOut ? "border-slate-300 bg-slate-100" : "border-red-200 bg-red-50"}`}
              >
                {isSigningOut ? (
                  <ActivityIndicator color="#64748b" size="small" />
                ) : (
                  <>
                    <MaterialCommunityIcons
                      name="logout"
                      size={20}
                      color="#dc2626"
                    />
                    <Text className="text-red-700 font-bold text-sm">
                      Secure Sign Out
                    </Text>
                  </>
                )}
              </Pressable>
            </View>
          </Animated.View>
        )}
        {subTab === "support" && (
          <Animated.View entering={FadeIn} className="gap-4 pb-6">
            <Text className="text-slate-600 text-sm mb-4 text-center font-medium">
              Need help with the LMS or your courses? Check our FAQs below or ask your teacher for guidance.
            </Text>
            <View className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
              <Text className="text-slate-500 font-medium text-center">Refer to the Help & FAQ Module for detailed tutorials.</Text>
            </View>
          </Animated.View>
        )}
      </ScrollView>
    </GlobalModal>
  );
};