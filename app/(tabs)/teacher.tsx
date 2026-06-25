import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import {
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
  useAnimatedScrollHandler
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalModal } from "@/components/shared/AdminUI";

import { TeacherCalendarSection } from "@/components/teacher/TeacherCalendarSection";
import { TeacherClassroomsSection } from "@/components/teacher/TeacherClassroomsSection";
import { TeacherWorkspaceSection } from "@/components/teacher/TeacherWorkspaceSection";

import { TeacherClassStatistics } from "@/components/teacher/TeacherClassStatistics";
import { TeacherClassAnnouncements } from "@/components/teacher/TeacherClassAnnouncements";
import { TeacherClassAssessments } from "@/components/teacher/TeacherClassAssessments";
import { TeacherClassMaterials } from "@/components/teacher/TeacherClassMaterials";
import { TeacherClassAI } from "@/components/teacher/TeacherClassAI";
import { TeacherProfileSection } from "@/components/teacher/TeacherProfileSection";
import { TeacherClassDirectory } from "@/components/teacher/TeacherClassDirectory";
import { StudentHelpFAQ } from "@/components/student/StudentHelpFAQ";
import { TeacherRemediationHub } from "@/components/teacher/TeacherRemediationHub";
import { SHARED_CLASSES } from "@/components/shared/StudentMockData";
const GLOBAL_TABS = [
  { id: "workspace", label: "Dashboard", icon: "view-dashboard" },
  { id: "classrooms", label: "Classes", icon: "google-classroom" },
  { id: "remediation", label: "Remediation", icon: "medical-bag" },
  { id: "calendar", label: "Calendar", icon: "calendar-month" },
  { id: "faq", label: "Help & FAQ", icon: "help-circle-outline" },
];

const CLASS_TABS = [
  { id: "announcements", label: "Announcements", icon: "bullhorn" },
  { id: "statistics", label: "Statistics and Analytics", icon: "chart-bar" },
  { id: "materials", label: "Materials", icon: "folder-open-outline" },
  { id: "classroom_ai", label: "Classroom AI", icon: "robot-outline" },
  { id: "assessments", label: "Assessments", icon: "clipboard-text-outline" },
  { id: "directory", label: "Student Directory", icon: "account-group" },
];

export default function TeacherDashboard() {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState("workspace");
  const [previousTab, setPreviousTab] = useState("workspace");
  const [selectedClass, setSelectedClass] = useState<any | null>(null);

  const [classes, setClasses] = useState(SHARED_CLASSES);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchPageOpen, setIsSearchPageOpen] = useState(false);
  const [isNotifPageOpen, setIsNotifPageOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "High Failure Rate",
      desc: "68% of 11-STEM-02 failed self-tests on Rational Functions.",
      time: "10m ago",
      timestamp: Date.now() - 10 * 60000,
      read: false,
      icon: "alert-octagon",
      color: "red",
    },
    {
      id: 2,
      title: "RAG Sync Complete",
      desc: "APA formatting guidelines ingested successfully.",
      time: "2h ago",
      timestamp: Date.now() - 120 * 60000,
      read: false,
      icon: "database-check",
      color: "teal",
    },
    {
      id: 3,
      title: "Assignment Submission",
      desc: "Juan Dela Cruz submitted 'Book Report Draft'.",
      time: "3h ago",
      timestamp: Date.now() - 180 * 60000,
      read: false,
      icon: "file-check",
      color: "slate",
    },
    {
      id: 4,
      title: "New AI Query Spike",
      desc: "High volume of questions regarding limits detected.",
      time: "4h ago",
      timestamp: Date.now() - 240 * 60000,
      read: true,
      icon: "chart-line",
      color: "teal",
    },
    {
      id: 5,
      title: "Attendance Warning",
      desc: "3 students missed more than 3 consecutive sessions.",
      time: "1d ago",
      timestamp: Date.now() - 1440 * 60000,
      read: false,
      icon: "account-alert",
      color: "red",
    },
    {
      id: 6,
      title: "System Scheduled Maintenance",
      desc: "The LMS will be offline for 2 hours on Sunday.",
      time: "1d ago",
      timestamp: Date.now() - 1500 * 60000,
      read: true,
      icon: "wrench",
      color: "slate",
    },
    {
      id: 7,
      title: "Parent Teacher Meeting",
      desc: "Reminder: PTA meeting this Friday at 10:00 AM.",
      time: "2d ago",
      timestamp: Date.now() - 2880 * 60000,
      read: true,
      icon: "calendar-clock",
      color: "teal",
    },
    {
      id: 8,
      title: "Class Roster Updated",
      desc: "2 new students added to Practical Research 2.",
      time: "3d ago",
      timestamp: Date.now() - 4320 * 60000,
      read: true,
      icon: "account-multiple-plus",
      color: "blue",
    },
    {
      id: 9,
      title: "Quiz Graded",
      desc: "Auto-grading completed for Chapter 1 Quiz.",
      time: "4d ago",
      timestamp: Date.now() - 5760 * 60000,
      read: true,
      icon: "check-all",
      color: "emerald",
    },
    {
      id: 10,
      title: "Storage Limit Approaching",
      desc: "You have used 90% of your file storage quota.",
      time: "5d ago",
      timestamp: Date.now() - 7200 * 60000,
      read: true,
      icon: "cloud-alert",
      color: "orange",
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

  const currentTabs = selectedClass ? CLASS_TABS : GLOBAL_TABS;

  const searchResults = useMemo(() => {
    if (!searchQuery) return currentTabs;
    return currentTabs.filter(
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
      case "teal":
        return {
          bg: "bg-teal-100",
          text: "text-teal-500",
          hex: "#0d9488",
        };
      default:
        return { bg: "bg-slate-100", text: "text-slate-500", hex: "#64748b" };
    }
  };

  const mobileMainTabs = currentTabs.slice(0, 4);
  const mobileOtherTabs = currentTabs.slice(4);

  const handleSelectClass = (cls: any) => {
    setSelectedClass(cls);
    setActiveTab("announcements"); // Default tab inside a class
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

  const classScrollY = useSharedValue(0);
  const classBottomBarTranslateY = useSharedValue(0);

  const classScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentScrollY = event.contentOffset.y;
      const diff = currentScrollY - classScrollY.value;
      if (currentScrollY <= 0) {
        classBottomBarTranslateY.value = withTiming(0, { duration: 150 });
      } else if (diff > 5 && currentScrollY > 50) {
        classBottomBarTranslateY.value = withTiming(100, { duration: 150 });
      } else if (diff < -5) {
        classBottomBarTranslateY.value = withTiming(0, { duration: 150 });
      }
      classScrollY.value = currentScrollY;
    },
  });

  const classBottomBarStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: classBottomBarTranslateY.value }],
  }));

  const headerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: headerTranslateY.value }],
  }));

  const sidebarTranslateX = useSharedValue(-400);
  const backdropOpacity = useSharedValue(0);
  const iconRotate = useSharedValue("0deg");
  const iconScale = useSharedValue(1);

  useEffect(() => {
    if (isSidebarOpen) {
      sidebarTranslateX.value = withSpring(0, { damping: 20, stiffness: 150, mass: 0.8 });
      backdropOpacity.value = withTiming(1, { duration: 300 });
      iconRotate.value = withSpring("15deg", { damping: 15, stiffness: 150 });
      iconScale.value = withSpring(0.9, { damping: 15, stiffness: 150 });
    } else {
      sidebarTranslateX.value = withTiming(-400, { duration: 300, easing: Easing.inOut(Easing.ease) });
      backdropOpacity.value = withTiming(0, { duration: 300 });
      iconRotate.value = withSpring("0deg", { damping: 15, stiffness: 150 });
      iconScale.value = withSpring(1, { damping: 15, stiffness: 150 });
    }
  }, [isSidebarOpen]);

  const sidebarStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: sidebarTranslateX.value }],
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 50,
    elevation: 50,
    width: 256,
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 40,
    elevation: 40,
    backgroundColor: 'rgba(15, 23, 42, 0.2)',
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: iconRotate.value }, { scale: iconScale.value }],
  }));

  const renderSidebarContent = () => (
    <>
      <View className="flex-row items-center justify-between mb-4 pt-2 px-2">
         <Text className="text-xs font-black text-slate-400 uppercase tracking-widest">Modules</Text>
         <Pressable onPress={() => setIsSidebarOpen(false)} className="p-2 rounded-full hover:bg-slate-100 active:bg-slate-200 xl:hidden">
            <MaterialCommunityIcons name="close" size={20} color="#64748b" />
         </Pressable>
      </View>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="gap-2">
          {GLOBAL_TABS.map((tab) => (
            <Pressable key={tab.id} onPress={() => { setSelectedClass(null); setActiveTab(tab.id); setIsSidebarOpen(false); }} className={`flex-row items-center rounded-xl p-2.5 gap-3 ${(!selectedClass && activeTab === tab.id) ? "bg-teal-50 border border-teal-200/50 shadow-sm" : "border border-transparent hover:bg-slate-50"}`}>
               <MaterialCommunityIcons name={tab.icon as any} size={20} color={(!selectedClass && activeTab === tab.id) ? "#0f766e" : "#64748b"} />
               <Text className={`font-bold text-sm ${(!selectedClass && activeTab === tab.id) ? "text-teal-900" : "text-slate-600"}`}>{tab.label}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-50 relative overflow-hidden flex-row">
      {/* Background Decorators */}
      <View className="absolute top-[-50px] left-[-50px] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-teal-400/20 rounded-full blur-[80px] pointer-events-none z-0" />
      <View className="absolute bottom-[-50px] right-[-50px] w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none z-0" />

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
        <View className="flex-1 py-6 px-4">
          {renderSidebarContent()}
        </View>
      </View>

      {/* Main Content Area */}
      <View className="flex-1 relative z-10">
        {/* Animated Top Header */}
        <Animated.View style={headerStyle} className="absolute top-0 left-0 right-0 h-14 bg-white/95 backdrop-blur-md border-b border-slate-200 flex-row items-center justify-between xl:justify-end px-4 sm:px-5 z-40 shadow-sm">
          {/* Mobile Logo */}
          <Pressable onPress={() => setIsSidebarOpen(!isSidebarOpen)} className="flex-row items-center gap-3 xl:hidden active:opacity-70 transition-opacity cursor-pointer">
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
        <View className="flex-row items-center gap-1 sm:gap-3 relative">
          {/* Search Action */}
          <Pressable
            onPress={() => setIsSearchPageOpen(true)}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full items-center justify-center"
          >
            <MaterialCommunityIcons name="magnify" size={22} color="#0f172a" />
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
            onPress={() => { setPreviousTab(activeTab); setActiveTab("profile"); }} 
            className="w-7 h-7 sm:w-8 sm:h-8 bg-teal-700 rounded-full items-center justify-center ml-1 sm:ml-2 hover:opacity-90 active:scale-95 transition-all">
            <Text className="font-bold text-white text-xs sm:text-sm">MS</Text>
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
        <Animated.View entering={FadeInDown.duration(400)} className="w-full max-w-7xl mx-auto flex-1">
          <View className={`w-full flex-1 ${selectedClass ? "hidden" : "flex"}`}>
            {activeTab === "workspace" && <View style={{ ...(Platform.OS === 'web' ? { zoom: 0.9 } : {}) } as any}><TeacherWorkspaceSection setActiveTab={setActiveTab} /></View>}
            {activeTab === "classrooms" && <View style={{ ...(Platform.OS === 'web' ? { zoom: 0.9 } : {}) } as any}><TeacherClassroomsSection onSelectClass={handleSelectClass} classes={classes} setClasses={setClasses} /></View>}
            {activeTab === "calendar" && <View style={{ ...(Platform.OS === 'web' ? { zoom: 0.9 } : {}) } as any}><TeacherCalendarSection /></View>}
            {activeTab === "remediation" && <View style={{ ...(Platform.OS === 'web' ? { zoom: 0.9 } : {}) } as any}><TeacherRemediationHub classes={classes} /></View>}
            {activeTab === "faq" && <View style={{ ...(Platform.OS === 'web' ? { zoom: 0.9 } : {}) } as any}><StudentHelpFAQ /></View>}
            {activeTab === "profile" && <TeacherProfileSection goBack={() => setActiveTab(previousTab)} />}
          </View>

          {selectedClass && (
            <View className="flex-1 flex-col h-full w-full relative bg-slate-50/50" style={Platform.OS === 'web' ? { position: 'fixed', top: 64, left: 0, right: 0, bottom: 0 } as any : {}}>
              {/* Global View Mimic Header (Persistent) */}
              {activeTab === "announcements" && (
                <View className={`bg-${selectedClass.color || 'teal'}-600 p-5 sm:p-6 flex-row items-center justify-between shadow-inner relative overflow-hidden group shrink-0 rounded-2xl`}>
                  <MaterialCommunityIcons name="google-classroom" size={140} color="#ffffff" className="absolute -right-10 -top-10 opacity-10 pointer-events-none" />
                  <View className="flex-1 pr-4 z-10">
                    <Pressable onPress={() => { setSelectedClass(null); setActiveTab("workspace"); }} className="self-start flex-row items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg border border-white/30 mb-4 active:bg-white/30 transition-colors">
                      <MaterialCommunityIcons name="arrow-left" size={16} color="white" />
                      <Text className="text-white font-bold text-xs uppercase tracking-widest">Global View</Text>
                    </Pressable>
                    <Text className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">{selectedClass.name}</Text>
                    <View className="flex-row items-center gap-3 flex-wrap">
                      <View className={`bg-${selectedClass.color || 'teal'}-700/50 px-3 py-1 rounded border border-${selectedClass.color || 'teal'}-500`}>
                        <Text className="text-white font-bold text-xs uppercase tracking-wider">{selectedClass.section}</Text>
                      </View>
                      <Text className={`text-${selectedClass.color || 'teal'}-100 font-medium text-sm`}>{selectedClass.students} Students • {selectedClass.schedule}</Text>
                    </View>
                  </View>
                </View>
              )}

              <View className="flex-1 flex-col xl:flex-row p-0 sm:p-0 xl:p-6 gap-0 xl:gap-4 overflow-hidden relative mt-4">
                {/* Desktop Sidebar (hidden below xl) */}
                {Platform.OS === 'web' && (
                  <View className="hidden xl:flex w-48 flex-col gap-2 shrink-0">
                    <Text className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 px-1">Classroom Menu</Text>
                    {CLASS_TABS.map(t => (
                      <Pressable
                        key={t.id}
                        onPress={() => setActiveTab(t.id)}
                        className={`w-full bg-white border p-2.5 rounded-xl shadow-sm hover:border-teal-300 hover:shadow-md transition-all active:scale-[0.98] flex-row items-center gap-3 ${activeTab === t.id ? `border-teal-400 bg-teal-50/50` : 'border-slate-200'}`}
                      >
                        <View className={`w-7 h-7 bg-teal-50 rounded-lg items-center justify-center border border-teal-100`}>
                          <MaterialCommunityIcons name={t.icon as any} size={16} className={`text-teal-600`} />
                        </View>
                        <Text className={`font-bold text-xs sm:text-sm flex-1 ${activeTab === t.id ? `text-teal-800` : 'text-slate-700'}`}>{t.label}</Text>
                      </Pressable>
                    ))}
                  </View>
                )}

                {/* Tab Content Area */}
                <View className="flex-1 flex-col overflow-hidden relative">
                  {/* Mobile/Tablet Horizontal Tabs (if not web) */}
                  {Platform.OS !== 'web' && (
                    <View className="w-full shrink-0 p-4 pb-2">
                      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-3 pr-4">
                        {CLASS_TABS.map(t => (
                          <Pressable
                            key={t.id}
                            onPress={() => setActiveTab(t.id)}
                            className={`w-[130px] bg-white border p-3 rounded-2xl shadow-sm active:bg-slate-50 flex-col items-center justify-center gap-2 ${activeTab === t.id ? `border-teal-400 bg-teal-50/50` : 'border-slate-200'}`}
                          >
                            <View className={`w-10 h-10 bg-teal-50 rounded-xl items-center justify-center border border-teal-100`}>
                              <MaterialCommunityIcons name={t.icon as any} size={22} className={`text-teal-600`} />
                            </View>
                            <Text className={`font-bold text-xs text-center ${activeTab === t.id ? `text-teal-800` : 'text-slate-700'}`}>{t.label}</Text>
                          </Pressable>
                        ))}
                      </ScrollView>
                    </View>
                  )}

                  {/* Sub-tab Views */}
                  {activeTab === "classroom_ai" ? (
                    <View className="flex-1 w-full overflow-hidden" style={{ ...(Platform.OS === 'web' ? { zoom: 0.9 } : {}) } as any}>
                      <TeacherClassAI classId={selectedClass.id} />
                    </View>
                  ) : (
                    <Animated.ScrollView onScroll={classScrollHandler} scrollEventThrottle={16} className="flex-1 px-4 sm:px-6 lg:px-0 mt-4" contentContainerClassName="pb-24" showsVerticalScrollIndicator={true}>
                      {activeTab === "announcements" && <View style={{ ...(Platform.OS === 'web' ? { zoom: 0.9 } : {}) } as any}><TeacherClassAnnouncements classId={selectedClass.id} /></View>}
                      {activeTab === "statistics" && <View style={{ ...(Platform.OS === 'web' ? { zoom: 0.9 } : {}) } as any}><TeacherClassStatistics classId={selectedClass.id} /></View>}
                      {activeTab === "materials" && <View style={{ ...(Platform.OS === 'web' ? { zoom: 0.9 } : {}) } as any}><TeacherClassMaterials classId={selectedClass.id} /></View>}
                      {activeTab === "assessments" && <View style={{ ...(Platform.OS === 'web' ? { zoom: 0.9 } : {}) } as any}><TeacherClassAssessments classId={selectedClass.id} /></View>}
                      {activeTab === "directory" && <View style={{ ...(Platform.OS === 'web' ? { zoom: 0.9 } : {}) } as any}><TeacherClassDirectory classId={selectedClass.id} /></View>}
                    </Animated.ScrollView>
                  )}
                </View>
              </View>

              {/* Web Bottom Bar (animated) */}
              {Platform.OS === 'web' && (
                <Animated.View 
                  style={classBottomBarStyle}
                  className="flex xl:hidden absolute bottom-0 left-0 right-0 bg-white/30 backdrop-blur-xl border-t border-white/40 flex-row justify-around items-center px-2 py-2 z-50 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]"
                >
                  {CLASS_TABS.map(t => (
                    <Pressable
                      key={t.id}
                      onPress={() => setActiveTab(t.id)}
                      className={`flex-col items-center justify-center gap-1.5 p-2 flex-1 rounded-xl transition-colors ${activeTab === t.id ? `bg-teal-500/10` : 'hover:bg-slate-500/10'}`}
                    >
                      <MaterialCommunityIcons 
                        name={t.icon as any} 
                        size={24} 
                        className={activeTab === t.id ? `text-teal-600` : 'text-slate-500'} 
                      />
                      <Text className={`text-[10px] font-bold text-center ${activeTab === t.id ? `text-teal-700` : 'text-slate-500'}`} numberOfLines={1}>{t.label}</Text>
                    </Pressable>
                  ))}
                </Animated.View>
              )}
            </View>
          )}
        </Animated.View>
      </Animated.ScrollView>
      </View>

      {/* Sidebar Overlay Drawer */}
      {Platform.OS === 'web' ? (
        <>
          <View 
            className={`absolute top-0 left-0 right-0 bottom-0 z-40 bg-slate-900/20 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'} xl:hidden`}
            pointerEvents={isSidebarOpen ? "auto" : "none"}
          >
            <Pressable className="flex-1" onPress={() => setIsSidebarOpen(false)} />
          </View>
          <View 
            className={`absolute top-0 bottom-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-md shadow-2xl border-r border-slate-200 flex-col py-6 px-4 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} xl:hidden`}
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
            <Pressable className="flex-1" onPress={() => setIsSidebarOpen(false)} />
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
                placeholder="Search students, topics, or RAG materials..."
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
              <Text className="text-xl font-black text-slate-900 tracking-tight">Notifications</Text>
              <View className="flex-row items-center gap-2">
                {unreadCount > 0 && (
                  <Pressable onPress={markAllAsRead} className="px-3 py-1.5 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                    <Text className="text-slate-700 font-bold text-xs">Mark all read</Text>
                  </Pressable>
                )}
              </View>
            </View>

            {/* Notif List */}
            <ScrollView className="flex-shrink bg-white" showsVerticalScrollIndicator={false}>
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
                        <View className={`w-10 h-10 rounded-full items-center justify-center mt-0.5 shadow-sm shrink-0 ${colors.bg}`}>
                          <MaterialCommunityIcons name={notif.icon as any} size={20} color={colors.hex} />
                        </View>
                        <View className="flex-1 justify-center">
                          <Text className={`text-sm leading-tight mb-0.5 ${notif.read ? "text-slate-700 font-medium" : "text-slate-900 font-bold"}`}>
                            {notif.title}
                          </Text>
                          <Text className="text-slate-500 text-xs leading-relaxed mb-1" numberOfLines={2}>
                            {notif.desc}
                          </Text>
                          <Text className={`text-[10px] font-bold uppercase tracking-wider ${notif.read ? "text-slate-400" : "text-teal-600"}`}>
                            {notif.time}
                          </Text>
                        </View>
                        <View className="items-center justify-start pt-1 gap-2 shrink-0">
                          {!notif.read && (
                            <View className="w-2 h-2 bg-teal-600 rounded-full shadow-sm" />
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
