import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { GlobalModal } from "@/components/shared/AdminUI";

const DropdownField = ({
  label,
  placeholder,
  value,
  options,
  onSelect,
}: any) => {
  const [open, setOpen] = useState(false);
  return (
    <View className="relative w-full z-10">
      <Text className="font-bold text-slate-700 mb-2 text-sm">{label}</Text>
      <Pressable
        onPress={() => setOpen(!open)}
        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 flex-row justify-between items-center transition-colors"
      >
        <Text
          className={
            value ? "text-slate-800 text-base" : "text-slate-400 text-base"
          }
        >
          {value || placeholder}
        </Text>
        <MaterialCommunityIcons
          name={open ? "chevron-up" : "chevron-down"}
          size={20}
          color="#64748b"
        />
      </Pressable>
      {open && (
        <View className="w-full bg-white border border-slate-200 rounded-xl shadow-sm mt-2 overflow-hidden max-h-48">
          <ScrollView nestedScrollEnabled>
            {options.map((opt: string) => (
              <Pressable
                key={opt}
                onPress={() => {
                  onSelect(opt);
                  setOpen(false);
                }}
                className="px-4 py-3 border-b border-slate-100 hover:bg-slate-50 active:bg-slate-100"
              >
                <Text className="text-slate-700 font-medium">{opt}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export const AdminUsersSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newPassword, setNewPassword] = useState("");
  const [currentView, setCurrentView] = useState<"list" | "create">("list");

  // Create Account State
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [newRole, setNewRole] = useState("Student");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("");
  const [selectedElective, setSelectedElective] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const MOCK_USERS = [
    {
      id: "1",
      name: "Juan Dela Cruz",
      email: "juan@deped.gov.ph",
      lastActive: "2 hours ago",
      role: "teacher",
      status: "active",
    },
    {
      id: "2",
      name: "Maria Clara",
      email: "student@gmail.com",
      lastActive: "1 day ago",
      role: "student",
      status: "active",
    },
    {
      id: "3",
      name: "Admin User",
      email: "admin@deped.gov.ph",
      lastActive: "Just now",
      role: "admin",
      status: "active",
    },
    {
      id: "4",
      name: "Jose Rizal",
      email: "jose@deped.gov.ph",
      lastActive: "5 hours ago",
      role: "teacher",
      status: "active",
    },
    {
      id: "5",
      name: "Andres Bonifacio",
      email: "andres@gmail.com",
      lastActive: "2 days ago",
      role: "student",
      status: "inactive",
    },
    {
      id: "6",
      name: "Emilio Aguinaldo",
      email: "emilio@gmail.com",
      lastActive: "3 hours ago",
      role: "student",
      status: "active",
    },
  ];

  const filteredUsers = useMemo(() => {
    return MOCK_USERS.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [searchQuery, roleFilter]);

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "teacher":
        return "bg-teal-100 text-teal-800 border-teal-200";
      case "student":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const handleCreateAccount = () => {
    alert("Account created successfully!");
    setCurrentView("list");
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setSuffix("");
    setNewEmail("");
    setCreatePassword("");
    setNewRole("Student");
    setSelectedGrade("");
    setSelectedTrack("");
    setSelectedElective("");
    setSelectedSection("");
  };

  return (
    <Animated.View entering={FadeIn} className="flex-1 w-full flex-col pb-10">
      {currentView === "list" ? (
        <Animated.View entering={FadeIn} className="flex-1 flex-col h-full">
          {/* Header */}
          <View className="flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <View className="flex-row items-center gap-4">
              <View className="w-10 h-10 bg-indigo-50 rounded-xl items-center justify-center border border-indigo-100 shadow-sm">
                <MaterialCommunityIcons
                  name="account-group"
                  size={20}
                  color="#4f46e5"
                />
              </View>
              <View>
                <Text className="text-2xl font-black text-slate-900 tracking-tight">
                  Users
                </Text>
                <Text className="text-slate-500 text-sm font-medium mt-1">
                  Manage Admin, Teacher, and Student accounts.
                </Text>
              </View>
            </View>
            <Pressable
              onPress={() => setCurrentView("create")}
              className="bg-indigo-600 px-4 py-2.5 rounded-lg flex-row items-center gap-2 shadow-sm active:bg-indigo-700 transition-colors"
            >
              <MaterialCommunityIcons
                name="account-plus"
                size={18}
                color="white"
              />
              <Text className="text-white font-bold text-sm">
                Create Account
              </Text>
            </Pressable>
          </View>

          {/* Search and Filters */}
          <View className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-sm mb-4 gap-3">
            <View className="flex-row items-center bg-slate-50 border border-slate-300 rounded-xl px-4 h-12 focus-within:border-indigo-500 transition-colors">
              <MaterialCommunityIcons
                name="magnify"
                size={22}
                color="#64748b"
              />
              <TextInput
                placeholder="Search by name or email..."
                placeholderTextColor="#94a3b8"
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="flex-1 ml-3 text-slate-800 text-base outline-none h-full"
              />
            </View>

            <View className="flex-row flex-wrap gap-2">
              {[
                { id: "all", label: "All Users" },
                { id: "admin", label: "Admins" },
                { id: "teacher", label: "Teachers" },
                { id: "student", label: "Students" },
              ].map((filter) => (
                <Pressable
                  key={filter.id}
                  onPress={() => setRoleFilter(filter.id)}
                  className={`px-3 py-1.5 rounded-md border transition-colors ${roleFilter === filter.id ? "bg-indigo-600 border-indigo-600 shadow-sm" : "bg-white border-slate-200 hover:bg-slate-50"}`}
                >
                  <Text
                    className={`font-bold text-sm ${roleFilter === filter.id ? "text-white" : "text-slate-600"}`}
                  >
                    {filter.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* User List */}
          <View className="flex-1">
            <Text className="text-slate-500 font-bold text-sm mb-4 uppercase tracking-widest px-2">
              Showing {filteredUsers.length} users
            </Text>

            <View className="max-h-[500px] bg-slate-50/50 rounded-xl border border-slate-200 p-2 sm:p-3 shadow-inner">
              <ScrollView
                className="flex-1"
                contentContainerClassName="gap-3 pb-4"
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={true}
              >
                {filteredUsers.map((user, idx) => (
                  <Animated.View
                    key={user.id}
                    entering={FadeInDown.delay(idx * 50)}
                  >
                    <Pressable
                      onPress={() => {
                        setSelectedUser(user);
                        setNewPassword("");
                      }}
                      className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-sm flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-indigo-300 active:bg-slate-50 transition-colors"
                    >
                      <View className="flex-row items-center gap-4">
                        <View className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 items-center justify-center">
                          <Text className="text-slate-600 font-bold text-base">
                            {user.name.charAt(0)}
                          </Text>
                        </View>
                        <View>
                          <Text className="font-bold text-slate-900 text-sm sm:text-base">
                            {user.name}
                          </Text>
                          <Text className="text-slate-500 text-sm">
                            {user.email}
                          </Text>
                          <Text className="text-slate-400 text-xs mt-1 font-medium">
                            Last active: {user.lastActive}
                          </Text>
                        </View>
                      </View>

                      <View className="flex-row items-center gap-3 self-start sm:self-auto">
                        <View
                          className={`px-3 py-1.5 rounded-lg border ${getRoleColor(user.role)}`}
                        >
                          <Text className="font-bold text-xs capitalize tracking-wide">
                            {user.role}
                          </Text>
                        </View>
                        <View className="px-3 py-1.5 rounded-lg border bg-emerald-50 border-emerald-200">
                          <Text className="text-emerald-700 font-bold text-xs capitalize tracking-wide">
                            {user.status}
                          </Text>
                        </View>
                        <Pressable className="p-2 rounded-full hover:bg-slate-100 active:bg-slate-200 transition-colors">
                          <MaterialCommunityIcons
                            name="dots-vertical"
                            size={20}
                            color="#64748b"
                          />
                        </Pressable>
                      </View>
                    </Pressable>
                  </Animated.View>
                ))}

                {filteredUsers.length === 0 && (
                  <View className="py-16 items-center justify-center bg-white rounded-2xl border border-slate-200 border-dashed">
                    <MaterialCommunityIcons
                      name="account-search-outline"
                      size={40}
                      color="#cbd5e1"
                    />
                    <Text className="text-slate-500 font-medium mt-4 text-sm">
                      No users found matching your criteria.
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>
          </View>

          <GlobalModal
            isOpen={!!selectedUser}
            onClose={() => setSelectedUser(null)}
            title="User Details & Settings"
          >
            {selectedUser && (
              <View className="p-1 pb-4">
                <View className="flex-row items-center gap-4 mb-4">
                  <View className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 items-center justify-center">
                    <Text className="text-slate-600 font-bold text-xl">
                      {selectedUser.name.charAt(0)}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-lg font-black text-slate-900">
                      {selectedUser.name}
                    </Text>
                    <Text className="text-slate-500 text-sm mb-1">
                      {selectedUser.email}
                    </Text>
                    <View
                      className={`self-start px-3 py-1 rounded-lg border ${getRoleColor(selectedUser.role)}`}
                    >
                      <Text className="font-bold text-xs capitalize tracking-wide">
                        {selectedUser.role}
                      </Text>
                    </View>
                  </View>
                </View>

                <Text className="text-xs font-black text-slate-500 mb-3 uppercase tracking-widest">
                  Account Information
                </Text>
                <View className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6 gap-3 shadow-sm">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-slate-500 text-sm font-medium">
                      User ID
                    </Text>
                    <Text className="font-bold text-slate-800">
                      {selectedUser.id.padStart(6, "0")}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-slate-500 text-sm font-medium">
                      Full Name
                    </Text>
                    <Text className="font-bold text-slate-800">
                      {selectedUser.name}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-slate-500 text-sm font-medium">
                      Email Address
                    </Text>
                    <Text className="font-bold text-slate-800">
                      {selectedUser.email}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-slate-500 text-sm font-medium">
                      Account Status
                    </Text>
                    <Text
                      className={`font-bold capitalize ${selectedUser.status === "active" ? "text-emerald-600" : "text-slate-500"}`}
                    >
                      {selectedUser.status}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-slate-500 text-sm font-medium">
                      Last Active
                    </Text>
                    <Text className="font-bold text-slate-800">
                      {selectedUser.lastActive}
                    </Text>
                  </View>
                </View>

                <View className="h-px bg-slate-200 w-full mb-4" />

                <Text className="text-xs font-black text-slate-500 mb-2 uppercase tracking-widest">
                  Login Credentials
                </Text>
                <Text className="text-slate-500 text-sm mb-4">
                  Edit the user&apos;s password if they have lost access to
                  their account.
                </Text>

                <View className="gap-4">
                  <View>
                    <Text className="font-bold text-slate-700 mb-2 text-sm">
                      New Password
                    </Text>
                    <TextInput
                      placeholder="Enter new password..."
                      secureTextEntry
                      value={newPassword}
                      onChangeText={setNewPassword}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-500 transition-colors"
                    />
                  </View>
                  <Pressable
                    onPress={() => {
                      alert(
                        `Password updated successfully for ${selectedUser.email}`,
                      );
                      setSelectedUser(null);
                    }}
                    className={`w-full py-3 rounded-lg items-center transition-transform active:scale-[0.98] ${newPassword.length > 0 ? "bg-indigo-600 hover:bg-indigo-700" : "bg-slate-300"}`}
                    disabled={newPassword.length === 0}
                  >
                    <Text className="text-white font-bold text-sm">
                      Save New Password
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
          </GlobalModal>
        </Animated.View>
      ) : (
        <Animated.View entering={FadeIn} className="flex-1 flex-col h-full">
          <View className="flex-row items-center gap-3 mb-4">
            <Pressable
              onPress={() => setCurrentView("list")}
              className="w-8 h-8 bg-slate-100 rounded-full items-center justify-center hover:bg-slate-200 active:bg-slate-300 transition-colors"
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={20}
                color="#475569"
              />
            </Pressable>
            <Text className="text-2xl font-black text-slate-900 tracking-tight">
              Create New Account
            </Text>
          </View>

          <ScrollView
            className="flex-1 w-full"
            showsVerticalScrollIndicator={false}
          >
            <View className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm w-full max-w-3xl mx-auto mb-12">
              <View className="gap-4 mb-6">
                <View className="flex-col sm:flex-row gap-4">
                  <View className="flex-1">
                    <Text className="font-bold text-slate-700 mb-2 text-sm">
                      First Name
                    </Text>
                    <TextInput
                      placeholder="e.g. Maria"
                      value={firstName}
                      onChangeText={setFirstName}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-500 transition-colors"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-slate-700 mb-2 text-sm">
                      Middle Name
                    </Text>
                    <TextInput
                      placeholder="e.g. Santos"
                      value={middleName}
                      onChangeText={setMiddleName}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-500 transition-colors"
                    />
                  </View>
                </View>

                <View className="flex-col sm:flex-row gap-4">
                  <View className="flex-[3]">
                    <Text className="font-bold text-slate-700 mb-2 text-sm">
                      Last Name
                    </Text>
                    <TextInput
                      placeholder="e.g. Clara"
                      value={lastName}
                      onChangeText={setLastName}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-500 transition-colors"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-slate-700 mb-2 text-sm">
                      Suffix (Optional)
                    </Text>
                    <TextInput
                      placeholder="e.g. Jr., III"
                      value={suffix}
                      onChangeText={setSuffix}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-500 transition-colors"
                    />
                  </View>
                </View>

                <View className="flex-col sm:flex-row gap-4">
                  <View className="flex-1">
                    <Text className="font-bold text-slate-700 mb-2 text-sm">
                      Email Address
                    </Text>
                    <TextInput
                      placeholder="e.g. maria@deped.gov.ph"
                      keyboardType="email-address"
                      value={newEmail}
                      onChangeText={setNewEmail}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-500 transition-colors"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-slate-700 mb-2 text-sm">
                      Password
                    </Text>
                    <TextInput
                      placeholder="Enter secure password"
                      secureTextEntry
                      value={createPassword}
                      onChangeText={setCreatePassword}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-500 transition-colors"
                    />
                  </View>
                </View>

                <View>
                  <Text className="font-bold text-slate-700 mb-2 text-sm">
                    Assign Role
                  </Text>
                  <View className="flex-row gap-3 flex-wrap">
                    {["Admin", "Teacher", "Student"].map((role) => (
                      <Pressable
                        key={role}
                        onPress={() => setNewRole(role)}
                        className={`px-5 py-3.5 rounded-xl border transition-colors ${newRole === role ? "bg-indigo-600 border-indigo-600 shadow-sm" : "bg-slate-50 border-slate-300 hover:bg-slate-100"}`}
                      >
                        <Text
                          className={`font-bold text-sm ${newRole === role ? "text-white" : "text-slate-600"}`}
                        >
                          {role}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>

                {/* Conditional Fields based on Role */}

                {newRole === "Student" && (
                  <View className="flex-col gap-4">
                    <DropdownField
                      label="Grade Level"
                      placeholder="Select Grade Level"
                      value={selectedGrade}
                      options={["Grade 11", "Grade 12"]}
                      onSelect={setSelectedGrade}
                    />
                    <DropdownField
                      label="Track"
                      placeholder="Select Track"
                      value={selectedTrack}
                      options={["Academic Track", "Tech-Pro Track"]}
                      onSelect={(val: string) => {
                        setSelectedTrack(val);
                        setSelectedElective("");
                      }}
                    />
                    {selectedTrack === "Academic Track" && (
                      <DropdownField
                        label="Elective"
                        placeholder="Select Elective"
                        value={selectedElective}
                        options={[
                          "Arts, Social Sciences, and Humanities",
                          "Business and Entrepreneurship",
                          "Science, Technology, Engineering, and Mathematics",
                          "Sports, Health, and Wellness",
                          "Field Experience",
                        ]}
                        onSelect={setSelectedElective}
                      />
                    )}
                    {selectedTrack === "Tech-Pro Track" && (
                      <DropdownField
                        label="Elective"
                        placeholder="Select Elective"
                        value={selectedElective}
                        options={[
                          "Aesthetic, Wellness, and Human Care",
                          "Agri-Fishery Business and Food Innovation",
                          "Artisanry and Creative Enterprise",
                          "Automotive and Small Engine Technologies",
                          "Construction and Building Technologies",
                          "Creative Arts and Design Technologies",
                          "Hospitality and Tourism",
                          "ICT Support and Computer Programming Technologies",
                          "Industrial Technologies",
                          "Maritime",
                        ]}
                        onSelect={setSelectedElective}
                      />
                    )}
                    <DropdownField
                      label="Section"
                      placeholder="Select Section"
                      value={selectedSection}
                      options={[
                        "Section A",
                        "Section B",
                        "Section C",
                        "Section D",
                      ]}
                      onSelect={setSelectedSection}
                    />
                  </View>
                )}
              </View>

              <View className="flex-row gap-3 pt-4 border-t border-slate-100">
                <Pressable
                  onPress={() => setCurrentView("list")}
                  className="flex-1 bg-slate-100 py-3 rounded-lg items-center border border-slate-200 active:bg-slate-200 transition-colors"
                >
                  <Text className="text-slate-700 font-bold text-sm">
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  onPress={handleCreateAccount}
                  className="flex-[2] py-3 rounded-lg items-center shadow-md active:scale-[0.98] transition-transform bg-indigo-600 hover:bg-indigo-700"
                >
                  <Text className="text-white font-bold text-sm">
                    Create Account
                  </Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </Animated.View>
      )}
    </Animated.View>
  );
};
