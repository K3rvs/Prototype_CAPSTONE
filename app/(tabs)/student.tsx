import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  startTransition,
} from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
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
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { GlobalModal } from "@/components/shared/AdminUI";
import { StudentDashboardSection } from "@/components/student/StudentDashboardSection";
import { StudentClasses } from "@/components/student/StudentClasses";
import { StudentCommunities } from "@/components/student/StudentCommunities";
import { StudentAcademicPassport } from "@/components/student/StudentAcademicPassport";
import { StudentSchoolCalendar } from "@/components/student/StudentSchoolCalendar";
import { StudentHelpFAQ } from "@/components/student/StudentHelpFAQ";
import { StudentProfileSection } from "@/components/student/StudentProfileSection";

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: "view-dashboard-outline" },
  { id: "classes", label: "Classes", icon: "google-classroom" },
  { id: "communities", label: "Community", icon: "account-group-outline" },
  { id: "passport", label: "Passport", icon: "wallet-membership" },
  { id: "calendar", label: "Calendar", icon: "calendar-month-outline" },
  { id: "faq", label: "Help & FAQ", icon: "help-circle-outline" },
];

export default function StudentDashboard() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [previousTab, setPreviousTab] = useState("dashboard");
  const [mountedTabs, setMountedTabs] = useState<Set<string>>(
    new Set(["dashboard"]),
  );
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchPageOpen, setIsSearchPageOpen] = useState(false);
  const [isNotifPageOpen, setIsNotifPageOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const searchResults = useMemo(() => {
    if (!searchQuery) return TABS;
    return TABS.filter(
      (t) =>
        t.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Grade Posted",
      desc: "Your Practical Research 2 midterm grade is available.",
      time: "2h ago",
      timestamp: Date.now() - 120 * 60000,
      read: false,
      icon: "file-document-outline",
      color: "orange",
      route: "classes",
    },
    {
      id: 2,
      title: "SBT Minted!",
      desc: "You earned the 'First to Suffer' badge.",
      time: "1d ago",
      timestamp: Date.now() - 1440 * 60000,
      read: true,
      icon: "medal-outline",
      color: "purple",
      route: "passport",
    },
    {
      id: 3,
      title: "Upcoming Deadline",
      desc: "Chapter 3 Defense is due tomorrow at 8:00 AM.",
      time: "4h ago",
      timestamp: Date.now() - 240 * 60000,
      read: false,
      icon: "calendar-alert",
      color: "orange",
      route: "calendar",
    },
    {
      id: 4,
      title: "New Material Uploaded",
      desc: "Teacher Jane uploaded 'Chapter_1_Introduction.pptx'.",
      time: "5h ago",
      timestamp: Date.now() - 300 * 60000,
      read: false,
      icon: "folder-open",
      color: "slate",
      route: "classes",
    },
    {
      id: 5,
      title: "Community Mention",
      desc: "Alex mentioned you in Science Innovators Club.",
      time: "12h ago",
      timestamp: Date.now() - 720 * 60000,
      read: true,
      icon: "comment-account",
      color: "purple",
      route: "communities",
    },
    {
      id: 6,
      title: "Quiz Assigned",
      desc: "You have a new mock test for General Mathematics.",
      time: "1d ago",
      timestamp: Date.now() - 1500 * 60000,
      read: true,
      icon: "clipboard-text",
      color: "orange",
      route: "classes",
    },
    {
      id: 7,
      title: "AI Tutor Digest",
      desc: "Your weekly study digest is ready to review.",
      time: "2d ago",
      timestamp: Date.now() - 2880 * 60000,
      read: true,
      icon: "robot-outline",
      color: "slate",
      route: "dashboard",
    },
    {
      id: 8,
      title: "Assignment Graded",
      desc: "Your 'Book Report Draft' was graded: 92/100.",
      time: "3d ago",
      timestamp: Date.now() - 4320 * 60000,
      read: true,
      icon: "check-decagram",
      color: "emerald",
      route: "classes",
    },
    {
      id: 9,
      title: "Event Reminder",
      desc: "Science Fair Registration ends in 2 days.",
      time: "4d ago",
      timestamp: Date.now() - 5760 * 60000,
      read: true,
      icon: "calendar-clock",
      color: "orange",
      route: "calendar",
    },
    {
      id: 10,
      title: "Welcome to i++",
      desc: "Your student account is fully set up. Happy learning!",
      time: "1w ago",
      timestamp: Date.now() - 10080 * 60000,
      read: true,
      icon: "hand-wave",
      color: "blue",
      route: "faq",
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

  const getColorStyles = (color: string) => {
    switch (color) {
      case "orange":
        return { bg: "bg-orange-100", text: "text-orange-500", hex: "#f97316" };
      case "purple":
        return { bg: "bg-purple-100", text: "text-purple-500", hex: "#a855f7" };
      default:
        return { bg: "bg-slate-100", text: "text-slate-500", hex: "#64748b" };
    }
  };

  const handleNavigate = useCallback((tab: string, className?: string) => {
    setMountedTabs((prev) => new Set(prev).add(tab));
    setActiveTab(tab);
    if (className) setSelectedClass(className);
  }, []);

  const handleGoBackPassport = useCallback(() => {
    setMountedTabs((prev) =>
      new Set(prev).add(previousTab === "passport" ? "dashboard" : previousTab),
    );
    setActiveTab(previousTab === "passport" ? "dashboard" : previousTab);
  }, [previousTab]);

  const handleGoBackProfile = useCallback(() => {
    setMountedTabs((prev) => new Set(prev).add(previousTab));
    setActiveTab(previousTab);
  }, [previousTab]);

  const [isTestActive, setIsTestActive] = useState(false);

  const memoizedDashboard = useMemo(
    () => <StudentDashboardSection onNavigate={handleNavigate} />,
    [handleNavigate],
  );
  const memoizedClasses = useMemo(
    () => (
      <StudentClasses
        onTestActiveChange={setIsTestActive}
        selectedClassId={selectedClass}
        onClassSelect={setSelectedClass}
      />
    ),
    [selectedClass],
  );
  const memoizedCommunities = useMemo(() => <StudentCommunities />, []);
  const memoizedPassport = useMemo(
    () => <StudentAcademicPassport goBack={handleGoBackPassport} />,
    [handleGoBackPassport],
  );
  const memoizedCalendar = useMemo(() => <StudentSchoolCalendar />, []);
  const memoizedFAQ = useMemo(() => <StudentHelpFAQ />, []);
  const memoizedProfile = useMemo(
    () => <StudentProfileSection goBack={handleGoBackProfile} />,
    [handleGoBackProfile],
  );

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
    top: Platform.OS === "web" ? 56 : insets.top,
    bottom: Platform.OS === "web" ? 0 : insets.bottom,
    left: 0,
    zIndex: 99,
    elevation: 99,
    width: 360,
    backgroundColor:
      Platform.OS === "web" ? "rgba(255, 255, 255, 0.95)" : "#ffffff",
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
    position: "absolute",
    top: Platform.OS === "web" ? 56 : insets.top,
    bottom: Platform.OS === "web" ? 0 : insets.bottom,
    left: 0,
    right: 0,
    zIndex: 98,
    elevation: 98,
    backgroundColor: "rgba(15, 23, 42, 0.2)",
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: iconRotate.value }, { scale: iconScale.value }],
  }));

  const mobileSidebarAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: sidebarTranslateX.value }],
  }));

  const mobileBackdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const renderSidebarContent = (isMobileMenu = false) => (
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
        <View className={isMobileMenu ? "gap-3" : "gap-2"}>
          {TABS.map((tab) => (
            <Pressable
              key={tab.id}
              onPress={() => {
                setIsSidebarOpen(false);
                setMountedTabs((prev) => new Set(prev).add(tab.id));
                setActiveTab(tab.id);
              }}
              className={`flex-row items-center ${isMobileMenu ? "rounded-2xl p-4 gap-4" : "rounded-xl p-2.5 gap-3"} ${activeTab === tab.id ? "bg-sky-50 border border-sky-200/50 shadow-sm" : "border border-transparent hover:bg-slate-50"}`}
            >
              <MaterialCommunityIcons
                name={tab.icon as any}
                size={isMobileMenu ? 28 : 20}
                color={activeTab === tab.id ? "#0284c7" : "#64748b"}
              />
              <Text
                className={`font-bold ${isMobileMenu ? "text-lg" : "text-sm"} ${activeTab === tab.id ? "text-sky-900" : "text-slate-600"}`}
              >
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </>
  );

  const renderMoreMenu = () => (
    <ScrollView
      className="flex-1 px-4 py-6 bg-slate-50"
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-6">
        <Text className="text-2xl font-black text-slate-900 tracking-tight">
          More Options
        </Text>
        <Text className="text-slate-500 text-xs sm:text-sm mt-1 font-medium">
          Explore additional features and account settings
        </Text>
      </View>

      <View className="gap-4 pb-12">
        <Pressable
          onPress={() => {
            setPreviousTab("more");
            setMountedTabs((prev) => new Set(prev).add("calendar"));
            setActiveTab("calendar");
          }}
          className="flex-row items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm active:bg-slate-50"
        >
          <View className="flex-row items-center gap-4 flex-1">
            <View className="w-12 h-12 bg-amber-50 rounded-xl items-center justify-center border border-amber-100">
              <MaterialCommunityIcons
                name="calendar-month-outline"
                size={24}
                color="#d97706"
              />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-slate-800 text-base">
                Calendar
              </Text>
              <Text className="text-slate-500 text-xs mt-0.5">
                View school events and calendars
              </Text>
            </View>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={22}
            color="#cbd5e1"
          />
        </Pressable>

        <Pressable
          onPress={() => {
            setPreviousTab("more");
            setMountedTabs((prev) => new Set(prev).add("faq"));
            setActiveTab("faq");
          }}
          className="flex-row items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm active:bg-slate-50"
        >
          <View className="flex-row items-center gap-4 flex-1">
            <View className="w-12 h-12 bg-sky-50 rounded-xl items-center justify-center border border-sky-100">
              <MaterialCommunityIcons
                name="help-circle-outline"
                size={24}
                color="#0284c7"
              />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-slate-800 text-base">
                Help & FAQ
              </Text>
              <Text className="text-slate-500 text-xs mt-0.5">
                Find answers to frequently asked questions
              </Text>
            </View>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={22}
            color="#cbd5e1"
          />
        </Pressable>

        <Pressable
          onPress={() => {
            setPreviousTab("more");
            setMountedTabs((prev) => new Set(prev).add("profile"));
            setActiveTab("profile");
          }}
          className="flex-row items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm active:bg-slate-50"
        >
          <View className="flex-row items-center gap-4 flex-1">
            <View className="w-12 h-12 bg-indigo-50 rounded-xl items-center justify-center border border-indigo-100">
              <MaterialCommunityIcons
                name="account-outline"
                size={24}
                color="#4f46e5"
              />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-slate-800 text-base">
                Profile & Settings
              </Text>
              <Text className="text-slate-500 text-xs mt-0.5">
                View and update your personal details
              </Text>
            </View>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={22}
            color="#cbd5e1"
          />
        </Pressable>
      </View>
    </ScrollView>
  );

  // =========================================================================
  // MOBILE LAYOUT
  // =========================================================================
  if (Platform.OS !== "web") {
    return (
      <SafeAreaView className="flex-1 bg-white relative flex-col">
        {/* Mobile Top Header */}
        {!isTestActive && (
          <View className="h-16 px-4 flex-row items-center justify-between border-b border-slate-100 bg-white shadow-sm z-50 relative">
            {/* Left Section: Top-Left Sidebar Trigger */}
            <View className="flex-1 flex-row items-center justify-start">
              <Pressable
                onPress={() => setIsSidebarOpen(true)}
                className="items-center justify-center p-2 -ml-2 rounded-full active:bg-slate-100"
              >
                <MaterialCommunityIcons name="menu" size={28} color="#0f172a" />
              </Pressable>
            </View>

            {/* Center Section: Centered Logo */}
            <View className="flex-row items-center justify-center gap-2 shrink-0">
              <Image
                source={require("@/assets/images/icon.png")}
                style={{ width: 28, height: 28, borderRadius: 8 }}
              />
              <Text className="text-xl font-black text-slate-900 tracking-wider">
                i++
              </Text>
            </View>

            {/* Right Section: Actions */}
            <View className="flex-1 flex-row items-center justify-end gap-3 sm:gap-4">
              <Pressable onPress={() => setIsSearchPageOpen(true)}>
                <MaterialCommunityIcons
                  name="magnify"
                  size={26}
                  color="#0f172a"
                />
              </Pressable>
              <Pressable
                onPress={() => setIsNotifPageOpen(true)}
                className="relative"
              >
                <MaterialCommunityIcons
                  name={unreadCount > 0 ? "bell" : "bell-outline"}
                  size={26}
                  color="#0f172a"
                />
                {unreadCount > 0 && (
                  <View className="absolute -top-1 -right-1 min-w-[16px] h-[16px] bg-red-500 rounded-full items-center justify-center border-2 border-white">
                    <Text className="text-[9px] font-bold text-white leading-none">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </Text>
                  </View>
                )}
              </Pressable>
              <Pressable
                onPress={() => {
                  setPreviousTab(activeTab);
                  setMountedTabs((prev) => new Set(prev).add("profile"));
                  setActiveTab("profile");
                }}
                className="w-8 h-8 bg-sky-600 rounded-full items-center justify-center ml-1"
              >
                <Text className="font-bold text-white text-sm">S</Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* Mobile Main Content */}
        <View className="flex-1 bg-slate-50 relative">
          {activeTab === "dashboard" && memoizedDashboard}
          {activeTab === "classes" && memoizedClasses}
          {activeTab === "communities" && memoizedCommunities}
          {activeTab === "passport" && memoizedPassport}
          {activeTab === "calendar" && memoizedCalendar}
          {activeTab === "faq" && memoizedFAQ}
          {activeTab === "profile" && memoizedProfile}
          {activeTab === "more" && renderMoreMenu()}
        </View>

        {/* Mobile Left-Side Sidebar Drawer */}
        <Modal
          visible={isSidebarOpen}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setIsSidebarOpen(false)}
        >
          <View className="flex-1 flex-row justify-start">
            {/* Backdrop */}
            <Pressable
              className="absolute inset-0 bg-slate-900/40"
              onPress={() => setIsSidebarOpen(false)}
            />
            {/* Sidebar Container */}
            <Animated.View
              style={[
                mobileSidebarAnimatedStyle,
                { width: 360, height: "100%" },
              ]}
            >
              <SafeAreaView
                className="flex-1 bg-white shadow-2xl"
                edges={["top", "bottom"]}
              >
                <View className="flex-1 py-6 px-4">
                  {renderSidebarContent(true)}
                </View>
              </SafeAreaView>
            </Animated.View>
          </View>
        </Modal>

        {/* Mobile Search Modal */}
        <Modal
          visible={isSearchPageOpen}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setIsSearchPageOpen(false)}
        >
          <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 w-full bg-white">
              <View className="h-16 border-b border-slate-200 flex-row items-center px-4 gap-3">
                <Pressable onPress={() => setIsSearchPageOpen(false)}>
                  <MaterialCommunityIcons
                    name="arrow-left"
                    size={26}
                    color="#0f172a"
                  />
                </Pressable>
                <View className="flex-1 bg-slate-100 rounded-full flex-row items-center px-4 h-11 border border-slate-200">
                  <TextInput
                    placeholder="Search..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    className="flex-1 text-slate-900 h-full"
                  />
                </View>
              </View>
              <ScrollView className="flex-1 bg-slate-50">
                {searchResults.map((tab) => (
                  <Pressable
                    key={tab.id}
                    onPress={() => {
                      setIsSearchPageOpen(false);
                      setMountedTabs((prev) => new Set(prev).add(tab.id));
                      setActiveTab(tab.id);
                    }}
                    className="flex-row items-center gap-4 px-6 py-4 border-b border-slate-100 bg-white"
                  >
                    <MaterialCommunityIcons
                      name={tab.icon as any}
                      size={24}
                      color="#334155"
                    />
                    <Text className="font-bold text-lg text-slate-900">
                      {tab.label}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </SafeAreaView>
        </Modal>

        {/* Mobile Notification Modal */}
        <Modal
          visible={isNotifPageOpen}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setIsNotifPageOpen(false)}
        >
          <SafeAreaView className="flex-1 bg-white">
            <View className="h-16 border-b border-slate-200 flex-row items-center justify-between px-4">
              <View className="flex-row items-center gap-2">
                <Pressable onPress={() => setIsNotifPageOpen(false)}>
                  <MaterialCommunityIcons
                    name="arrow-left"
                    size={26}
                    color="#0f172a"
                  />
                </Pressable>
                <Text className="text-xl font-black">Notifications</Text>
              </View>
              {unreadCount > 0 && (
                <Pressable onPress={markAllAsRead}>
                  <Text className="text-sky-600 font-bold text-sm">
                    Mark All Read
                  </Text>
                </Pressable>
              )}
            </View>
            <ScrollView className="flex-1 bg-white">
              {sortedNotifications.map((notif) => (
                <Pressable
                  key={notif.id}
                  onPress={() => {
                    markAsRead(notif.id);
                    setIsNotifPageOpen(false);
                    if (notif.route) {
                      setMountedTabs((prev) => new Set(prev).add(notif.route));
                      setActiveTab(notif.route);
                    }
                  }}
                  className={`px-4 py-4 border-b border-slate-100 flex-row gap-4 ${!notif.read ? "bg-slate-50" : "bg-white"}`}
                >
                  <View className="flex-1">
                    <Text
                      className={`text-base ${notif.read ? "text-slate-700" : "text-slate-900 font-bold"}`}
                    >
                      {notif.title}
                    </Text>
                    <Text className="text-slate-600 text-sm">{notif.desc}</Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    );
  }

  // =========================================================================
  // WEB LAYOUT
  // =========================================================================
  return (
    <SafeAreaView className="flex-1 bg-slate-50 relative overflow-hidden flex-row">
      {/* Persistent Sidebar */}
      {!isTestActive && (
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
          <View className="flex-1 py-6 px-4">
            {renderSidebarContent(false)}
          </View>
        </View>
      )}

      {/* Main Content Area */}
      <View className="flex-1 relative z-10">
        {/* Animated Top Header */}
        {!isTestActive && (
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
              <Text className="text-base font-black text-slate-900 tracking-wider">
                i++
              </Text>
            </Pressable>

            {/* Right Actions */}
            <View className="flex-row items-center gap-1 sm:gap-4">
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
                  startTransition(() => {
                    setMountedTabs((prev) => new Set(prev).add("profile"));
                    setActiveTab("profile");
                  });
                }}
                className="w-7 h-7 sm:w-8 sm:h-8 bg-sky-600 rounded-full items-center justify-center ml-1 sm:ml-2 hover:opacity-90 active:scale-95 transition-all"
              >
                <Text className="font-bold text-white text-xs sm:text-sm">
                  S
                </Text>
              </Pressable>
            </View>
          </Animated.View>
        )}

        {/* Main Content */}
        <Animated.ScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          className={`flex-1 z-10 ${isTestActive ? "px-0" : "px-4 sm:px-8"}`}
          contentContainerStyle={{
            paddingTop: isTestActive ? 0 : 76,
            paddingBottom: isTestActive ? 0 : 40,
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View className="w-full max-w-7xl mx-auto flex-1">
            <View className="w-full mb-12 flex-1 relative">
              <View
                style={
                  {
                    display: activeTab === "dashboard" ? "flex" : "none",
                    flex: 1,
                    ...(Platform.OS === "web" ? { zoom: 0.9 } : {}),
                  } as any
                }
              >
                {mountedTabs.has("dashboard") && memoizedDashboard}
              </View>
              <View
                style={
                  {
                    display: activeTab === "classes" ? "flex" : "none",
                    flex: 1,
                    ...(Platform.OS === "web" ? { zoom: 0.9 } : {}),
                  } as any
                }
              >
                {mountedTabs.has("classes") && memoizedClasses}
              </View>
              <View
                style={
                  {
                    display: activeTab === "communities" ? "flex" : "none",
                    flex: 1,
                    ...(Platform.OS === "web" ? { zoom: 0.9 } : {}),
                  } as any
                }
              >
                {mountedTabs.has("communities") && memoizedCommunities}
              </View>
              <View
                style={
                  {
                    display: activeTab === "passport" ? "flex" : "none",
                    flex: 1,
                    ...(Platform.OS === "web" ? { zoom: 0.9 } : {}),
                  } as any
                }
              >
                {mountedTabs.has("passport") && memoizedPassport}
              </View>
              <View
                style={
                  {
                    display: activeTab === "calendar" ? "flex" : "none",
                    flex: 1,
                    ...(Platform.OS === "web" ? { zoom: 0.9 } : {}),
                  } as any
                }
              >
                {mountedTabs.has("calendar") && memoizedCalendar}
              </View>
              <View
                style={
                  {
                    display: activeTab === "faq" ? "flex" : "none",
                    flex: 1,
                    ...(Platform.OS === "web" ? { zoom: 0.9 } : {}),
                  } as any
                }
              >
                {mountedTabs.has("faq") && memoizedFAQ}
              </View>
              <View
                style={{
                  display: activeTab === "profile" ? "flex" : "none",
                  flex: 1,
                }}
              >
                {mountedTabs.has("profile") && memoizedProfile}
              </View>
            </View>
          </Animated.View>
        </Animated.ScrollView>
      </View>

      {/* Sidebar Overlay Drawer */}
      {Platform.OS === "web" ? (
        <>
          <View
            className={`absolute top-14 left-0 right-0 bottom-0 z-40 bg-slate-900/20 transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0"} xl:hidden`}
            pointerEvents={isSidebarOpen ? "auto" : "none"}
          >
            <Pressable
              className="flex-1"
              onPress={() => setIsSidebarOpen(false)}
            />
          </View>
          <View
            className={`absolute top-14 bottom-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-md shadow-2xl border-r border-slate-200 flex-col py-6 px-4 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} xl:hidden`}
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
                placeholder="Search materials, tests, or peers..."
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
                        setIsSearchPageOpen(false);
                        setSearchQuery("");
                        startTransition(() => {
                          setMountedTabs((prev) => new Set(prev).add(tab.id));
                          setActiveTab(tab.id);
                        });
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
                        onPress={() => {
                          markAsRead(notif.id);
                          setIsNotifPageOpen(false);
                          if (notif.route) {
                            startTransition(() => {
                              setMountedTabs((prev) =>
                                new Set(prev).add(notif.route),
                              );
                              setActiveTab(notif.route);
                            });
                          }
                        }}
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
                            className={`text-[10px] font-bold uppercase tracking-wider ${notif.read ? "text-slate-400" : "text-orange-500"}`}
                          >
                            {notif.time}
                          </Text>
                        </View>
                        <View className="items-center justify-start pt-1 gap-2 shrink-0">
                          {!notif.read && (
                            <View className="w-2 h-2 bg-orange-500 rounded-full shadow-sm" />
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
