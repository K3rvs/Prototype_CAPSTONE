import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, ScrollView, Text, View, Platform } from "react-native";

export const SubTabBar = ({ tabs, activeTab, setActiveTab, color }: any) => (
  <View className="flex-row border-b border-slate-200 px-4 bg-slate-50 overflow-hidden rounded-t-3xl">
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="flex-row"
    >
      {tabs.map((t: any) => (
        <Pressable
          key={t.id}
          onPress={() => setActiveTab(t.id)}
          className={`px-4 py-4 border-b-2 transition-colors ${
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

export const SlideDrawer = ({
  isOpen,
  onClose,
  title,
  color,
  children,
}: any) => {
  return (
    <Modal
      visible={!!isOpen}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 flex-row">
        <Pressable
          className={`flex-1 bg-slate-900/40 ${Platform.OS === 'web' ? 'backdrop-blur-sm' : ''}`}
          onPress={onClose}
        />
        <View className="w-4/5 sm:w-96 bg-slate-50 h-full shadow-2xl border-l border-slate-200">
          <View
            className={`bg-${color}-600 p-6 flex-row items-center justify-between`}
          >
            <Text className="text-white font-black text-xl">{title}</Text>
            <Pressable
              onPress={onClose}
              className="bg-white/20 p-2 rounded-full"
            >
              <MaterialCommunityIcons name="close" size={20} color="white" />
            </Pressable>
          </View>
          <ScrollView className="flex-1 p-6">{children}</ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export const GlobalModal = ({ isOpen, onClose, title, children }: any) => {
  return (
    <Modal
      visible={!!isOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className={`flex-1 items-center justify-center bg-slate-900/60 ${Platform.OS === 'web' ? 'backdrop-blur-sm' : ''} p-4 sm:p-6 w-full h-full`}>
        <View className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex-shrink max-h-[90vh]">
          <View className="p-6 border-b border-slate-100 flex-row items-center justify-between bg-slate-50">
            <Text className="text-xl font-black text-slate-800">{title}</Text>
            <Pressable
              onPress={onClose}
              className="bg-slate-200 p-2 rounded-full"
            >
              <MaterialCommunityIcons name="close" size={20} color="#475569" />
            </Pressable>
          </View>
          <View className="p-6">{children}</View>
        </View>
      </View>
    </Modal>
  );
};
