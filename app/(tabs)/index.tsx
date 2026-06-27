import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useAuth } from "../../AuthContext";

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const { setRole } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("student");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    if (selectedRole === "admin") navigation.replace("admin");
    else if (selectedRole === "teacher") navigation.replace("teacher");
    else if (selectedRole === "student") navigation.replace("student");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 flex-col lg:flex-row"
      >
        {/* Left Side: Visual / Graphic */}
        <View className="hidden lg:flex flex-1 bg-white relative items-center justify-center overflow-hidden border-r border-slate-200">
          <View className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-400/20 rounded-full blur-[120px]" />
          <View className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-purple-400/20 rounded-full blur-[120px]" />

          <View className="max-w-md p-8 z-10 w-full">
            <View className="flex-row items-center gap-3 mb-10">
              <Image
                source={require("@/assets/images/icon.png")}
                style={{ width: 48, height: 48, borderRadius: 16 }}
              />
              <Text className="text-3xl font-black text-blue-600 tracking-wider">
                i++
              </Text>
            </View>
            <Text className="text-5xl font-black text-slate-900 leading-tight tracking-tight mb-4">
              Explore the{"\n"}limits of{"\n"}
              <Text className="text-blue-600">knowledge.</Text>
            </Text>
            <Text className="text-slate-500 text-lg font-medium leading-relaxed mb-8">
              A Next-Generation Learning Management System powered by AI and
              Blockchain credentialing.
            </Text>
            <Animated.View className="mt-6 w-full items-center justify-center">
              <Image
                source={require("@/assets/images/expi.png")}
                style={{ width: "100%", height: 320 }}
                contentFit="contain"
              />
            </Animated.View>
          </View>
        </View>

        {/* Right Side: Login Form */}
        <ScrollView
          contentContainerClassName="flex-grow justify-center p-6 sm:p-12 lg:px-24 xl:px-32 bg-white"
          className="flex-1 w-full lg:w-auto"
        >
          <View className="w-full max-w-md mx-auto">
            <View className="lg:hidden flex-row items-center gap-3 mb-8">
              <Image
                source={require("@/assets/images/icon.png")}
                style={{ width: 40, height: 40, borderRadius: 12 }}
              />
              <Text className="text-2xl font-black text-blue-600 tracking-wider">
                i++
              </Text>
            </View>

            {/* Dynamic Heading based on screen size */}
            <View className="mb-8">
              {/* Web Header */}
              <Text className="hidden lg:flex text-3xl font-black text-slate-900 tracking-tight mb-2">
                Log into i++
              </Text>

              {/* Mobile Header */}
              <View className="lg:hidden flex-col">
                <Text className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                  Student Portal
                </Text>
                <View className="self-start bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mt-1">
                  <Text className="text-blue-600 text-[10px] font-black uppercase tracking-widest">
                    Exclusive to Students
                  </Text>
                </View>
              </View>
            </View>

            <View className="gap-5 mb-8">
              <View className="relative justify-center">
                <View className="absolute left-4 z-10">
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={22}
                    color="#94a3b8"
                  />
                </View>
                <TextInput
                  placeholder="Email or mobile number"
                  placeholderTextColor="#94a3b8"
                  value={email}
                  onChangeText={setEmail}
                  className="w-full h-14 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl pl-12 pr-4 text-base text-slate-900 outline-none transition-all shadow-sm"
                />
              </View>

              <View className="relative justify-center">
                <View className="absolute left-4 z-10">
                  <MaterialCommunityIcons
                    name="lock-outline"
                    size={22}
                    color="#94a3b8"
                  />
                </View>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  className="w-full h-14 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl pl-12 pr-12 text-base text-slate-900 outline-none transition-all shadow-sm"
                />
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-0 bottom-0 justify-center"
                >
                  <MaterialCommunityIcons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={22}
                    color="#94a3b8"
                  />
                </Pressable>
              </View>
            </View>

            <View className="hidden lg:flex flex-col mb-8">
              <Text className="text-slate-500 font-bold mb-4 text-xs uppercase tracking-widest">
                Select Role
              </Text>
              <View className="flex-row justify-between gap-3">
                {[
                  {
                    id: "admin",
                    label: "Admin",
                    icon: "shield-account",
                    color: "purple",
                  },
                  {
                    id: "teacher",
                    label: "Teacher",
                    icon: "book-open-outline",
                    color: "teal",
                  },
                  {
                    id: "student",
                    label: "Student",
                    icon: "school",
                    color: "orange",
                  },
                ].map((role) => (
                  <Pressable
                    key={role.id}
                    onPress={() => setSelectedRole(role.id)}
                    className={`flex-1 h-24 rounded-2xl border-2 flex-col items-center justify-center gap-2 transition-all ${selectedRole === role.id ? `border-${role.color}-500 bg-${role.color}-50 shadow-md shadow-${role.color}-500/20 scale-[1.02]` : "border-slate-100 bg-slate-50 hover:border-slate-300 hover:bg-white"}`}
                  >
                    <View
                      className={`w-10 h-10 rounded-full items-center justify-center ${selectedRole === role.id ? `bg-${role.color}-500 shadow-sm shadow-${role.color}-500/50` : "bg-white shadow-sm shadow-slate-200"}`}
                    >
                      <MaterialCommunityIcons
                        name={role.icon as any}
                        size={20}
                        color={selectedRole === role.id ? "white" : "#64748b"}
                      />
                    </View>
                    <Text
                      className={`font-bold text-xs ${selectedRole === role.id ? `text-${role.color}-800` : "text-slate-500"}`}
                    >
                      {role.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <Pressable
              onPress={handleLogin}
              className="w-full h-14 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl items-center justify-center shadow-lg shadow-blue-500/40 transition-transform active:scale-[0.98] mb-6"
            >
              <Text className="text-white font-black text-lg tracking-wide">
                Log In
              </Text>
            </Pressable>

            <View className="items-center mb-4">
              <Pressable className="py-2">
                <Text className="text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors">
                  Forgot password?
                </Text>
              </Pressable>
            </View>

            <View className="hidden lg:flex flex-col border-t border-slate-100 pt-8 mt-2 items-center">
              <Text className="text-slate-500 text-sm mb-4 font-medium">
                Are you a school administrator?
              </Text>
              <Pressable
                onPress={() => navigation.navigate("RegisterSchool")}
                className="h-14 w-full px-6 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:bg-slate-100 rounded-xl items-center justify-center transition-transform active:scale-[0.98]"
              >
                <Text className="text-slate-700 font-bold text-base">
                  Register your school
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
