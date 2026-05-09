import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { SubTabBar, GlobalModal } from "./AdminUI";

export const AdminUsersSection = () => {
  const [subTab, setSubTab] = useState("roster");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [drawerUser, setDrawerUser] = useState<any | null>(null);

  // New State Management
  const [pendingFilter, setPendingFilter] = useState("all");
  const [selectedPending, setSelectedPending] = useState<string[]>([]);
  const [alumniYear, setAlumniYear] = useState("2023");
  const [alumniQuery, setAlumniQuery] = useState("");

  // Added Directory Filters
  const [studentGrade, setStudentGrade] = useState("All");
  const [studentStrand, setStudentStrand] = useState("All");
  const [teacherGrade, setTeacherGrade] = useState("All");
  const [teacherStrand, setTeacherStrand] = useState("All");

  const [studentSearch, setStudentSearch] = useState("");
  const [teacherSearch, setTeacherSearch] = useState("");
  const [adminSearch, setAdminSearch] = useState("");

  const strands = ["STEM", "HUMSS", "ABM", "TVL"];
  const MOCK_STUDENTS: any[] = Array.from({ length: 50 }).map((_, i) => ({
    id: `LRN-${10000 + i}`,
    name: `Student Profile ${i + 1}`,
    strand: strands[i % 4],
    grade: i % 2 === 0 ? "11" : "12",
    type: "Student",
  }));

  const MOCK_PENDING = [
    {
      id: "1",
      type: "Teacher",
      name: "Maria Clara",
      idNum: "992831",
      time: "2h ago",
      color: "teal",
    },
    {
      id: "2",
      type: "Student",
      name: "Crisostomo Ibarra",
      idNum: "102938475612",
      time: "3h ago",
      color: "orange",
      extra: "Grade 12 • STEM-1",
    },
    {
      id: "3",
      type: "Teacher",
      name: "Padre Damaso",
      idNum: "883921",
      time: "5h ago",
      color: "teal",
    },
    {
      id: "4",
      type: "Student",
      name: "Elias",
      idNum: "993847261523",
      time: "1d ago",
      color: "orange",
      extra: "Grade 11 • HUMSS",
    },
  ];

  const MOCK_TEACHERS: any[] = Array.from({ length: 15 }).map((_, i) => ({
    id: `DEPED-${992000 + i}`,
    name: `Teacher Profile ${i + 1}`,
    strand: strands[i % 4],
    grade: i % 3 === 0 ? "11" : i % 3 === 1 ? "12" : "All Levels",
    dept: i % 2 === 0 ? "Science & Math" : "Languages",
    type: "Teacher",
  }));

  const MOCK_ADMINS: any[] = [
    {
      id: "ADMIN-01",
      name: "Principal Juan",
      dept: "Administration",
      type: "Admin",
    },
    {
      id: "ADMIN-02",
      name: "IT Coord. Maria",
      dept: "IT Department",
      type: "Admin",
    },
  ];

  const MOCK_ALUMNI = Array.from({ length: 20 })
    .map((_, i) => ({
      id: `LRN-20${alumniYear.slice(-2)}-${1000 + i}`,
      name: `Alumni Profile ${i + 1}`,
      hash: `0x${Math.random().toString(16).substr(2, 12)}...`,
    }))
    .filter(
      (a) =>
        a.name.toLowerCase().includes(alumniQuery.toLowerCase()) ||
        a.id.includes(alumniQuery),
    );

  const filteredPending = MOCK_PENDING.filter(
    (p) => pendingFilter === "all" || p.type.toLowerCase() === pendingFilter,
  );

  const filteredStudents = MOCK_STUDENTS.filter(
    (s) =>
      (studentGrade === "All" || s.grade === studentGrade) &&
      (studentStrand === "All" || s.strand === studentStrand) &&
      (s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
        s.id.toLowerCase().includes(studentSearch.toLowerCase())),
  );

  const filteredTeachers = MOCK_TEACHERS.filter(
    (t) =>
      (teacherGrade === "All" ||
        t.grade === teacherGrade ||
        t.grade === "All Levels") &&
      (teacherStrand === "All" || t.strand === teacherStrand) &&
      (t.name.toLowerCase().includes(teacherSearch.toLowerCase()) ||
        t.id.toLowerCase().includes(teacherSearch.toLowerCase())),
  );

  const filteredAdmins = MOCK_ADMINS.filter(
    (a) =>
      a.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
      a.id.toLowerCase().includes(adminSearch.toLowerCase()),
  );

  const togglePendingSelection = (id: string) => {
    setSelectedPending((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const renderFilterBar = (
    searchVal: string,
    setSearch: any,
    gradeVal: string,
    setGrade: any,
    strandVal: string,
    setStrand: any,
  ) => (
    <View className="mb-4 gap-3 z-20">
      <View className="flex-row items-center bg-white rounded-2xl px-4 py-2 border border-slate-200 focus-within:border-blue-400 focus-within:shadow-sm transition-all w-full">
        <MaterialCommunityIcons name="magnify" size={20} color="#94a3b8" />
        <TextInput
          placeholder="Search by name or ID..."
          placeholderTextColor="#94a3b8"
          value={searchVal}
          onChangeText={setSearch}
          className="flex-1 ml-2 text-sm text-slate-800 outline-none h-10"
        />
      </View>
      <View className="flex-col sm:flex-row gap-3">
        <View className="flex-row items-center gap-1 bg-slate-100 p-1 rounded-xl self-start flex-wrap">
          <Text className="text-[10px] sm:text-xs font-bold text-slate-500 ml-2 mr-1 uppercase tracking-widest">
            Grade:
          </Text>
          {["All", "11", "12"].map((g) => (
            <Pressable
              key={g}
              onPress={() => setGrade(g)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${gradeVal === g ? "bg-white shadow-sm border border-slate-200/50" : "hover:bg-slate-200 border border-transparent"}`}
            >
              <Text
                className={`text-xs sm:text-sm font-bold ${gradeVal === g ? "text-blue-600" : "text-slate-500"}`}
              >
                {g}
              </Text>
            </Pressable>
          ))}
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-1 items-center"
          className="flex-row bg-slate-100 p-1 rounded-xl self-start max-w-full"
        >
          <Text className="text-[10px] sm:text-xs font-bold text-slate-500 ml-2 mr-1 uppercase tracking-widest">
            Strand:
          </Text>
          {["All", "STEM", "ABM", "HUMSS", "TVL"].map((s) => (
            <Pressable
              key={s}
              onPress={() => setStrand(s)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${strandVal === s ? "bg-white shadow-sm border border-slate-200/50" : "hover:bg-slate-200 border border-transparent"}`}
            >
              <Text
                className={`text-xs sm:text-sm font-bold ${strandVal === s ? "text-blue-600" : "text-slate-500"}`}
              >
                {s}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );

  const renderUserItem = ({ item }: { item: any }, colorCode: string) => (
    <Pressable
      onPress={() => setDrawerUser(item)}
      className="bg-white border-b border-slate-100 px-4 sm:px-6 py-4 flex-row items-center justify-between"
    >
      <View className="flex-row items-center gap-3 sm:gap-4">
        <View
          className={`w-10 h-10 rounded-full items-center justify-center bg-${colorCode}-100 border border-${colorCode}-200/50`}
        >
          <Text className={`font-bold text-${colorCode}-700`}>
            {item.name.charAt(0)}
          </Text>
        </View>
        <View>
          <Text className="font-bold text-slate-800 text-sm sm:text-base">
            {item.name}
          </Text>
          <Text className="text-slate-500 text-[10px] sm:text-xs font-mono">
            {item.id}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center gap-3 sm:gap-4">
        <View className="items-end gap-1">
          <View
            className={`bg-${colorCode}-50 px-2 py-1 rounded border border-${colorCode}-100`}
          >
            <Text
              className={`text-${colorCode}-600 text-[10px] font-bold uppercase tracking-wider`}
            >
              {item.strand || item.dept}
            </Text>
          </View>
          {item.grade && (
            <Text className="text-slate-400 text-[10px] font-bold">
              Grade {item.grade}
            </Text>
          )}
        </View>
        <Pressable className="p-2 rounded-full">
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={20}
            color="#94a3b8"
          />
        </Pressable>
      </View>
    </Pressable>
  );

  return (
    <View className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden w-full min-h-[500px]">
      <SubTabBar
        tabs={[
          { id: "roster", label: "Pending Approvals" },
          { id: "students", label: "Student Directory" },
          { id: "teachers", label: "Teacher Directory" },
          { id: "admins", label: "Admin Directory" },
          { id: "alumni", label: "Alumni Archive" },
        ]}
        activeTab={subTab}
        setActiveTab={setSubTab}
        color="blue"
      />
      <View className="p-6 flex-1">
        {subTab === "roster" && (
          <Animated.View entering={FadeIn}>
            <View className="flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
              <View>
                <Text className="font-bold text-slate-800 text-lg">
                  Pending Approvals (The Gate)
                </Text>
                <Text className="text-xs text-slate-500 mt-1">
                  Review and securely provision verified credentials.
                </Text>
              </View>

              {/* Batch Actions */}
              {selectedPending.length > 0 && (
                <Animated.View
                  entering={FadeIn}
                  className="flex-row gap-2 bg-blue-50 p-1.5 rounded-xl border border-blue-200"
                >
                  <Pressable
                    onPress={() => {
                      setSelectedPending([]);
                      alert(`Approved ${selectedPending.length} accounts!`);
                    }}
                    className="bg-blue-600 px-4 py-2 rounded-lg active:bg-blue-700 shadow-sm"
                  >
                    <Text className="text-white font-bold text-xs">
                      Batch Approve ({selectedPending.length})
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setSelectedPending([])}
                    className="bg-white px-4 py-2 rounded-lg border border-slate-200 active:bg-slate-50"
                  >
                    <Text className="text-slate-600 font-bold text-xs">
                      Reject
                    </Text>
                  </Pressable>
                </Animated.View>
              )}
            </View>

            <View className="flex-row gap-2 mb-4">
              <Pressable
                onPress={() => setPendingFilter("all")}
                className={`px-4 py-2 rounded-full border transition-colors ${pendingFilter === "all" ? "bg-blue-600 border-blue-600" : "bg-white border-slate-200 hover:bg-slate-50"}`}
              >
                <Text
                  className={`text-xs font-bold ${pendingFilter === "all" ? "text-white" : "text-slate-600"}`}
                >
                  All
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setPendingFilter("teacher")}
                className={`px-4 py-2 rounded-full border transition-colors ${pendingFilter === "teacher" ? "bg-blue-600 border-blue-600" : "bg-white border-slate-200 hover:bg-slate-50"}`}
              >
                <Text
                  className={`text-xs font-bold ${pendingFilter === "teacher" ? "text-white" : "text-slate-600"}`}
                >
                  Teachers
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setPendingFilter("student")}
                className={`px-4 py-2 rounded-full border transition-colors ${pendingFilter === "student" ? "bg-blue-600 border-blue-600" : "bg-white border-slate-200 hover:bg-slate-50"}`}
              >
                <Text
                  className={`text-xs font-bold ${pendingFilter === "student" ? "text-white" : "text-slate-600"}`}
                >
                  Students
                </Text>
              </Pressable>
            </View>

            <View className="mb-8 pb-2 gap-4">
              {filteredPending.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => togglePendingSelection(item.id)}
                  className={`bg-white border-2 w-full p-4 sm:p-5 rounded-2xl shadow-sm flex-col sm:flex-row sm:items-center gap-4 transition-colors ${selectedPending.includes(item.id) ? "border-blue-500 bg-blue-50/30" : "border-slate-200 hover:border-blue-300"}`}
                >
                  <View className="flex-row items-center justify-between sm:hidden mb-2">
                    <View
                      className={`bg-${item.color}-100 px-2 py-1 rounded border border-${item.color}-200`}
                    >
                      <Text
                        className={`text-${item.color}-700 font-bold text-[10px] uppercase tracking-wider`}
                      >
                        {item.type} Auth
                      </Text>
                    </View>
                    <Text className="text-slate-400 text-xs">{item.time}</Text>
                  </View>

                  <View
                    className={`w-6 h-6 rounded border items-center justify-center ${selectedPending.includes(item.id) ? "bg-blue-500 border-blue-500" : "border-slate-300 bg-slate-50"}`}
                  >
                    {selectedPending.includes(item.id) && (
                      <MaterialCommunityIcons
                        name="check"
                        size={16}
                        color="white"
                      />
                    )}
                  </View>

                  <View className="flex-1 pr-4">
                    <Text className="font-bold text-slate-800 text-lg">
                      {item.name}
                    </Text>
                    <Text className="text-slate-500 text-xs mt-1">
                      {item.type === "Teacher" ? "DepEd No: " : "LRN: "}
                      {item.idNum}
                    </Text>
                  </View>

                  <View className="flex-row items-center gap-2 sm:gap-3 mt-4 sm:mt-0">
                    <View className="hidden sm:flex mr-2">
                      <View
                        className={`bg-${item.color}-100 px-3 py-1.5 rounded-lg border border-${item.color}-200`}
                      >
                        <Text
                          className={`text-${item.color}-700 font-bold text-[10px] uppercase tracking-widest`}
                        >
                          {item.type} Auth
                        </Text>
                      </View>
                    </View>

                    {item.type === "Teacher" && (
                      <Pressable className="bg-white border border-slate-200 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg flex-row justify-center items-center gap-2 hover:bg-slate-50 shadow-sm">
                        <MaterialCommunityIcons
                          name="file-pdf-box"
                          size={16}
                          color="#ef4444"
                        />
                        <Text className="text-slate-600 font-bold text-xs hidden sm:flex">
                          ID
                        </Text>
                      </Pressable>
                    )}
                    <Pressable
                      onPress={(e) => {
                        e.stopPropagation();
                        alert("Rejected!");
                      }}
                      className="bg-rose-50 border border-rose-200 rounded-lg px-4 sm:px-6 py-2.5 sm:py-3 items-center justify-center active:bg-rose-100 shadow-sm"
                    >
                      <Text className="text-rose-700 font-bold text-xs uppercase tracking-widest">
                        Reject
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={(e) => {
                        e.stopPropagation();
                        alert("Approved!");
                      }}
                      className="bg-emerald-500 rounded-lg px-4 sm:px-6 py-2.5 sm:py-3 items-center justify-center active:bg-emerald-600 shadow-sm"
                    >
                      <Text className="text-white font-bold text-xs uppercase tracking-widest">
                        Approve
                      </Text>
                    </Pressable>
                  </View>
                </Pressable>
              ))}
            </View>
          </Animated.View>
        )}
        {subTab === "students" && (
          <Animated.View entering={FadeIn}>
            <View className="flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
              <Text className="text-slate-500 text-sm flex-1">
                Student Directory. Fluidly rendering large lists via cached DOM
                virtualization.
              </Text>
            </View>
            {renderFilterBar(
              studentSearch,
              setStudentSearch,
              studentGrade,
              setStudentGrade,
              studentStrand,
              setStudentStrand,
            )}
            <View className="bg-slate-50 border border-slate-200 rounded-2xl h-[400px] overflow-hidden shadow-inner">
              <ScrollView nestedScrollEnabled={true}>
                {filteredStudents.length === 0 ? (
                  <Text className="text-slate-400 p-6 text-center">
                    No students found.
                  </Text>
                ) : (
                  filteredStudents.map(item => <React.Fragment key={item.id}>{renderUserItem({ item }, "orange")}</React.Fragment>)
                )}
              </ScrollView>
            </View>
          </Animated.View>
        )}
        {subTab === "teachers" && (
          <Animated.View entering={FadeIn}>
            <View className="flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
              <Text className="text-slate-500 text-sm flex-1">
                Teacher Directory. View faculty assignment mapping.
              </Text>
            </View>
            {renderFilterBar(
              teacherSearch,
              setTeacherSearch,
              teacherGrade,
              setTeacherGrade,
              teacherStrand,
              setTeacherStrand,
            )}
            <View className="bg-slate-50 border border-slate-200 rounded-2xl h-[400px] overflow-hidden shadow-inner">
              <ScrollView nestedScrollEnabled={true}>
                {filteredTeachers.length === 0 ? (
                  <Text className="text-slate-400 p-6 text-center">
                    No teachers found.
                  </Text>
                ) : (
                  filteredTeachers.map(item => <React.Fragment key={item.id}>{renderUserItem({ item }, "teal")}</React.Fragment>)
                )}
              </ScrollView>
            </View>
          </Animated.View>
        )}
        {subTab === "admins" && (
          <Animated.View entering={FadeIn}>
            <View className="flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
              <Text className="text-slate-500 text-sm flex-1">
                Admin Directory. Manage domain administrators and their
                privileges.
              </Text>
            </View>
            <View className="flex-row items-center bg-white rounded-2xl px-4 py-2 border border-slate-200 focus-within:border-blue-400 focus-within:shadow-sm transition-all w-full mb-4 z-20">
              <MaterialCommunityIcons
                name="magnify"
                size={20}
                color="#94a3b8"
              />
              <TextInput
                placeholder="Search by name or ID..."
                placeholderTextColor="#94a3b8"
                value={adminSearch}
                onChangeText={setAdminSearch}
                className="flex-1 ml-2 text-sm text-slate-800 outline-none h-10"
              />
            </View>
            <View className="bg-slate-50 border border-slate-200 rounded-2xl h-[400px] overflow-hidden shadow-inner">
              <ScrollView nestedScrollEnabled={true}>
                {filteredAdmins.length === 0 ? (
                  <Text className="text-slate-400 p-6 text-center">
                    No admins found.
                  </Text>
                ) : (
                  filteredAdmins.map(item => <React.Fragment key={item.id}>{renderUserItem({ item }, "purple")}</React.Fragment>)
                )}
              </ScrollView>
            </View>
          </Animated.View>
        )}

        {/* Reusable Profile Modal */}
        <GlobalModal
          isOpen={!!drawerUser}
          onClose={() => setDrawerUser(null)}
          title="Profile Overview"
        >
          <ScrollView
            className="max-h-[70vh] -mx-6 px-6 pt-2 pb-6"
            showsVerticalScrollIndicator={false}
          >
            <View className="items-center mb-6">
              <View
                className={`w-24 h-24 rounded-full border-4 border-white shadow-lg items-center justify-center mb-3 ${drawerUser?.type === "Student" ? "bg-blue-100" : drawerUser?.type === "Teacher" ? "bg-teal-100" : "bg-purple-100"}`}
              >
                <MaterialCommunityIcons
                  name={
                    drawerUser?.type === "Student"
                      ? "school"
                      : drawerUser?.type === "Teacher"
                        ? "book-open-outline"
                        : "shield-account"
                  }
                  size={40}
                  color={
                    drawerUser?.type === "Student"
                      ? "#2563eb"
                      : drawerUser?.type === "Teacher"
                        ? "#0f766e"
                        : "#7e22ce"
                  }
                />
              </View>
              <Text className="text-2xl font-black text-slate-800">
                {drawerUser?.name}
              </Text>
              <Text
                className={`font-bold uppercase tracking-widest text-xs mt-1 ${drawerUser?.type === "Student" ? "text-blue-600" : drawerUser?.type === "Teacher" ? "text-teal-600" : "text-purple-600"}`}
              >
                {drawerUser?.type === "Student"
                  ? `Grade 11 ${drawerUser?.strand}`
                  : drawerUser?.dept}
              </Text>
            </View>

            <View className="bg-slate-50 border border-slate-200 p-4 rounded-xl mb-4 shadow-sm flex-row items-center justify-between">
              <Text className="text-slate-500 font-medium text-sm">
                Account Status
              </Text>
              <View className="bg-emerald-100 px-3 py-1 rounded-full">
                <Text className="text-emerald-700 font-bold text-xs">
                  Verified & Active
                </Text>
              </View>
            </View>

            <View className="bg-white border border-slate-200 p-4 rounded-xl mb-4 shadow-sm gap-2">
              <Text className="font-bold text-slate-700 border-b border-slate-100 pb-2 mb-1">
                {drawerUser?.type === "Student"
                  ? "Academic Stats"
                  : "System Metrics"}
              </Text>
              <Text className="text-slate-600 text-sm">
                {drawerUser?.type === "Student"
                  ? "Attendance:"
                  : "Logins this week:"}{" "}
                <Text className="font-bold text-emerald-600">98%</Text>
              </Text>
              <Text className="text-slate-600 text-sm">
                {drawerUser?.type === "Student"
                  ? "SBTs Earned:"
                  : "Tokens Minted:"}{" "}
                <Text className="font-bold text-amber-500">12 Badges</Text>
              </Text>
              <Text className="text-slate-600 text-sm">
                AI Rate Limit:{" "}
                <Text className="font-bold text-slate-800">50/day</Text>
              </Text>
            </View>
            <View className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm gap-2">
              <Text className="font-bold text-slate-700 border-b border-slate-100 pb-2 mb-2">
                Admin Actions
              </Text>
              <Pressable className="bg-slate-50 py-3 rounded-xl items-center border border-slate-200 active:bg-slate-100 mb-2 hover:bg-slate-100 transition-colors">
                <Text className="text-slate-700 font-bold text-sm">
                  Edit User Details
                </Text>
              </Pressable>
              <View className="flex-row gap-2">
                <Pressable className="flex-1 bg-amber-50 py-3 rounded-xl items-center border border-amber-200 active:bg-amber-100 hover:bg-amber-100 transition-colors">
                  <Text className="text-amber-700 font-bold text-sm">
                    Suspend
                  </Text>
                </Pressable>
                <Pressable className="flex-1 bg-red-50 py-3 rounded-xl items-center border border-red-200 active:bg-red-100 hover:bg-red-100 transition-colors">
                  <Text className="text-red-700 font-bold text-sm">
                    Reset Pwd
                  </Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </GlobalModal>
        {subTab === "alumni" && (
          <Animated.View
            entering={FadeIn}
              className="flex-1 items-center justify-center py-10 w-full min-h-[400px]"
          >
            {!isUnlocked ? (
                <View className="bg-slate-900 border border-slate-800 p-8 rounded-3xl items-center justify-center w-full max-w-md shadow-2xl mx-auto">
                <View className="w-16 h-16 bg-slate-200 rounded-full items-center justify-center mb-4">
                  <MaterialCommunityIcons
                    name="fingerprint"
                    size={32}
                    color="#0f172a"
                  />
                </View>
                <Text className="text-xl font-black text-white mb-2 text-center">
                  Step-Up Authentication Required
                </Text>
                <Text className="text-slate-400 text-center mb-6 text-sm leading-relaxed">
                  The Alumni Vault is restricted under RA 10173. Enter your
                  master password to decrypt historical records.
                </Text>
                <TextInput
                  secureTextEntry
                  placeholder="Master Password"
                  placeholderTextColor="#64748b"
                    className="w-full bg-slate-800 border border-slate-700 text-white text-center rounded-xl px-4 py-4 mb-4 focus:border-blue-500 outline-none"
                />
                <Pressable
                  onPress={() => setIsUnlocked(true)}
                  className="w-full bg-blue-600 py-4 rounded-xl items-center active:bg-blue-700 shadow-lg shadow-blue-500/20"
                >
                  <Text className="text-white font-bold text-base">
                    Decrypt & Unlock
                  </Text>
                </Pressable>
              </View>
            ) : (
              <View className="w-full bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <View className="flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 mb-4 gap-4">
                  <View>
                    <Text className="text-2xl font-black text-slate-800">
                      Alumni Vault
                    </Text>
                    <Text className="text-slate-500 text-sm mt-1">
                      Read-only cryptographic records ensuring RA 10173
                      compliance.
                    </Text>
                  </View>
                  <View className="flex-row gap-2 bg-slate-100 p-1 rounded-xl">
                    <Pressable
                      onPress={() => setAlumniYear("2023")}
                      className={`px-4 py-2 rounded-lg transition-colors ${alumniYear === "2023" ? "bg-white shadow-sm" : "bg-transparent"}`}
                    >
                      <Text
                        className={`font-bold text-sm ${alumniYear === "2023" ? "text-blue-600" : "text-slate-500"}`}
                      >
                        Class of 2023
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => setAlumniYear("2022")}
                      className={`px-4 py-2 rounded-lg transition-colors ${alumniYear === "2022" ? "bg-white shadow-sm" : "bg-transparent"}`}
                    >
                      <Text
                        className={`font-bold text-sm ${alumniYear === "2022" ? "text-blue-600" : "text-slate-500"}`}
                      >
                        Class of 2022
                      </Text>
                    </Pressable>
                  </View>
                </View>
                <TextInput
                  placeholder="Search alumni by name or LRN..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mb-4 outline-none focus:border-blue-500 transition-colors"
                  value={alumniQuery}
                  onChangeText={setAlumniQuery}
                />
                <ScrollView className="h-[300px]" nestedScrollEnabled={true}>
                  {MOCK_ALUMNI.map((item) => (
                    <View key={item.id} className="flex-col sm:flex-row sm:items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100 mb-3 gap-3 hover:border-blue-200 transition-colors">
                      <View>
                        <Text className="font-bold text-slate-800 text-base">
                          {item.name}
                        </Text>
                        <Text className="text-slate-500 text-xs font-mono mt-1">
                          {item.id}
                        </Text>
                      </View>
                      <Pressable
                        onPress={() => alert(`Hash Copied: ${item.hash}`)}
                        className="flex-row items-center gap-2 bg-white px-3 py-2 rounded-lg border border-slate-200 active:bg-slate-100"
                      >
                        <MaterialCommunityIcons
                          name="shield-check"
                          size={16}
                          color="#10b981"
                        />
                        <Text className="text-slate-600 font-mono text-xs">
                          {item.hash}
                        </Text>
                      </Pressable>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}
          </Animated.View>
        )}
      </View>
    </View>
  );
};