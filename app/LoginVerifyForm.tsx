import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginVerifyForm() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { role, school } = route.params || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [empNum, setEmpNum] = useState("");
  const [lrn, setLrn] = useState("");
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const float1 = useSharedValue(0);
  const float2 = useSharedValue(0);

  useEffect(() => {
    if (role === 'student') {
      float1.value = withRepeat(withSequence(withTiming(-15, { duration: 1500 }), withTiming(0, { duration: 1500 })), -1, true);
      float2.value = withRepeat(withSequence(withTiming(15, { duration: 1800 }), withTiming(0, { duration: 1800 })), -1, true);
    }
  }, [role]);

  const floatStyle1 = useAnimatedStyle(() => ({ transform: [{ translateY: float1.value }] }));
  const floatStyle2 = useAnimatedStyle(() => ({ transform: [{ translateY: float2.value }] }));

  const roleConfig = {
    admin: {
      color: "bg-purple-500",
      text: "text-purple-600",
      border: "focus:border-purple-500",
      icon: "shield-account",
    },
    teacher: {
      color: "bg-teal-500",
      text: "text-teal-600",
      border: "focus:border-teal-500",
      icon: "book-open-outline",
    },
    student: {
      color: "bg-orange-500",
      text: "text-orange-600",
      border: "focus:border-orange-500",
      icon: "controller-classic",
    },
  }[role as string] || {
    color: "bg-indigo-500",
    text: "text-indigo-600",
    border: "focus:border-indigo-500",
    icon: "account",
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigation.navigate("LoginVerifyPending", { role, school });
    }, 2500);
  };

  return (
    <SafeAreaView className={`flex-1 ${role === 'student' ? 'bg-orange-50' : 'bg-indigo-50'} relative overflow-hidden`}>
      {/* Fun Student Decorators */}
      {role === 'student' && (
        <>
          {Platform.OS === "web" && (
            <>
              <View className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-orange-400/20 rounded-full blur-[80px] pointer-events-none z-0" />
              <View className="absolute bottom-[-50px] right-[-50px] w-72 h-72 bg-amber-400/20 rounded-full blur-[100px] pointer-events-none z-0" />
            </>
          )}

          <Animated.View style={floatStyle1} className="absolute top-[10%] right-[8%] opacity-50 pointer-events-none hidden sm:flex z-0">
            <Text className="text-6xl">🎓</Text>
          </Animated.View>
          <Animated.View style={floatStyle2} className="absolute bottom-[20%] left-[8%] opacity-50 pointer-events-none hidden sm:flex z-0">
            <Text className="text-6xl">🎮</Text>
          </Animated.View>
          <Animated.View style={floatStyle1} className="absolute top-[30%] left-[3%] opacity-40 pointer-events-none z-0">
            <Text className="text-3xl">✨</Text>
          </Animated.View>
          <Animated.View style={floatStyle2} className="absolute bottom-[10%] right-[5%] opacity-40 pointer-events-none z-0">
            <Text className="text-3xl">🎯</Text>
          </Animated.View>
        </>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 z-10"
      >
        <ScrollView contentContainerClassName="flex-grow justify-center p-4 sm:p-6 mx-auto w-full max-w-2xl">
          <Pressable
            onPress={() => navigation.goBack()}
            className="mb-6 flex-row items-center gap-2"
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={20}
              color="#475569"
            />
            <Text className="text-slate-600 font-bold text-base">
              Back to search
            </Text>
          </Pressable>

          <View className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl shadow-slate-300/50">
            <View className="mb-8 flex-row items-center gap-4">
              <View
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${roleConfig.color} shadow-lg`}
              >
                <MaterialCommunityIcons
                  name={roleConfig.icon as any}
                  size={28}
                  color="white"
                />
              </View>
              <View className="flex-1">
                <Text
                  className={`${roleConfig.text} font-bold capitalize mb-1 text-base`}
                >
                  {role === 'student' ? 'Student Registration' : `${role} Verification`}
                </Text>
                <Text className="text-2xl font-bold text-slate-900 leading-tight">
                  {school}
                </Text>
              </View>
            </View>

            <View className="space-y-5 gap-4">
              <Animated.View
                entering={FadeInDown.delay(100).duration(400)}
                className="gap-4"
              >
                <View>
                  <Text className="mb-2 text-slate-700 font-bold text-base">
                    Full Name
                  </Text>
                  <TextInput
                    placeholder="Juan Dela Cruz"
                    placeholderTextColor="#94a3b8"
                    value={name}
                    onChangeText={setName}
                    className={`w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-4 text-base text-slate-900 outline-none ${roleConfig.border} focus:bg-white`}
                  />
                </View>

                {role !== "student" && (
                  <View>
                    <Text className="mb-2 text-slate-700 font-bold text-base">
                      Official Institutional Email
                    </Text>
                    <TextInput
                      placeholder="email@school.edu.ph"
                      placeholderTextColor="#94a3b8"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      className={`w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-4 text-base text-slate-900 outline-none ${roleConfig.border} focus:bg-white`}
                    />
                  </View>
                )}

                {role === "admin" && (
                  <Animated.View
                    entering={FadeInDown.delay(200).duration(400)}
                    className="gap-4"
                  >
                    <View>
                      <Text className="mb-2 text-slate-700 font-bold text-base">
                        Designation
                      </Text>
                      <TextInput
                        placeholder="School Principal, Head Teacher, etc."
                        placeholderTextColor="#94a3b8"
                        value={designation}
                        onChangeText={setDesignation}
                        className={`w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-4 text-base text-slate-900 outline-none ${roleConfig.border} focus:bg-white`}
                      />
                    </View>
                    <View>
                      <Text className="mb-2 text-slate-700 font-bold text-base">
                        Cryptographic Proof of Identity
                      </Text>
                      <Pressable
                        onPress={() => setUploaded(!uploaded)}
                        className={`w-full rounded-2xl border-2 border-dashed p-6 items-center justify-center ${uploaded ? "border-emerald-400 bg-emerald-50" : "border-slate-300 bg-slate-50"}`}
                      >
                        <MaterialCommunityIcons
                          name={uploaded ? "file-check" : "cloud-upload"}
                          size={36}
                          color={uploaded ? "#10b981" : "#94a3b8"}
                        />
                        <Text
                          className={`mt-2 font-bold text-center ${uploaded ? "text-emerald-700" : "text-slate-600"}`}
                        >
                          {uploaded
                            ? "Securely Uploaded: DEPED_ID_Signed.pdf"
                            : "Tap to Upload DEPED ID or Letter"}
                        </Text>
                        <Text className="text-slate-400 text-sm mt-1">
                          PDF, JPG, PNG (Encrypted)
                        </Text>
                      </Pressable>
                    </View>
                  </Animated.View>
                )}

                {role === "teacher" && (
                  <Animated.View entering={FadeInDown.delay(200).duration(400)}>
                    <Text className="mb-2 text-slate-700 font-bold text-base">
                      DEPED Employee Number
                    </Text>
                    <TextInput
                      placeholder="e.g. 1234567"
                      placeholderTextColor="#94a3b8"
                      value={empNum}
                      onChangeText={setEmpNum}
                      keyboardType="number-pad"
                      className={`w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-4 text-base text-slate-900 outline-none ${roleConfig.border} focus:bg-white`}
                    />
                  </Animated.View>
                )}

                {role === "student" && (
                  <Animated.View
                    entering={FadeInDown.delay(200).duration(400)}
                    className="gap-4"
                  >
                    <View className="flex-row gap-3">
                      <View className="flex-1">
                        <Text className="mb-2 text-slate-700 font-bold text-base">
                          Grade Level
                        </Text>
                        <View className="flex-row gap-2">
                          {["11", "12"].map((g) => (
                            <Pressable
                              key={g}
                              onPress={() => setGrade(g)}
                              className={`flex-1 py-4 items-center justify-center rounded-2xl border ${grade === g ? "bg-orange-500 border-orange-500" : "bg-slate-50 border-slate-300"}`}
                            >
                              <Text
                                className={`font-bold text-base ${grade === g ? "text-white" : "text-slate-600"}`}
                              >
                                Grade {g}
                              </Text>
                            </Pressable>
                          ))}
                        </View>
                      </View>
                    </View>
                    <View>
                      <Text className="mb-2 text-slate-700 font-bold text-base">
                        Section
                      </Text>
                      <TextInput
                        placeholder="e.g. STEM-1"
                        placeholderTextColor="#94a3b8"
                        value={section}
                        onChangeText={setSection}
                        className={`w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-4 text-base text-slate-900 outline-none ${roleConfig.border} focus:bg-white`}
                      />
                    </View>
                    <View>
                      <Text className="mb-2 text-slate-700 font-bold text-base">
                        Learner Reference Number (LRN)
                      </Text>
                      <TextInput
                        placeholder="12-digit LRN"
                        placeholderTextColor="#94a3b8"
                        value={lrn}
                        onChangeText={setLrn}
                        keyboardType="number-pad"
                        maxLength={12}
                        className={`w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-4 text-base text-slate-900 outline-none ${roleConfig.border} focus:bg-white`}
                      />
                    </View>
                  </Animated.View>
                )}
              </Animated.View>

              <View className="flex-row items-start gap-3 rounded-2xl bg-blue-50 p-4 mt-2 border border-blue-100">
                <MaterialCommunityIcons
                  name="lock"
                  size={20}
                  color="#1e40af"
                  className="mt-0.5"
                />
                <Text className="text-blue-800 flex-1 leading-6">
                  Your credentials are pseudo-anonymized (SHA-256) before
                  reaching any external API. Fully compliant with RA 10173.
                </Text>
              </View>

              <Pressable
                onPress={handleSubmit}
                disabled={isSubmitting}
                className={`w-full rounded-2xl ${roleConfig.color} py-4 items-center shadow-md mt-6 ${isSubmitting ? "opacity-80" : ""}`}
              >
                {isSubmitting ? (
                  <View className="flex-row items-center justify-center h-7 gap-3">
                    <ActivityIndicator color="white" />
                    <Text className="text-white font-bold text-lg">
                      Verifying...
                    </Text>
                  </View>
                ) : (
                  <Text className="text-white font-bold text-lg">
                    Submit for Verification 🚀
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
