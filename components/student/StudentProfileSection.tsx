import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Switch,
  ActivityIndicator,
} from "react-native";
import Animated, { FadeIn, FadeInDown, Layout } from "react-native-reanimated";
import { useAuth } from "@/AuthContext";
import { useNavigation } from "@react-navigation/native";
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
    <View className="relative w-full z-10 mb-2">
      <Text className="font-bold text-slate-700 mb-2 text-sm">{label}</Text>
      <Pressable
        onPress={() => setOpen(!open)}
        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 flex-row justify-between items-center transition-colors"
      >
        <Text
          className={
            value ? "text-slate-800 text-sm" : "text-slate-400 text-sm"
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
        <View className="w-full bg-white border border-slate-200 rounded-xl shadow-sm mt-1 overflow-hidden max-h-48 z-20 absolute top-[100%] left-0">
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
                <Text className="text-slate-700 font-medium text-sm">
                  {opt}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const AVATAR_OPTIONS = [
  {
    icon: "🎓",
    label: "Scholar",
    color: "bg-sky-100 text-sky-700 border-sky-200",
  },
  {
    icon: "💻",
    label: "Developer",
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  {
    icon: "🎨",
    label: "Artist",
    color: "bg-purple-100 text-purple-700 border-purple-200",
  },
  {
    icon: "🚀",
    label: "Explorer",
    color: "bg-rose-100 text-rose-700 border-rose-200",
  },
  {
    icon: "🧬",
    label: "Biologist",
    color: "bg-amber-100 text-amber-700 border-amber-200",
  },
  {
    icon: "📚",
    label: "Reader",
    color: "bg-indigo-100 text-indigo-700 border-indigo-200",
  },
];

export const StudentProfileSection = ({ goBack }: any) => {
  const { logout } = useAuth();
  const navigation = useNavigation<any>();

  // Profile Edit State
  const [firstName, setFirstName] = useState("Juan");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("Dela Cruz");
  const [suffix, setSuffix] = useState("");
  const [email, setEmail] = useState("juan.delacruz@school.edu.ph");
  const [lrn] = useState("102930456789");
  const [selectedGrade, setSelectedGrade] = useState("Grade 12");
  const [selectedTrack, setSelectedTrack] = useState("Academic Track");
  const [selectedElective, setSelectedElective] = useState(
    "Science, Technology, Engineering, and Mathematics",
  );
  const [selectedSection, setSelectedSection] = useState("Section A");
  const [isSaving, setIsSaving] = useState(false);

  // Custom Avatar State
  const [selectedAvatar, setSelectedAvatar] = useState("🎓");
  const [avatarBgColor, setAvatarBgColor] = useState("bg-sky-100");
  const [avatarTextColor, setAvatarTextColor] = useState("text-sky-700");
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  // Security Modal State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Toast Feedback State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveChanges = () => {
    if (!firstName.trim() || !lastName.trim()) {
      showToast("First and Last Name cannot be empty.");
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast("Changes saved successfully!");
    }, 1200);
  };

  const handleUpdatePassword = () => {
    setPasswordError("");
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setIsUpdatingPassword(true);
    setTimeout(() => {
      setIsUpdatingPassword(false);
      setShowPasswordModal(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      showToast("Password updated successfully!");
    }, 1500);
  };

  const handleLogout = () => {
    logout();
    navigation.replace("index");
  };

  return (
    <View
      className="flex-1 w-full bg-slate-50/50 z-30"
      style={
        Platform.OS === "web"
          ? ({
              position: "fixed",
              top: 64,
              left: 0,
              right: 0,
              bottom: 0,
            } as any)
          : {}
      }
    >
      {/* Visual Toast Alert */}
      {toastMessage && (
        <Animated.View
          entering={FadeInDown}
          className="absolute top-6 left-6 right-6 md:left-auto md:w-96 bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-2xl z-50 flex-row items-center gap-3"
        >
          <MaterialCommunityIcons
            name="information"
            size={20}
            color="#60a5fa"
          />
          <Text className="text-white text-sm font-semibold flex-1">
            {toastMessage}
          </Text>
        </Animated.View>
      )}

      <ScrollView
        className="flex-1 w-full"
        contentContainerClassName="p-4 sm:p-8 pb-16 flex-grow"
      >
        <Animated.View className="flex-1 max-w-4xl mx-auto w-full">
          {/* Header */}
          <View className="flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm z-10">
            <View className="flex-row items-center gap-4 flex-1">
              <Pressable
                onPress={goBack}
                className="w-8 h-8 bg-slate-100 rounded-full items-center justify-center hover:bg-slate-200 active:bg-slate-300 transition-colors"
              >
                <MaterialCommunityIcons
                  name="arrow-left"
                  size={20}
                  color="#475569"
                />
              </Pressable>
              <View className="flex-1">
                <Text className="text-2xl font-black text-slate-900 tracking-tight">
                  My Profile
                </Text>
                <Text className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed font-medium">
                  Manage your personal details, security settings, and
                  preferences.
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-col lg:flex-row gap-6">
            {/* Left Col: Overview */}
            <Animated.View className="w-full lg:w-1/3 flex-col gap-4">
              <View className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm items-center">
                <View
                  className={`w-24 h-24 ${avatarBgColor} rounded-full items-center justify-center border-4 border-white shadow-sm mb-4 relative`}
                >
                  <Text className="text-5xl">{selectedAvatar}</Text>
                  <Pressable
                    onPress={() => setShowAvatarPicker(true)}
                    className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full items-center justify-center shadow-md border border-slate-100 hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <MaterialCommunityIcons
                      name="pencil"
                      size={16}
                      color="#64748b"
                    />
                  </Pressable>
                </View>
                <Text className="text-xl font-black text-slate-900 mb-1 text-center">
                  {firstName} {lastName}
                </Text>
                <Text className="text-slate-500 font-medium text-sm mb-4 text-center">
                  juan.delacruz@school.edu.ph
                </Text>

                <View className="bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-200">
                  <Text className="text-sky-800 text-[10px] font-black uppercase tracking-widest">
                    Grade 12 Student
                  </Text>
                </View>
              </View>

              <View className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm gap-3">
                <Text className="text-base font-black text-slate-800 mb-1">
                  Account Activity
                </Text>
                <View className="flex-row items-center justify-between py-2 border-b border-slate-100">
                  <Text className="text-slate-500 font-medium text-sm">
                    Last Login
                  </Text>
                  <Text className="text-slate-800 font-bold text-sm">
                    Today, 10:15 AM
                  </Text>
                </View>
                <View className="flex-row items-center justify-between py-2 border-b border-slate-100">
                  <Text className="text-slate-500 font-medium text-sm">
                    Last Quiz Taken
                  </Text>
                  <Text className="text-slate-800 font-bold text-sm">
                    2 days ago
                  </Text>
                </View>
                <View className="flex-row items-center justify-between py-2">
                  <Text className="text-slate-500 font-medium text-sm">
                    Password Changed
                  </Text>
                  <Text className="text-slate-800 font-bold text-sm">
                    1 month ago
                  </Text>
                </View>
              </View>
            </Animated.View>

            {/* Right Col: Edit Form & Preferences */}
            <Animated.View className="w-full lg:w-2/3 flex-col gap-4">
              <View className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
                <Text className="text-lg font-black text-slate-900 mb-4">
                  Personal Information
                </Text>

                <View className="gap-4 mb-6">
                  <View className="flex-col sm:flex-row gap-4">
                    <View className="flex-1">
                      <Text className="text-slate-700 font-bold mb-2 text-sm">
                        First Name
                      </Text>
                      <TextInput
                        value={firstName}
                        onChangeText={setFirstName}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 outline-none text-slate-800 text-sm focus:border-sky-500 focus:bg-white transition-colors shadow-sm"
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-slate-700 font-bold mb-2 text-sm">
                        Middle Name
                      </Text>
                      <TextInput
                        value={middleName}
                        onChangeText={setMiddleName}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 outline-none text-slate-800 text-sm focus:border-sky-500 focus:bg-white transition-colors shadow-sm"
                      />
                    </View>
                  </View>
                  <View className="flex-col sm:flex-row gap-4">
                    <View className="flex-[3]">
                      <Text className="text-slate-700 font-bold mb-2 text-sm">
                        Last Name
                      </Text>
                      <TextInput
                        value={lastName}
                        onChangeText={setLastName}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 outline-none text-slate-800 text-sm focus:border-sky-500 focus:bg-white transition-colors shadow-sm"
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-slate-700 font-bold mb-2 text-sm">
                        Suffix (Optional)
                      </Text>
                      <TextInput
                        value={suffix}
                        onChangeText={setSuffix}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 outline-none text-slate-800 text-sm focus:border-sky-500 focus:bg-white transition-colors shadow-sm"
                      />
                    </View>
                  </View>
                  <View>
                    <Text className="text-slate-700 font-bold mb-2 text-sm">
                      Email Address
                    </Text>
                    <TextInput
                      value={email}
                      onChangeText={setEmail}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 outline-none text-slate-800 text-sm focus:border-sky-500 focus:bg-white transition-colors shadow-sm"
                    />
                  </View>

                  <View className="flex-col sm:flex-row gap-4 z-10">
                    <View className="flex-1">
                      <DropdownField
                        label="Grade Level"
                        placeholder="Select Grade Level"
                        value={selectedGrade}
                        options={["Grade 11", "Grade 12"]}
                        onSelect={setSelectedGrade}
                      />
                    </View>
                    <View className="flex-1">
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
                    </View>
                  </View>
                  <View className="z-0">
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
                  <View>
                    <Text className="text-slate-700 font-bold mb-2 text-sm">
                      Learner Reference Number (LRN)
                    </Text>
                    <TextInput
                      value={lrn}
                      editable={false}
                      className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3 py-2.5 outline-none text-slate-500 text-sm shadow-sm"
                    />
                  </View>
                </View>

                <View className="flex-row justify-end">
                  <Pressable
                    onPress={handleSaveChanges}
                    disabled={isSaving}
                    className="bg-sky-600 px-6 py-3 rounded-lg items-center active:bg-sky-700 shadow-md shadow-sky-500/30 transition-all active:scale-95 flex-row justify-center gap-2"
                  >
                    {isSaving && (
                      <ActivityIndicator size="small" color="#ffffff" />
                    )}
                    <Text className="text-white font-bold text-sm">
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Text>
                  </Pressable>
                </View>
              </View>

              <View className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
                <Text className="text-lg font-black text-slate-900 mb-4">
                  Security Settings
                </Text>
                <View className="flex-col sm:flex-row justify-between items-start sm:items-center py-3 border-b border-slate-100 gap-3">
                  <View>
                    <Text className="font-bold text-slate-800 text-sm">
                      Password
                    </Text>
                    <Text className="text-slate-500 text-xs mt-0.5">
                      Last changed 1 month ago.
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => setShowPasswordModal(true)}
                    className="bg-slate-100 px-4 py-2 rounded-lg active:bg-slate-200 transition-colors border border-slate-200 cursor-pointer"
                  >
                    <Text className="text-slate-700 font-bold text-xs">
                      Update Password
                    </Text>
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
                    <MaterialCommunityIcons
                      name="logout"
                      size={20}
                      color="#dc2626"
                    />
                  </View>
                  <View>
                    <Text className="text-red-800 font-black text-sm">
                      Sign Out
                    </Text>
                    <Text className="text-red-600 text-xs font-medium mt-0.5">
                      Log out of your account
                    </Text>
                  </View>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={22}
                  color="#dc2626"
                />
              </Pressable>
            </Animated.View>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Avatar Picker Modal */}
      <GlobalModal
        isOpen={showAvatarPicker}
        onClose={() => setShowAvatarPicker(false)}
        title="Select Avatar Theme"
      >
        <View className="py-2 gap-4">
          <Text className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">
            Choose your custom character badge
          </Text>
          <View className="flex-row flex-wrap gap-3 justify-center mb-4">
            {AVATAR_OPTIONS.map((opt) => {
              const colorBase = opt.color.split(" ")[0]; // e.g. bg-sky-100
              const textBase = opt.color.split(" ")[1]; // e.g. text-sky-700
              const isSelected = selectedAvatar === opt.icon;
              return (
                <Pressable
                  key={opt.label}
                  onPress={() => {
                    setSelectedAvatar(opt.icon);
                    setAvatarBgColor(colorBase);
                    setAvatarTextColor(textBase);
                    setShowAvatarPicker(false);
                    showToast(`Updated avatar to ${opt.label}!`);
                  }}
                  className={`p-3 rounded-2xl border-2 items-center w-24 flex-col gap-2 transition-all active:scale-95 cursor-pointer ${isSelected ? "border-sky-500 bg-sky-50/50" : "border-slate-200 bg-white hover:border-slate-300"}`}
                >
                  <View
                    className={`w-12 h-12 rounded-xl items-center justify-center ${colorBase} border border-slate-100`}
                  >
                    <Text className="text-3xl">{opt.icon}</Text>
                  </View>
                  <Text
                    className={`text-[10px] font-black uppercase tracking-wider ${isSelected ? "text-sky-700" : "text-slate-500"}`}
                  >
                    {opt.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <Pressable
            onPress={() => setShowAvatarPicker(false)}
            className="w-full bg-slate-100 py-3.5 rounded-xl items-center active:bg-slate-200"
          >
            <Text className="text-slate-700 font-bold text-sm">Cancel</Text>
          </Pressable>
        </View>
      </GlobalModal>

      {/* Security Update Password Modal */}
      <GlobalModal
        isOpen={showPasswordModal}
        onClose={() => {
          setShowPasswordModal(false);
          setPasswordError("");
        }}
        title="Update Account Password"
      >
        <View className="py-2 gap-4">
          <Text className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            Enter authentication details
          </Text>

          {passwordError ? (
            <View className="bg-red-50 border border-red-200 p-3 rounded-xl">
              <Text className="text-red-700 text-xs font-semibold">
                {passwordError}
              </Text>
            </View>
          ) : null}

          <View className="gap-3">
            <View>
              <Text className="text-slate-700 font-bold mb-1 text-xs">
                Current Password
              </Text>
              <TextInput
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-sm focus:border-sky-500 focus:bg-white transition-colors"
              />
            </View>
            <View>
              <Text className="text-slate-700 font-bold mb-1 text-xs">
                New Password
              </Text>
              <TextInput
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="At least 6 characters"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-sm focus:border-sky-500 focus:bg-white transition-colors"
              />
            </View>
            <View>
              <Text className="text-slate-700 font-bold mb-1 text-xs">
                Confirm New Password
              </Text>
              <TextInput
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-sm focus:border-sky-500 focus:bg-white transition-colors"
              />
            </View>
          </View>

          <View className="flex-row gap-3 mt-4">
            <Pressable
              onPress={() => {
                setShowPasswordModal(false);
                setPasswordError("");
              }}
              className="flex-1 bg-slate-100 py-3.5 rounded-xl items-center border border-slate-200 active:bg-slate-200"
            >
              <Text className="text-slate-700 font-bold text-sm">Cancel</Text>
            </Pressable>
            <Pressable
              onPress={handleUpdatePassword}
              disabled={isUpdatingPassword}
              className="flex-[2] bg-sky-600 py-3.5 rounded-xl items-center active:bg-sky-700 shadow-md shadow-sky-500/30 flex-row justify-center gap-2 active:scale-95 transition-transform"
            >
              {isUpdatingPassword && (
                <ActivityIndicator size="small" color="#ffffff" />
              )}
              <Text className="text-white font-bold text-sm">
                {isUpdatingPassword ? "Updating..." : "Save Password"}
              </Text>
            </Pressable>
          </View>
        </View>
      </GlobalModal>
    </View>
  );
};
