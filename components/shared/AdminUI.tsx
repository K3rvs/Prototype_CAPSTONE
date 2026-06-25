import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, ScrollView, Text, View, Platform } from "react-native";

export const SubTabBar = ({ tabs, activeTab, setActiveTab, color }: any) => (
  <View className="flex-row border-b border-slate-200 px-4 bg-slate-50 overflow-hidden rounded-t-2xl">
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="flex-row"
    >
      {tabs.map((t: any) => (
        <Pressable
          key={t.id}
          onPress={() => setActiveTab(t.id)}
          className={`px-3 py-3 border-b-2 transition-colors ${
            activeTab === t.id
              ? `border-${color}-500 bg-${color}-50/50`
              : "border-transparent"
          }`}
        >
          <Text
            className={`font-bold ${activeTab === t.id ? `text-${color}-700` : "text-slate-500"}`}
          >
            {t.label}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  </View>
);

export const GlobalModal = ({ isOpen, onClose, title, children }: any) => {
  if (!isOpen) return null;
  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className={`flex-1 items-center justify-center bg-slate-900/60 ${Platform.OS === 'web' ? 'backdrop-blur-sm' : ''} p-3 sm:p-4 w-full h-full`}>
        <View className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex-shrink max-h-[90vh]">
          <View className="p-4 border-b border-slate-100 flex-row items-center justify-between bg-slate-50">
            <Text className="text-lg font-black text-slate-800">{title}</Text>
            <Pressable
              onPress={onClose}
              className="bg-slate-200 p-2 rounded-full"
            >
              <MaterialCommunityIcons name="close" size={20} color="#475569" />
            </Pressable>
          </View>
          <View className="p-4 sm:p-5">{children}</View>
        </View>
      </View>
    </Modal>
  );
};
