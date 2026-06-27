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
  withSpring,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalModal } from "@/components/shared/AdminUI";
import { AdminCalendarSection } from "@/components/admin/AdminCalendarSection";
import { AdminDashboardSection } from "@/components/admin/AdminDashboardSection";
import { AdminServerClustersSection } from "@/components/admin/AdminServerClustersSection";
import { AdminAIEndpointsSection } from "@/components/admin/AdminAIEndpointsSection";
import { AdminBlockchainNetworkSection } from "@/components/admin/AdminBlockchainNetworkSection";
import { AdminIncidentResponseSection } from "@/components/admin/AdminIncidentResponseSection";
import { AdminUsersSection } from "@/components/admin/AdminUsersSection";
import { AdminProfileSection } from "@/components/admin/AdminProfileSection";
import { StudentHelpFAQ } from "@/components/student/StudentHelpFAQ";

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: "view-dashboard" },
  { id: "users", label: "Users", icon: "account-group" },
  { id: "incident_response", label: "Incidents", icon: "alert-decagram" },
  { id: "calendar", label: "Calendar", icon: "calendar-month" },
  { id: "server_clusters", label: "Server", icon: "server-network" },
  { id: "ai_endpoints", label: "AI", icon: "brain" },
  { id: "blockchain", label: "Blockchain", icon: "ethereum" },
  { id: "faq", label: "Help & FAQ", icon: "help-circle-outline" },
];

/**
 * AdminDashboard is the main layout and state manager for the Admin interface.
 * It contains a persistent sidebar, an animated top header, and a main content area
 * that switches between different admin sections (dashboard, users, calendar, etc.).
 * It also handles global search and notifications overlays.
 */
export default function AdminDashboard() {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [previousTab, setPreviousTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchPageOpen, setIsSearchPageOpen] = useState(false);
  const [isNotifPageOpen, setIsNotifPageOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "High CPU Load",
      desc: "Main DB cluster is experiencing high load.",
      time: "2m ago",
      timestamp: Date.now() - 2 * 60000,
      read: false,
      icon: "server-network",
      color: "red",
    },
    {
      id: 2,
      title: "New Account Created",
      desc: "Teacher account created successfully.",
      time: "1h ago",
      timestamp: Date.now() - 60 * 60000,
      read: false,
      icon: "account-plus",
      color: "blue",
    },
    {
      id: 3,
      title: "System Sync Complete",
      desc: "Vector DB updated successfully.",
      time: "3h ago",
      timestamp: Date.now() - 180 * 60000,
      read: true,
      icon: "database-check",
      color: "emerald",
    },
    {
      id: 4,
      title: "Multiple Failed Logins",
      desc: "5 failed login attempts detected on admin portal.",
      time: "4h ago",
      timestamp: Date.now() - 240 * 60000,
      read: false,
      icon: "shield-alert",
      color: "red",
    },
    {
      id: 5,
      title: "API Quota Warning",
      desc: "OpenAI endpoint reached 85% of monthly limit.",
      time: "5h ago",
      timestamp: Date.now() - 300 * 60000,
      read: false,
      icon: "brain",
      color: "blue",
    },
    {
      id: 6,
      title: "Paymaster Top-up Required",
      desc: "Polygon gas treasury is below 10 MATIC.",
      time: "1d ago",
      timestamp: Date.now() - 1440 * 60000,
      read: true,
      icon: "gas-station",
      color: "emerald",
    },
    {
      id: 7,
      title: "Database Backup Complete",
      desc: "Weekly automated backup finished successfully.",
      time: "1d ago",
      timestamp: Date.now() - 1500 * 60000,
      read: true,
      icon: "database",
      color: "blue",
    },
    {
      id: 8,
      title: "New Feature Deployed",
      desc: "Student Communities v1.2 is now live.",
      time: "2d ago",
      timestamp: Date.now() - 2880 * 60000,
      read: true,
      icon: "rocket-launch",
      color: "emerald",
    },
    {
      id: 9,
      title: "Admin Login from New Device",
      desc: "Admin logged in from Mac OS (Chrome).",
      time: "2d ago",
      timestamp: Date.now() - 3000 * 60000,
      read: true,
      icon: "laptop",
      color: "slate",
    },
    {
      id: 10,
      title: "Storage Alert",
      desc: "Main disk space is at 90% capacity.",
      time: "3d ago",
      timestamp: Date.now() - 4320 * 60000,
      read: true,
      icon: "harddisk",
      color: "orange",
    },
    {
      id: 11,
      title: "Security Patch Applied",
      desc: "System updated to the latest security patch.",
      time: "4d ago",
      timestamp: Date.now() - 5760 * 60000,
      read: true,
      icon: "shield-check",
      color: "emerald",
    },
    {
      id: 12,
      title: "Weekly Report Generated",
      desc: "Your weekly admin report is ready to download.",
      time: "5d ago",
      timestamp: Date.now() - 7200 * 60000,
      read: true,
      icon: "file-chart",
      color: "blue",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const markAllAsRead = () =>
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  const markAsRead = (id: number) =>
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );

  const sortedNotifications = useMemo(() => {
    return [...notifications].sort((a, b) => b.timestamp - a.timestamp);
  }, [notifications]);

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

  const scrollY = useSharedValue(0);
  const headerTranslateY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentScrollY = event.contentOffset.y;
      const diff = currentScrollY - scrollY.value;
      if (currentScrollY <= 0) {
        headerTranslateY.value = withTiming(0, { duration: 150 });
      } else if (diff > 5 && currentScrollY > 50) {
        headerTranslateY.value = withTiming(-100, { duration: 150 });
      } else if (diff < -5) {
        headerTranslateY.value = withTiming(0, { duration: 150 });
      }
      scrollY.value = currentScrollY;
    },
  });

  const headerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: headerTranslateY.value }],
  }));

  const sidebarTranslateX = useSharedValue(-400);
  const backdropOpacity = useSharedValue(0);
  const iconRotate = useSharedValue("0deg");
  const iconScale = useSharedValue(1);

  useEffect(() => {
    if (isSidebarOpen) {
      sidebarTranslateX.value = withSpring(0, {
        damping: 20,
        stiffness: 150,
        mass: 0.8,
      });
      backdropOpacity.value = withTiming(1, { duration: 300 });
      iconRotate.value = withSpring("15deg", { damping: 15, stiffness: 150 });
      iconScale.value = withSpring(0.9, { damping: 15, stiffness: 150 });
    } else {
      sidebarTranslateX.value = withTiming(-400, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });
      backdropOpacity.value = withTiming(0, { duration: 300 });
      iconRotate.value = withSpring("0deg", { damping: 15, stiffness: 150 });
      iconScale.value = withSpring(1, { damping: 15, stiffness: 150 });
    }
  }, [isSidebarOpen]);

  const sidebarStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: sidebarTranslateX.value }],
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 50,
    elevation: 50,
    width: 256,
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 40,
    elevation: 40,
    backgroundColor: "rgba(15, 23, 42, 0.2)",
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: iconRotate.value }, { scale: iconScale.value }],
  }));

  const renderSidebarContent = () => (
    <>
      <View className="flex-row items-center justify-between mb-4 pt-2 px-2">
        <Text className="text-xs font-black text-slate-400 uppercase tracking-widest">
          Navigation
        </Text>
        <Pressable
          onPress={() => setIsSidebarOpen(false)}
          className="p-2 rounded-full hover:bg-slate-100 active:bg-slate-200 xl:hidden"
        >
          <MaterialCommunityIcons name="close" size={20} color="#64748b" />
        </Pressable>
      </View>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="gap-2">
          {TABS.map((tab) => (
            <Pressable
              key={tab.id}
              onPress={() => {
                setActiveTab(tab.id);
                setIsSidebarOpen(false);
              }}
              className={`flex-row items-center rounded-xl p-2.5 gap-3 ${activeTab === tab.id ? "bg-indigo-50 border border-indigo-200/50 shadow-sm" : "border border-transparent hover:bg-slate-50"}`}
            >
              <MaterialCommunityIcons
                name={tab.icon as any}
                size={20}
                color={activeTab === tab.id ? "#4f46e5" : "#64748b"}
              />
              <Text
                className={`font-bold text-sm ${activeTab === tab.id ? "text-indigo-900" : "text-slate-600"}`}
              >
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-50 relative overflow-hidden flex-row">
      {/* Background Decorators */}
      <View className="absolute top-[-50px] left-[-50px] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-indigo-400/20 rounded-full blur-[80px] pointer-events-none z-0" />
      <View className="absolute bottom-[-50px] right-[-50px] w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-emerald-400/20 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Persistent Sidebar */}
      <View className="w-48 bg-white/95 backdrop-blur-md border-r border-slate-200 flex-col z-30 shadow-sm hidden xl:flex">
        {/* Logo Area */}
        <View className="h-14 flex-row items-center gap-3 px-5 border-b border-slate-200 shrink-0">
          <Image
            source={require("@/assets/images/icon.png")}
            style={{ width: 28, height: 28, borderRadius: 8 }}
            contentFit="cover"
          />
          <Text className="text-base font-black text-slate-800 tracking-wider">
            i++
          </Text>
        </View>
        {/* Navigation Content */}
        <View className="flex-1 py-6 px-4">{renderSidebarContent()}</View>
      </View>

      {/* Main Content Area */}
      <View className="flex-1 relative z-10">
        {/* Animated Top Header */}
        <Animated.View
          style={headerStyle}
          className="absolute top-0 left-0 right-0 h-14 bg-white/95 backdrop-blur-md border-b border-slate-200 flex-row items-center justify-between xl:justify-end px-4 sm:px-5 z-40 shadow-sm"
        >
          {/* Mobile Logo */}
          <Pressable
            onPress={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex-row items-center gap-3 xl:hidden active:opacity-70 transition-opacity cursor-pointer"
          >
            <Animated.View style={iconStyle}>
              <Image
                source={require("@/assets/images/icon.png")}
                style={{ width: 28, height: 28, borderRadius: 8 }}
                contentFit="cover"
              />
            </Animated.View>
            <Text className="text-base font-black text-slate-800 tracking-wider">
              i++
            </Text>
          </Pressable>

          {/* Right Actions */}
          <View className="flex-row items-center gap-1 sm:gap-3 relative">
            {/* Search Action */}
            <Pressable
              onPress={() => setIsSearchPageOpen(true)}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full items-center justify-center"
            >
              <MaterialCommunityIcons
                name="magnify"
                size={22}
                color="#0f172a"
              />
            </Pressable>

            {/* Bell */}
            <Pressable
              onPress={() => setIsNotifPageOpen(true)}
              className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full items-center justify-center"
            >
              <MaterialCommunityIcons
                name={unreadCount > 0 ? "bell" : "bell-outline"}
                size={22}
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
              onPress={() => {
                setPreviousTab(activeTab);
                setActiveTab("profile");
              }}
              className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-700 rounded-full items-center justify-center ml-1 sm:ml-2 hover:opacity-90 active:scale-95 transition-all"
            >
              <Text className="font-bold text-white text-xs sm:text-sm">
                AM
              </Text>
            </Pressable>
          </View>
        </Animated.View>

        {/* Main Content */}
        <Animated.ScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          className="flex-1 px-4 sm:px-8 z-10"
          contentContainerStyle={{ paddingTop: 76, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            entering={FadeInDown.duration(400)}
            className="w-full max-w-7xl mx-auto"
          >
            {activeTab === "dashboard" && (
              <View
                style={
                  { ...(Platform.OS === "web" ? { zoom: 0.9 } : {}) } as any
                }
              >
                <AdminDashboardSection setActiveTab={setActiveTab} />
              </View>
            )}
            {activeTab === "users" && (
              <View
                style={
                  { ...(Platform.OS === "web" ? { zoom: 0.9 } : {}) } as any
                }
              >
                <AdminUsersSection />
              </View>
            )}
            {activeTab === "calendar" && (
              <View
                style={
                  { ...(Platform.OS === "web" ? { zoom: 0.9 } : {}) } as any
                }
              >
                <AdminCalendarSection />
              </View>
            )}
            {activeTab === "incident_response" && (
              <View
                style={
                  { ...(Platform.OS === "web" ? { zoom: 0.9 } : {}) } as any
                }
              >
                <AdminIncidentResponseSection />
              </View>
            )}
            {activeTab === "server_clusters" && (
              <View
                style={
                  { ...(Platform.OS === "web" ? { zoom: 0.9 } : {}) } as any
                }
              >
                <AdminServerClustersSection />
              </View>
            )}
            {activeTab === "ai_endpoints" && (
              <View
                style={
                  { ...(Platform.OS === "web" ? { zoom: 0.9 } : {}) } as any
                }
              >
                <AdminAIEndpointsSection />
              </View>
            )}
            {activeTab === "blockchain" && (
              <View
                style={
                  { ...(Platform.OS === "web" ? { zoom: 0.9 } : {}) } as any
                }
              >
                <AdminBlockchainNetworkSection />
              </View>
            )}
            {activeTab === "faq" && (
              <View
                style={
                  { ...(Platform.OS === "web" ? { zoom: 0.9 } : {}) } as any
                }
              >
                <StudentHelpFAQ />
              </View>
            )}
            {activeTab === "profile" && (
              <AdminProfileSection goBack={() => setActiveTab(previousTab)} />
            )}
          </Animated.View>
        </Animated.ScrollView>
      </View>

      {/* Sidebar Overlay Drawer */}
      {Platform.OS === "web" ? (
        <>
          <View
            className={`absolute top-0 left-0 right-0 bottom-0 z-40 bg-slate-900/20 transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0"} xl:hidden`}
            pointerEvents={isSidebarOpen ? "auto" : "none"}
          >
            <Pressable
              className="flex-1"
              onPress={() => setIsSidebarOpen(false)}
            />
          </View>
          <View
            className={`absolute top-0 bottom-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-md shadow-2xl border-r border-slate-200 flex-col py-6 px-4 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} xl:hidden`}
            pointerEvents={isSidebarOpen ? "auto" : "none"}
          >
            {renderSidebarContent()}
          </View>
        </>
      ) : (
        <>
          <Animated.View
            style={backdropStyle}
            className="xl:hidden"
            pointerEvents={isSidebarOpen ? "auto" : "none"}
          >
            <Pressable
              className="flex-1"
              onPress={() => setIsSidebarOpen(false)}
            />
          </Animated.View>
          <Animated.View
            style={sidebarStyle}
            className="bg-white/95 backdrop-blur-md shadow-2xl border-r border-slate-200 flex-col py-6 px-4 xl:hidden"
            pointerEvents={isSidebarOpen ? "auto" : "none"}
          >
            {renderSidebarContent()}
          </Animated.View>
        </>
      )}

      {/* --- Full Page Search Overlay --- */}
      <Modal
        visible={isSearchPageOpen}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsSearchPageOpen(false)}
      >
        <Pressable
          className="flex-1 bg-slate-900/40 justify-start items-center px-4 pt-16 sm:pt-24"
          onPress={() => setIsSearchPageOpen(false)}
        >
          <Pressable
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex-col max-h-[70vh]"
            onPress={(e) => e.stopPropagation()}
          >
            {/* Search Header */}
            <View className="h-16 border-b border-slate-200 flex-row items-center px-4 gap-3 bg-slate-50">
              <MaterialCommunityIcons
                name="magnify"
                size={24}
                color="#64748b"
              />
              <TextInput
                autoFocus={Platform.OS === "web"}
                placeholder="Search modules, users, or settings..."
                placeholderTextColor="#94a3b8"
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="flex-1 text-slate-900 font-bold text-lg outline-none h-full bg-transparent"
              />
              {searchQuery.length > 0 && (
                <Pressable
                  onPress={() => setSearchQuery("")}
                  className="p-1.5 rounded-full hover:bg-slate-200 transition-colors"
                >
                  <MaterialCommunityIcons
                    name="close"
                    size={20}
                    color="#64748b"
                  />
                </Pressable>
              )}
              <Pressable className="w-10 h-10 rounded-full bg-white items-center justify-center border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm hidden sm:flex">
                <MaterialCommunityIcons
                  name="microphone"
                  size={20}
                  color="#64748b"
                />
              </Pressable>
            </View>

            {/* Search Results */}
            <ScrollView
              className="flex-shrink bg-white"
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {searchResults.length > 0 ? (
                <View className="py-2">
                  <Text className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-6 py-3">
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
                      className="flex-row items-center gap-4 px-6 py-3 bg-white hover:bg-slate-50 active:bg-slate-100 transition-colors group"
                    >
                      <View className="w-10 h-10 rounded-xl bg-slate-100 items-center justify-center border border-slate-200 group-hover:border-slate-300 transition-colors">
                        <MaterialCommunityIcons
                          name={tab.icon as any}
                          size={20}
                          color="#475569"
                        />
                      </View>
                      <View className="flex-1">
                        <Text className="font-bold text-base text-slate-800">
                          {tab.label}
                        </Text>
                        <Text className="text-xs font-medium text-slate-500">
                          Jump to {tab.id} section
                        </Text>
                      </View>
                      <MaterialCommunityIcons
                        name="chevron-right"
                        size={20}
                        color="#cbd5e1"
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Pressable>
                  ))}
                </View>
              ) : (
                <View className="py-16 items-center justify-center">
                  <MaterialCommunityIcons
                    name="magnify-close"
                    size={48}
                    color="#cbd5e1"
                  />
                  <Text className="text-slate-500 font-bold text-base mt-3 text-center px-8">
                    No results found for &quot;{searchQuery}&quot;
                  </Text>
                  <Text className="text-slate-400 text-sm mt-2 text-center px-8">
                    Try searching for different keywords or checking your
                    spelling.
                  </Text>
                </View>
              )}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* --- Full Page Notifications Overlay --- */}
      <Modal
        visible={isNotifPageOpen}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsNotifPageOpen(false)}
      >
        <Pressable
          className="flex-1 bg-slate-900/40 sm:justify-start sm:items-end sm:pt-16 sm:pr-4 justify-end items-center"
          onPress={() => setIsNotifPageOpen(false)}
        >
          <Pressable
            className="w-full sm:w-[400px] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex-col max-h-[80vh] sm:max-h-[70vh] sm:border border-slate-200"
            onPress={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <View className="h-16 border-b border-slate-200 flex-row items-center justify-between px-5 shadow-sm bg-white z-10 shrink-0">
              <Text className="text-xl font-black text-slate-900 tracking-tight">
                Notifications
              </Text>
              <View className="flex-row items-center gap-2">
                {unreadCount > 0 && (
                  <Pressable
                    onPress={markAllAsRead}
                    className="px-3 py-1.5 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                  >
                    <Text className="text-slate-700 font-bold text-xs">
                      Mark all read
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>

            {/* Notif List */}
            <ScrollView
              className="flex-shrink bg-white"
              showsVerticalScrollIndicator={false}
            >
              {sortedNotifications.length > 0 ? (
                <View className="pb-6">
                  {sortedNotifications.map((notif) => {
                    const colors = getColorStyles(notif.color);
                    return (
                      <Pressable
                        key={notif.id}
                        onPress={() => markAsRead(notif.id)}
                        className={`px-4 sm:px-5 py-3 border-b border-slate-100 flex-row gap-3 hover:bg-slate-50 transition-colors ${!notif.read ? "bg-slate-50/50" : "bg-white"}`}
                      >
                        <View
                          className={`w-10 h-10 rounded-full items-center justify-center mt-0.5 shadow-sm shrink-0 ${colors.bg}`}
                        >
                          <MaterialCommunityIcons
                            name={notif.icon as any}
                            size={20}
                            color={colors.hex}
                          />
                        </View>
                        <View className="flex-1 justify-center">
                          <Text
                            className={`text-sm leading-tight mb-0.5 ${notif.read ? "text-slate-700 font-medium" : "text-slate-900 font-bold"}`}
                          >
                            {notif.title}
                          </Text>
                          <Text
                            className="text-slate-500 text-xs leading-relaxed mb-1"
                            numberOfLines={2}
                          >
                            {notif.desc}
                          </Text>
                          <Text
                            className={`text-[10px] font-bold uppercase tracking-wider ${notif.read ? "text-slate-400" : "text-blue-600"}`}
                          >
                            {notif.time}
                          </Text>
                        </View>
                        <View className="items-center justify-start pt-1 gap-2 shrink-0">
                          {!notif.read && (
                            <View className="w-2 h-2 bg-blue-600 rounded-full shadow-sm" />
                          )}
                        </View>
                      </Pressable>
                    );
                  })}
                  <Pressable className="p-4 items-center justify-center border-t border-slate-100">
                    <Text className="text-slate-400 font-bold text-xs uppercase tracking-wider">
                      End of notifications
                    </Text>
                  </Pressable>
                </View>
              ) : (
                <View className="py-20 items-center justify-center">
                  <View className="w-16 h-16 bg-slate-50 rounded-full items-center justify-center mb-4">
                    <MaterialCommunityIcons
                      name="bell-sleep"
                      size={32}
                      color="#cbd5e1"
                    />
                  </View>
                  <Text className="text-lg font-black text-slate-800 mb-1">
                    All caught up!
                  </Text>
                  <Text className="text-slate-500 text-sm text-center px-6">
                    No new notifications right now.
                  </Text>
                </View>
              )}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
