import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, {
  Easing,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalModal } from "@/components/AdminUI";
import { AdminCalendarSection } from "@/components/AdminCalendarSection";
import { AdminCommsSection } from "@/components/AdminCommsSection";
import { AdminCurriculumSection } from "@/components/AdminCurriculumSection";
import { AdminDashboardSection } from "@/components/AdminDashboardSection";
import { AdminInfrastructureSection } from "@/components/AdminInfrastructureSection";
import { AdminModerationSection } from "@/components/AdminModerationSection";
import { AdminProfileModal } from "@/components/AdminProfileModal";
import { AdminUsersSection } from "@/components/AdminUsersSection";

const TABS = [
  { id: "dashboard", label: "Command Center", icon: "view-dashboard" },
  { id: "users", label: "User Management", icon: "account-group" },
  { id: "moderation", label: "System Moderation", icon: "shield-alert" },
  { id: "curriculum", label: "Curriculum Mapping", icon: "book-education" },
  { id: "calendar", label: "School Calendar", icon: "calendar-month" },
  { id: "comms", label: "Global Broadcasting", icon: "bullhorn" },
  { id: "infrastructure", label: "Engine Room", icon: "server-network" },
];

const AdminWebLayout = () => {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchPageOpen, setIsSearchPageOpen] = useState(false);
  const [isNotifPageOpen, setIsNotifPageOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isOtherModalOpen, setIsOtherModalOpen] = useState(false);

  // Animation for slide-in notifications panel

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "High CPU Load",
      desc: "Main DB cluster is experiencing high load.",
      time: "2m ago",
      read: false,
      icon: "server-network",
      color: "red",
    },
    {
      id: 2,
      title: "New Teacher Registration",
      desc: "Pending approval in User Management.",
      time: "1h ago",
      read: false,
      icon: "account-plus",
      color: "blue",
    },
    {
      id: 3,
      title: "System Sync Complete",
      desc: "Vector DB updated successfully.",
      time: "3h ago",
      read: true,
      icon: "database-check",
      color: "emerald",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const markAllAsRead = () =>
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  const markAsRead = (id: number) =>
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );

  const searchResults = useMemo(() => {
    if (!searchQuery) return TABS;
    return TABS.filter(
      (t) =>
        t.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  useEffect(() => {
    if (Platform.OS === "web") {
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
          e.preventDefault();
          setIsSearchPageOpen(true);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, []);

  const getColorStyles = (color: string) => {
    switch (color) {
      case "red":
        return { bg: "bg-red-100", text: "text-red-500", hex: "#ef4444" };
      case "blue":
        return { bg: "bg-blue-100", text: "text-blue-500", hex: "#3b82f6" };
      case "emerald":
        return {
          bg: "bg-emerald-100",
          text: "text-emerald-500",
          hex: "#10b981",
        };
      default:
        return { bg: "bg-slate-100", text: "text-slate-500", hex: "#64748b" };
    }
  };

  const mobileMainTabs = [
    { id: "dashboard", label: "Command", icon: "view-dashboard" },
    { id: "users", label: "User", icon: "account-group" },
    { id: "moderation", label: "System", icon: "shield-alert" },
    { id: "calendar", label: "School", icon: "calendar-month" },
  ];
  const mobileOtherTabs = TABS.filter(
    (t) => !mobileMainTabs.find((m) => m.id === t.id),
  );


  return (
    <SafeAreaView className="flex-1 bg-slate-50 relative overflow-hidden">
      {/* Background Decorators */}
      <View className="absolute top-[-50px] left-[-50px] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-indigo-400/20 rounded-full blur-[80px] pointer-events-none" />
      <View className="absolute bottom-[-50px] right-[-50px] w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-emerald-400/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Header */}
      <View className="h-16 bg-white border-b border-slate-200 flex-row items-center justify-between px-4 sm:px-6 z-50 shadow-sm">
        <Pressable
          onPress={() => navigation.replace("index")}
          className="flex-row items-center gap-3 flex"
        >
          <Image
            source={require("@/assets/images/icon.png")}
            style={{ width: 36, height: 36, borderRadius: 10 }}
            contentFit="cover"
          />
          <View className="hidden sm:flex">
            <Text className="text-lg font-black text-slate-800 tracking-wider">
              i++{" "}
              <Text className="text-indigo-600 text-sm font-bold ml-1">
                School Admin
              </Text>
            </Text>
          </View>
        </Pressable>

        {/* Right Actions */}
        <View
          className="flex-row items-center gap-1 sm:gap-3 relative z-50 flex"
        >
          {/* Search Action */}
          <Pressable
            onPress={() => setIsSearchPageOpen(true)}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full items-center justify-center"
          >
            <MaterialCommunityIcons
              name="magnify"
              size={26}
              color="#0f172a"
            />
          </Pressable>

          {/* Bell */}
          <Pressable
            onPress={() => setIsNotifPageOpen(true)}
            className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full items-center justify-center"
          >
            <MaterialCommunityIcons
              name={unreadCount > 0 ? "bell" : "bell-outline"}
              size={26}
              color="#0f172a"
            />
            {unreadCount > 0 && (
              <View className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] bg-red-600 rounded-full items-center justify-center border-2 border-white px-1 shadow-sm">
                <Text
                  className="text-[10px] font-bold text-white text-center"
                  style={{ lineHeight: 12 }}
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </Text>
              </View>
            )}
          </Pressable>

          <Pressable
            onPress={() => setIsProfileOpen(true)}
            className="w-8 h-8 sm:w-9 sm:h-9 bg-purple-700 rounded-full items-center justify-center ml-1 sm:ml-2"
          >
            <Text className="font-bold text-white text-xs sm:text-sm">AM</Text>
          </Pressable>
        </View>
      </View>

      <View className="flex-1 flex-row pb-16 sm:pb-0">
        {/* Desktop Sidebar */}
        <View
          className={`hidden sm:flex bg-white/90 border-r border-slate-200 py-6 backdrop-blur-md z-40 flex-col shadow-sm ${
            isSidebarExpanded ? "w-[280px] px-4" : "w-24 px-3"
          }`}
        >
          <Pressable
            onPress={() => setIsSidebarExpanded(!isSidebarExpanded)}
            className={`mb-6 p-2.5 rounded-xl ${
              isSidebarExpanded ? "self-end" : "self-center"
            }`}
          >
            <MaterialCommunityIcons
              name={isSidebarExpanded ? "menu-open" : "menu"}
              size={24}
              color="#64748b"
            />
          </Pressable>

          <View className="relative h-6 mb-2 justify-center">
            <View
              className={`absolute left-4 ${isSidebarExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"}`}
            >
              <Text
                className="text-[10px] font-black text-slate-400 uppercase tracking-widest w-48"
                numberOfLines={1}
              >
                Modules
              </Text>
            </View>
          </View>

          <View className="flex-1 gap-2">
            {TABS.map((tab) => (
              <Pressable
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
            className={`relative flex-row items-center rounded-2xl overflow-hidden h-12 w-full ${
                  activeTab === tab.id
                    ? "bg-indigo-50 border border-indigo-200/50 shadow-sm"
                : "border border-transparent"
                }`}
              >
                {/* Icon Container with smooth sliding interpolation */}
                <View
                  className={`absolute items-center justify-center w-12 h-12 ${isSidebarExpanded ? "left-2" : "left-1/2 -ml-6"}`}
                >
                  <MaterialCommunityIcons
                    name={tab.icon as any}
                    size={24}
                    color={activeTab === tab.id ? "#4f46e5" : "#64748b"}
                  />
                </View>

                {/* Text Container with smooth fade out/in */}
                <View
                  className={`absolute left-[60px] ${
                    isSidebarExpanded
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4 pointer-events-none"
                  }`}
                >
                  <Text
                    className={`font-bold text-sm w-40 ${
                      activeTab === tab.id
                        ? "text-indigo-900"
                        : "text-slate-600"
                    }`}
                    numberOfLines={1}
                  >
                    {tab.label}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Main Scrolling Content */}
        <ScrollView
          className="flex-1 px-4 sm:px-8 pt-6 z-10"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            entering={FadeInDown.duration(400)}
            className="w-full max-w-7xl mx-auto pb-10"
          >
            {/* Content Sections */}
            <View className="w-full mb-12">
              {activeTab === "dashboard" && (
                <AdminDashboardSection setActiveTab={setActiveTab} />
              )}
              {activeTab === "users" && <AdminUsersSection />}
              {activeTab === "moderation" && <AdminModerationSection />}
              {activeTab === "curriculum" && <AdminCurriculumSection />}
              {activeTab === "calendar" && <AdminCalendarSection />}
              {activeTab === "comms" && <AdminCommsSection />}
              {activeTab === "infrastructure" && <AdminInfrastructureSection />}
            </View>
          </Animated.View>
        </ScrollView>
      </View>

      <AdminProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Mobile Bottom Nav */}
      <View className="absolute bottom-0 left-0 right-0 bg-white/90 border-t border-slate-200 flex-row justify-around py-2 px-1 backdrop-blur-lg sm:hidden z-50 pb-4">
        {mobileMainTabs.map((tab) => (
          <Pressable
            key={tab.id}
            onPress={() => setActiveTab(tab.id)}
          className="items-center p-2 flex-1 rounded-xl"
          >
            <MaterialCommunityIcons
              name={tab.icon as any}
              size={26}
              color={activeTab === tab.id ? "#4f46e5" : "#94a3b8"}
            />
            <Text
              className={`text-[10px] mt-1 font-bold ${activeTab === tab.id ? "text-indigo-800" : "text-slate-500"}`}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
        <Pressable
          onPress={() => setIsOtherModalOpen(true)}
          className="items-center p-2 flex-1 rounded-xl"
        >
          <MaterialCommunityIcons
            name="dots-horizontal-circle-outline"
            size={26}
            color={
              mobileOtherTabs.some((t) => t.id === activeTab)
                ? "#4f46e5"
                : "#94a3b8"
            }
          />
          <Text
            className={`text-[10px] mt-1 font-bold ${mobileOtherTabs.some((t) => t.id === activeTab) ? "text-indigo-800" : "text-slate-500"}`}
          >
            Other
          </Text>
        </Pressable>
      </View>

      {/* Mobile "Other" Tabs Modal */}
      <GlobalModal
        isOpen={isOtherModalOpen}
        onClose={() => setIsOtherModalOpen(false)}
        title="More Modules"
      >
        <View className="gap-3 mb-2">
          {mobileOtherTabs.map((tab) => (
            <Pressable
              key={tab.id}
              onPress={() => {
                setActiveTab(tab.id);
                setIsOtherModalOpen(false);
              }}
          className={`flex-row items-center gap-4 p-4 rounded-2xl border ${activeTab === tab.id ? "border-indigo-400 bg-indigo-50/50" : "border-slate-200 bg-slate-50"}`}
            >
              <View
                className={`w-12 h-12 rounded-full items-center justify-center ${activeTab === tab.id ? "bg-indigo-500 shadow-md shadow-indigo-500/30" : "bg-white shadow-sm border border-slate-200"}`}
              >
                <MaterialCommunityIcons
                  name={tab.icon as any}
                  size={24}
                  color={activeTab === tab.id ? "white" : "#64748b"}
                />
              </View>
              <Text
                className={`font-bold text-base flex-1 ${activeTab === tab.id ? "text-indigo-800" : "text-slate-700"}`}
              >
                {tab.label}
              </Text>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color={activeTab === tab.id ? "#4f46e5" : "#cbd5e1"}
              />
            </Pressable>
          ))}
        </View>
      </GlobalModal>

      {/* --- Full Page Search Overlay --- */}
      <Modal visible={isSearchPageOpen} animationType="fade" transparent={true} onRequestClose={() => setIsSearchPageOpen(false)}
      >
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-1 w-full max-w-4xl mx-auto bg-white sm:border-x sm:border-slate-200">
            {/* Search Header */}
            <View className="h-16 border-b border-slate-200 flex-row items-center px-2 sm:px-4 gap-2 sm:gap-3">
              <Pressable onPress={() => setIsSearchPageOpen(false)} className="p-2 rounded-full">
                <MaterialCommunityIcons name="arrow-left" size={26} color="#0f172a" />
              </Pressable>
              
              <View className="flex-1 bg-slate-100 rounded-full flex-row items-center px-4 h-11 border border-slate-200 shadow-sm">
                <TextInput
                  autoFocus={Platform.OS === 'web'}
                  placeholder="Search modules, users, or settings..."
                  placeholderTextColor="#64748b"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  className="flex-1 text-slate-900 text-base outline-none h-full"
                />
                {searchQuery.length > 0 && (
                  <Pressable onPress={() => setSearchQuery("")} className="p-1.5 rounded-full ml-1">
                    <MaterialCommunityIcons name="close" size={20} color="#334155" />
                  </Pressable>
                )}
              </View>
              
              <Pressable className="w-11 h-11 rounded-full bg-slate-100 items-center justify-center border border-slate-200/50 hidden sm:flex">
                <MaterialCommunityIcons name="microphone" size={22} color="#0f172a" />
              </Pressable>
            </View>

            {/* Search Results */}
            <ScrollView className="flex-1 bg-slate-50" keyboardShouldPersistTaps="handled">
              {searchResults.length > 0 ? (
                <View className="py-4">
                  <Text className="text-xs font-bold text-slate-500 uppercase tracking-widest px-6 mb-3">
                    {searchQuery ? "Search Results" : "Suggested Modules"}
                  </Text>
                  {searchResults.map((tab) => (
                    <Pressable
                      key={tab.id}
                      onPress={() => {
                        setActiveTab(tab.id);
                        setIsSearchPageOpen(false);
                        setSearchQuery("");
                      }}
              className="flex-row items-center gap-4 px-6 py-4 bg-white border-b border-slate-100"
                    >
                      <View className="w-12 h-12 rounded-full bg-slate-100 items-center justify-center">
                        <MaterialCommunityIcons name={tab.icon as any} size={24} color="#334155" />
                      </View>
                      <View className="flex-1">
                        <Text className="font-bold text-lg text-slate-900">{tab.label}</Text>
                        <Text className="text-sm text-slate-500">Jump to {tab.id} section</Text>
                      </View>
                      <MaterialCommunityIcons name="chevron-right" size={24} color="#cbd5e1" />
                    </Pressable>
                  ))}
                </View>
              ) : (
                <View className="py-20 items-center justify-center">
                  <MaterialCommunityIcons name="magnify-close" size={64} color="#cbd5e1" />
                  <Text className="text-slate-600 font-medium text-lg mt-4 text-center px-8">
                    No results found for "{searchQuery}"
                  </Text>
                  <Text className="text-slate-400 text-sm mt-2 text-center px-8">
                    Try searching for different keywords or checking your spelling.
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>

      {/* --- Full Page Notifications Overlay --- */}
      <Modal visible={isNotifPageOpen} animationType="fade" transparent={true} onRequestClose={() => setIsNotifPageOpen(false)}>
        <SafeAreaView className="flex-1 bg-slate-50">
          <View className="flex-1 w-full max-w-4xl mx-auto bg-white sm:border-x sm:border-slate-200 shadow-sm">
            {/* Header */}
            <View className="h-16 border-b border-slate-200 flex-row items-center justify-between px-2 sm:px-4 shadow-sm bg-white z-10">
              <View className="flex-row items-center gap-2">
                <Pressable onPress={() => setIsNotifPageOpen(false)} className="p-2 rounded-full">
                  <MaterialCommunityIcons name="arrow-left" size={26} color="#0f172a" />
                </Pressable>
                <Text className="text-2xl font-black text-slate-900 tracking-tight">Notifications</Text>
              </View>
              <View className="flex-row items-center gap-2">
                {unreadCount > 0 && (
                  <Pressable onPress={markAllAsRead} className="px-4 py-2 bg-slate-100 rounded-full hidden sm:flex">
                    <Text className="text-slate-700 font-bold text-sm">Mark all as read</Text>
                  </Pressable>
                )}
                <Pressable className="p-2 rounded-full">
                  <MaterialCommunityIcons name="cog-outline" size={24} color="#0f172a" />
                </Pressable>
              </View>
            </View>

            {/* Notif List */}
            <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
              {notifications.length > 0 ? (
                <View className="pb-6">
                  {notifications.map((notif) => {
                    const colors = getColorStyles(notif.color);
                    return (
                      <Pressable
                        key={notif.id}
                        onPress={() => markAsRead(notif.id)}
                        className={`px-4 sm:px-6 py-4 border-b border-slate-100 flex-row gap-4 ${!notif.read ? "bg-slate-50/50" : "bg-white"}`}
                      >
                        <View className={`w-12 h-12 rounded-full items-center justify-center mt-1 shadow-sm ${colors.bg}`}>
                          <MaterialCommunityIcons name={notif.icon as any} size={24} color={colors.hex} />
                        </View>
                        <View className="flex-1 justify-center">
                          <Text className={`text-base leading-tight mb-1 ${notif.read ? "text-slate-700 font-medium" : "text-slate-900 font-bold"}`}>
                            {notif.title}
                          </Text>
                          <Text className="text-slate-600 text-sm leading-relaxed mb-1">
                            {notif.desc}
                          </Text>
                          <Text className={`text-xs font-bold ${notif.read ? "text-slate-400" : "text-blue-600"}`}>
                            {notif.time}
                          </Text>
                        </View>
                        <View className="items-center justify-center gap-2">
                          <Pressable className="p-2 rounded-full">
                            <MaterialCommunityIcons name="dots-vertical" size={20} color="#64748b" />
                          </Pressable>
                          {!notif.read && (
                            <View className="w-2.5 h-2.5 bg-blue-600 rounded-full shadow-sm" />
                          )}
                        </View>
                      </Pressable>
                    );
                  })}
                  <Pressable className="p-6 items-center justify-center border-t border-slate-100">
                    <Text className="text-slate-500 font-bold text-sm">You have reached the end of your notifications.</Text>
                  </Pressable>
                </View>
              ) : (
                <View className="py-32 items-center justify-center">
                  <View className="w-24 h-24 bg-slate-50 rounded-full items-center justify-center mb-6">
                    <MaterialCommunityIcons
                      name="bell-sleep"
                      size={48}
                      color="#cbd5e1"
                    />
                  </View>
                  <Text className="text-2xl font-black text-slate-800 mb-2">
                    You're all caught up!
                  </Text>
                  <Text className="text-slate-500 text-base text-center px-8">
                    No new notifications or alerts at this time.
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>

    </SafeAreaView>
  );
}

const AdminMobileLayout = () => {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isOtherModalOpen, setIsOtherModalOpen] = useState(false);

  const mobileMainTabs = [
    { id: "dashboard", label: "Command", icon: "view-dashboard" },
    { id: "users", label: "User", icon: "account-group" },
    { id: "moderation", label: "System", icon: "shield-alert" },
    { id: "calendar", label: "School", icon: "calendar-month" },
  ];
  
  const mobileOtherTabs = TABS.filter(
    (t) => !mobileMainTabs.find((m) => m.id === t.id),
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {/* Clean Mobile Header */}
      <View className="h-16 bg-white border-b border-slate-200 flex-row items-center justify-between px-4 z-50 shadow-sm">
        <Pressable
          onPress={() => navigation.replace("index")}
          className="flex-row items-center gap-3"
        >
          <Image
            source={require("@/assets/images/icon.png")}
            style={{ width: 36, height: 36, borderRadius: 10 }}
            contentFit="cover"
          />
        </Pressable>

        <View className="flex-row items-center gap-2">
          <Pressable className="w-10 h-10 rounded-full items-center justify-center">
            <MaterialCommunityIcons name="bell-outline" size={26} color="#0f172a" />
          </Pressable>
          <Pressable
            onPress={() => setIsProfileOpen(true)}
            className="w-9 h-9 bg-indigo-600 rounded-full items-center justify-center ml-1"
          >
            <Text className="font-bold text-white text-sm">AM</Text>
          </Pressable>
        </View>
      </View>

      {/* Main Content Area */}
      <ScrollView className="flex-1 px-4 pt-4 z-10" showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.duration(400)} className="w-full pb-24">
          {activeTab === "dashboard" && <AdminDashboardSection setActiveTab={setActiveTab} />}
          {activeTab === "users" && <AdminUsersSection />}
          {activeTab === "moderation" && <AdminModerationSection />}
          {activeTab === "curriculum" && <AdminCurriculumSection />}
          {activeTab === "calendar" && <AdminCalendarSection />}
          {activeTab === "comms" && <AdminCommsSection />}
          {activeTab === "infrastructure" && <AdminInfrastructureSection />}
        </Animated.View>
      </ScrollView>

      {/* Native-feeling Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex-row justify-around py-2 px-1 z-50 pb-6">
        {mobileMainTabs.map((tab) => (
          <Pressable key={tab.id} onPress={() => setActiveTab(tab.id)} className="items-center p-2 flex-1 rounded-xl">
            <MaterialCommunityIcons name={tab.icon as any} size={26} color={activeTab === tab.id ? "#4f46e5" : "#94a3b8"} />
            <Text className={`text-[10px] mt-1 font-bold ${activeTab === tab.id ? "text-indigo-800" : "text-slate-500"}`} numberOfLines={1}>
              {tab.label}
            </Text>
          </Pressable>
        ))}
        <Pressable onPress={() => setIsOtherModalOpen(true)} className="items-center p-2 flex-1 rounded-xl">
          <MaterialCommunityIcons name="dots-horizontal-circle-outline" size={26} color={mobileOtherTabs.some((t) => t.id === activeTab) ? "#4f46e5" : "#94a3b8"} />
          <Text className={`text-[10px] mt-1 font-bold ${mobileOtherTabs.some((t) => t.id === activeTab) ? "text-indigo-800" : "text-slate-500"}`}>Other</Text>
        </Pressable>
      </View>

      <GlobalModal isOpen={isOtherModalOpen} onClose={() => setIsOtherModalOpen(false)} title="More Modules">
        <View className="gap-3 mb-2">
          {mobileOtherTabs.map((tab) => (
            <Pressable key={tab.id} onPress={() => { setActiveTab(tab.id); setIsOtherModalOpen(false); }} className={`flex-row items-center gap-4 p-4 rounded-2xl border ${activeTab === tab.id ? "border-indigo-400 bg-indigo-50" : "border-slate-200 bg-slate-50"}`}>
              <View className={`w-12 h-12 rounded-full items-center justify-center ${activeTab === tab.id ? "bg-indigo-500" : "bg-white border border-slate-200"}`}>
                <MaterialCommunityIcons name={tab.icon as any} size={24} color={activeTab === tab.id ? "white" : "#64748b"} />
              </View>
              <Text className={`font-bold text-base flex-1 ${activeTab === tab.id ? "text-indigo-800" : "text-slate-700"}`}>{tab.label}</Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color={activeTab === tab.id ? "#4f46e5" : "#cbd5e1"} />
            </Pressable>
          ))}
        </View>
      </GlobalModal>

      <AdminProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </SafeAreaView>
  );
};

export default function AdminDashboard() {
  return Platform.OS === "web" ? <AdminWebLayout /> : <AdminMobileLayout />;
}
