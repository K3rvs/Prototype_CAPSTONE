import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { GlobalModal, SubTabBar } from "./AdminUI";

export const AdminCommsSection = () => {
  const [subTab, setSubTab] = useState("alerts");
  const [bulletinModal, setBulletinModal] = useState(false);
  const [bulletinText, setBulletinText] = useState("");
  const [broadcastModal, setBroadcastModal] = useState(false);
  const [broadcastType, setBroadcastType] = useState("Class Suspension");
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [viewBulletin, setViewBulletin] = useState<any | null>(null);
  const [composeNewsletter, setComposeNewsletter] = useState(false);

  const BULLETIN_POSTS = [
    { id: "bp1", title: "Intramurals 2026 Schedule", author: "Admin Mapandan", role: "Principal", time: "2h ago", category: "Events", content: "The official schedule for the 2026 Intramurals has been finalized. All department heads are requested to download the master matrix and disseminate it to their respective advisory classes. Events will start promptly at 8:00 AM.", color: "blue", icon: "trophy" },
    { id: "bp2", title: "Buwan ng Wika Guidelines", author: "Mr. Santos", role: "Head Teacher", time: "1d ago", category: "Academic", content: "Please be guided by the attached memorandum regarding the conduct of activities for the upcoming Buwan ng Wika celebration. Sabayang Pagbigkas will be held on the 28th.", color: "orange", icon: "book-open-variant" },
    { id: "bp3", title: "System Maintenance Downtime", author: "IT Department", role: "System Admin", time: "3d ago", category: "IT Support", content: "The AI Tutor vector database will undergo scheduled maintenance this weekend. Expect intermittent downtime for RAG queries.", color: "slate", icon: "server-network" },
  ];

  const NEWSLETTER_CAMPAIGNS = [
    { id: "nl1", title: "Monthly Digest - September", audience: "Parents & Guardians", status: "Sent", openRate: "68.4%", clickRate: "24.1%", date: "Sep 30, 2026" },
    { id: "nl2", title: "Midterm Grade Slips Availability", audience: "Students", status: "Sent", openRate: "92.1%", clickRate: "85.3%", date: "Oct 18, 2026" },
    { id: "nl3", title: "Faculty End-of-Year Review", audience: "Teachers", status: "Draft", openRate: "-", clickRate: "-", date: "Upcoming" },
  ];

  return (
    <View className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden w-full min-h-[500px]">
      <SubTabBar
        tabs={[
          { id: "alerts", label: "Emergency Alerts" },
          { id: "bulletin", label: "School Bulletin" },
          { id: "newsletters", label: "Newsletters" },
        ]}
        activeTab={subTab}
        setActiveTab={setSubTab}
        color="red"
      />
      <View className="p-6">
        {subTab === "alerts" && (
          <Animated.View entering={FadeIn}>
            <View className="bg-red-600 p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden flex-col sm:flex-row items-start justify-between gap-8 mb-6">
              <MaterialCommunityIcons
                name="bullhorn"
                size={160}
                color="#b91c1c"
                className="absolute -right-10 -bottom-10 opacity-20 sm:-left-10 sm:-bottom-10 sm:right-auto pointer-events-none"
              />
              <View className="z-10 flex-1 w-full">
                <View className="flex-row items-center gap-3 mb-2">
                  <View className="bg-red-500 px-3 py-1 rounded-full border border-red-400">
                    <Text className="text-red-100 font-bold uppercase tracking-widest text-[10px]">
                      Emergency Broadcast System
                    </Text>
                  </View>
                  <View className="bg-red-900/50 px-2 py-1 rounded-full flex-row items-center gap-1.5 border border-red-800">
                    <View className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                    <Text className="text-red-200 text-[10px] font-bold tracking-wider">
                      LIVE
                    </Text>
                  </View>
                </View>
                <Text className="text-white font-black text-3xl mb-2 tracking-tight">
                  Domain-Wide Alert
                </Text>
                <Text className="text-red-100 text-sm mb-6 leading-relaxed max-w-xl">
                  Instantly push PWA notifications and interruptive banners to
                  all Teacher and Student dashboards. Use strictly for critical
                  emergencies (e.g., LGU Class Suspensions).
                </Text>

                <View className="bg-red-700/50 rounded-2xl p-4 sm:p-5 border border-red-500/50 mb-6">
                  <Text className="text-red-200 font-bold mb-3 text-sm">
                    Select Alert Template
                  </Text>
                  <View className="flex-row flex-wrap gap-2 mb-4">
                    {[
                      "Weather/Typhoon",
                      "Class Suspension",
                      "Custom Alert",
                    ].map((type) => (
                      <Pressable
                        key={type}
                        onPress={() => setBroadcastType(type)}
                        className={`px-4 py-2 rounded-xl border transition-colors ${broadcastType === type ? "bg-red-100 border-red-100" : "bg-red-800/50 border-red-600 hover:bg-red-800"}`}
                      >
                        <Text
                          className={`font-bold text-xs ${broadcastType === type ? "text-red-900" : "text-red-200"}`}
                        >
                          {type}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                  <Text className="text-red-200 font-bold mb-2 text-sm">
                    Broadcast Message
                  </Text>
                  <TextInput
                    multiline
                    textAlignVertical="top"
                    numberOfLines={3}
                    placeholder="Enter alert details..."
                    placeholderTextColor="#fca5a5"
                    value={broadcastMessage}
                    onChangeText={setBroadcastMessage}
                    className="w-full bg-red-900/40 border border-red-500/50 rounded-xl p-4 text-white text-base outline-none h-24 focus:border-red-300 transition-colors"
                  />
                </View>
                <Pressable
                  onPress={() => setBroadcastModal(true)}
                  className="w-full bg-red-950 hover:bg-red-900 py-5 rounded-2xl flex-row gap-3 items-center justify-center border border-red-500/50 shadow-lg active:scale-[0.98] transition-all select-none"
                >
                  <MaterialCommunityIcons
                    name="alert-octagram"
                    size={24}
                    color="white"
                  />
                  <Text className="text-white font-black tracking-widest uppercase text-sm sm:text-base">
                    Trigger Broadcast
                  </Text>
                </Pressable>
              </View>
            </View>
          </Animated.View>
        )}
        {subTab === "bulletin" && (
          <Animated.View entering={FadeIn}>
            <View className="flex-1 bg-white border border-blue-100 p-6 sm:p-8 rounded-3xl shadow-sm min-h-[500px]">
              <View className="flex-row justify-between items-start mb-4">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center">
                    <MaterialCommunityIcons
                      name="bulletin-board"
                      size={24}
                      color="#2563eb"
                    />
                  </View>
                  <View>
                    <Text className="font-bold text-slate-800 text-lg">
                      School Bulletin
                    </Text>
                    <Text className="text-slate-500 text-xs">
                      Domain-wide announcements
                    </Text>
                  </View>
                </View>
                <Pressable
                  onPress={() => setBulletinModal(true)}
                  className="bg-blue-600 px-5 py-2.5 rounded-xl active:bg-blue-700 shadow-sm shadow-blue-500/30"
                >
                  <Text className="text-white font-bold text-xs">New Post</Text>
                </Pressable>
              </View>
              
              <ScrollView className="gap-4 border-t border-slate-100 pt-6 -mx-2 px-2" showsVerticalScrollIndicator={false}>
                {BULLETIN_POSTS.map((post, index) => (
                  <Animated.View key={post.id} entering={FadeInDown.delay(100 * index)}>
                    <Pressable
                      onPress={() => setViewBulletin(post)}
                      className={`bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex-col gap-3 mb-4`}
                    >
                      <View className="flex-row justify-between items-start">
                        <View className="flex-row items-center gap-3">
                          <View className={`w-10 h-10 rounded-full bg-${post.color}-100 items-center justify-center`}>
                            <MaterialCommunityIcons name={post.icon as any} size={20} className={`text-${post.color}-600`} />
                          </View>
                          <View>
                            <Text className="font-bold text-slate-800 text-base">{post.title}</Text>
                            <Text className="text-slate-500 text-[11px] font-medium mt-0.5">{post.author} • {post.time}</Text>
                          </View>
                        </View>
                        <View className={`bg-${post.color}-50 px-2.5 py-1 rounded-full border border-${post.color}-200`}>
                          <Text className={`text-${post.color}-700 text-[10px] font-black uppercase tracking-widest`}>{post.category}</Text>
                        </View>
                      </View>
                      <Text className="text-slate-600 text-sm leading-relaxed" numberOfLines={2}>{post.content}</Text>
                    </Pressable>
                  </Animated.View>
                ))}
              </ScrollView>
            </View>
          </Animated.View>
        )}
        {subTab === "newsletters" && (
          <Animated.View entering={FadeIn}>
            <View className="flex-1 bg-white border border-purple-100 p-6 sm:p-8 rounded-3xl shadow-sm flex-col min-h-[500px]">
              <View className="flex-row justify-between items-start mb-4">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center">
                    <MaterialCommunityIcons
                      name="email-newsletter"
                      size={24}
                      color="#9333ea"
                    />
                  </View>
                  <View>
                    <Text className="font-bold text-slate-800 text-lg">
                      Newsletters
                    </Text>
                    <Text className="text-slate-500 text-xs">
                      Parent & Stakeholder Comms
                    </Text>
                  </View>
                </View>
                <Pressable onPress={() => setComposeNewsletter(true)} className="bg-purple-600 px-5 py-2.5 rounded-xl active:bg-purple-700 shadow-sm shadow-purple-500/30 flex-row items-center gap-2">
                  <MaterialCommunityIcons name="pencil-outline" size={16} color="white" />
                  <Text className="text-white font-bold text-xs">Compose</Text>
                </Pressable>
              </View>

              <View className="flex-row flex-wrap gap-4 mb-6">
                <View className="flex-1 min-w-[120px] bg-purple-50 border border-purple-100 p-4 rounded-2xl items-center justify-center">
                  <Text className="text-3xl font-black text-purple-700 mb-1">68.4%</Text>
                  <Text className="text-purple-600/80 text-[10px] font-bold uppercase tracking-widest">Avg Open Rate</Text>
                </View>
                <View className="flex-1 min-w-[120px] bg-blue-50 border border-blue-100 p-4 rounded-2xl items-center justify-center">
                  <Text className="text-3xl font-black text-blue-700 mb-1">24.1%</Text>
                  <Text className="text-blue-600/80 text-[10px] font-bold uppercase tracking-widest">Avg Click Rate</Text>
                </View>
                <View className="flex-1 min-w-[120px] bg-emerald-50 border border-emerald-100 p-4 rounded-2xl items-center justify-center">
                  <Text className="text-3xl font-black text-emerald-700 mb-1">1.2k</Text>
                  <Text className="text-emerald-600/80 text-[10px] font-bold uppercase tracking-widest">Subscribers</Text>
                </View>
              </View>

              <Text className="font-bold text-slate-700 mb-3 border-t border-slate-100 pt-4">Recent Campaigns</Text>
              <ScrollView className="-mx-2 px-2" showsVerticalScrollIndicator={false}>
                {NEWSLETTER_CAMPAIGNS.map((campaign, idx) => (
                  <Animated.View key={campaign.id} entering={FadeInDown.delay(100 * idx)}>
                    <View className="bg-white border border-slate-200 p-4 rounded-2xl mb-3 flex-row items-center justify-between shadow-sm">
                      <View className="flex-1 pr-4">
                        <Text className="font-bold text-slate-800 text-sm">{campaign.title}</Text>
                        <Text className="text-slate-500 text-[10px] mt-1">{campaign.date} • {campaign.audience}</Text>
                      </View>
                      <View className="flex-row items-center gap-3">
                        {campaign.status === "Sent" ? (
                          <View className="items-end hidden sm:flex mr-2">
                            <Text className="text-purple-600 font-bold text-xs">{campaign.openRate} Opens</Text>
                            <Text className="text-blue-500 text-[10px]">{campaign.clickRate} Clicks</Text>
                          </View>
                        ) : null}
                        <View className={`px-2 py-1 rounded border ${campaign.status === "Sent" ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}>
                          <Text className={`text-[10px] font-bold uppercase tracking-widest ${campaign.status === "Sent" ? "text-emerald-700" : "text-amber-700"}`}>{campaign.status}</Text>
                        </View>
                        <MaterialCommunityIcons name="chevron-right" size={20} color="#cbd5e1" />
                      </View>
                    </View>
                  </Animated.View>
                ))}
              </ScrollView>
            </View>
          </Animated.View>
        )}
        <GlobalModal
          isOpen={bulletinModal}
          onClose={() => setBulletinModal(false)}
          title="Compose Bulletin"
        >
          <View className="mb-4 relative">
            <TextInput
              multiline
              textAlignVertical="top"
              numberOfLines={6}
              placeholder="Type '/' for commands..."
              value={bulletinText}
              onChangeText={setBulletinText}
              className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-4 text-base text-slate-800 outline-none h-32 focus:border-blue-500 focus:bg-white transition-colors"
            />
            {bulletinText.endsWith("/") && (
              <Animated.View
                entering={FadeInDown.duration(200)}
                className="absolute left-4 top-14 bg-white border border-slate-200 shadow-xl rounded-xl w-48 overflow-hidden z-50"
              >
                <Pressable className="flex-row items-center gap-3 p-3 border-b border-slate-100 hover:bg-slate-50">
                  <MaterialCommunityIcons
                    name="image"
                    size={18}
                    color="#64748b"
                  />
                  <Text className="text-slate-700 font-medium text-sm">
                    Insert Image
                  </Text>
                </Pressable>
                <Pressable className="flex-row items-center gap-3 p-3 border-b border-slate-100 hover:bg-slate-50">
                  <MaterialCommunityIcons
                    name="table"
                    size={18}
                    color="#64748b"
                  />
                  <Text className="text-slate-700 font-medium text-sm">
                    Insert Table
                  </Text>
                </Pressable>
                <Pressable className="flex-row items-center gap-3 p-3 hover:bg-slate-50">
                  <MaterialCommunityIcons
                    name="format-list-bulleted"
                    size={18}
                    color="#64748b"
                  />
                  <Text className="text-slate-700 font-medium text-sm">
                    Bullet List
                  </Text>
                </Pressable>
              </Animated.View>
            )}
          </View>
          <View className="flex-row items-center justify-between">
            <View className="flex-row gap-2">
              <Pressable className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center active:bg-slate-200">
                <MaterialCommunityIcons
                  name="paperclip"
                  size={20}
                  color="#475569"
                />
              </Pressable>
              <Pressable className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center active:bg-slate-200">
                <MaterialCommunityIcons
                  name="calendar-clock"
                  size={20}
                  color="#475569"
                />
              </Pressable>
            </View>
            <Pressable
              onPress={() => {
                setBulletinModal(false);
                setBulletinText("");
                alert("Bulletin Posted!");
              }}
              className="bg-blue-600 px-6 py-3 rounded-xl active:bg-blue-700 shadow-sm shadow-blue-500/30"
            >
              <Text className="text-white font-bold">Publish to Domain</Text>
            </Pressable>
          </View>
        </GlobalModal>

        <GlobalModal
          isOpen={broadcastModal}
          onClose={() => setBroadcastModal(false)}
          title="Confirm Domain Broadcast"
        >
          <View className="items-center mb-6 mt-2">
            <View className="w-20 h-20 bg-red-100 rounded-full items-center justify-center mb-4 border-4 border-red-50">
              <MaterialCommunityIcons name="alert" size={40} color="#dc2626" />
            </View>
            <Text className="text-2xl font-black text-slate-800 text-center">
              Are you absolutely sure?
            </Text>
            <Text className="text-slate-500 text-center mt-2 leading-relaxed px-4">
              This action cannot be undone. You are about to push an
              interruptive alert to{" "}
              <Text className="font-bold text-slate-800">
                1,249 active sessions
              </Text>
              .
            </Text>
          </View>
          <View className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
            <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              Payload Preview
            </Text>
            <Text className="font-bold text-slate-800">
              [{broadcastType.toUpperCase()}]
            </Text>
            <Text className="text-slate-600 mt-1">
              {broadcastMessage || "No message provided."}
            </Text>
          </View>
          <View className="flex-row gap-3">
            <Pressable
              onPress={() => setBroadcastModal(false)}
              className="flex-1 bg-slate-100 py-4 rounded-xl items-center border border-slate-200 active:bg-slate-200 transition-colors"
            >
              <Text className="text-slate-600 font-bold text-base">Cancel</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setBroadcastModal(false);
                alert("Alert Successfully Broadcasted!");
                setBroadcastMessage("");
              }}
              className="flex-1 bg-red-600 py-4 rounded-xl items-center shadow-md shadow-red-500/30 active:bg-red-700 transition-colors"
            >
              <Text className="text-white font-bold text-base">
                Execute Broadcast
              </Text>
            </Pressable>
          </View>
        </GlobalModal>

        <GlobalModal
          isOpen={!!viewBulletin}
          onClose={() => setViewBulletin(null)}
          title="Bulletin Details"
        >
          {viewBulletin && (
            <View className="items-center mb-2 mt-2">
              <View className={`w-20 h-20 bg-${viewBulletin.color}-100 rounded-full items-center justify-center mb-4 border-4 border-${viewBulletin.color}-50 shadow-sm`}>
                <MaterialCommunityIcons name={viewBulletin.icon} size={36} className={`text-${viewBulletin.color}-600`} />
              </View>
              <Text className="text-2xl font-black text-slate-800 text-center mb-1 px-4">
                {viewBulletin.title}
              </Text>
              
              <View className="flex-row items-center justify-center gap-2 mb-6">
                <View className={`bg-${viewBulletin.color}-50 px-3 py-1 rounded-full border border-${viewBulletin.color}-200`}>
                  <Text className={`text-${viewBulletin.color}-700 text-[10px] font-black uppercase tracking-widest`}>
                    {viewBulletin.category}
                  </Text>
                </View>
                <View className="bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                  <Text className="text-slate-600 text-[10px] font-black uppercase tracking-widest">
                    {viewBulletin.time}
                  </Text>
                </View>
              </View>

              <View className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-6 flex-row items-center justify-start gap-3">
                <View className="w-10 h-10 bg-slate-200 rounded-full items-center justify-center border border-slate-300">
                  <Text className="font-bold text-slate-600">{viewBulletin.author.charAt(0)}</Text>
                </View>
                <View>
                  <Text className="text-slate-800 font-bold text-sm">{viewBulletin.author}</Text>
                  <Text className="text-slate-500 text-xs">{viewBulletin.role}</Text>
                </View>
              </View>
              
              <View className="w-full bg-white border border-slate-100 rounded-2xl p-5 shadow-sm mb-6">
                <Text className="text-slate-600 text-sm leading-relaxed">
                  {viewBulletin.content}
                </Text>
              </View>

              <Pressable
                onPress={() => setViewBulletin(null)}
                className="w-full bg-slate-800 py-4 rounded-xl items-center shadow-md active:bg-slate-900 transition-colors"
              >
                <Text className="text-white font-bold text-base">
                  Acknowledge
                </Text>
              </Pressable>
            </View>
          )}
        </GlobalModal>

        <GlobalModal
          isOpen={composeNewsletter}
          onClose={() => setComposeNewsletter(false)}
          title="Compose Campaign"
        >
          <View className="mb-4 mt-2">
            <Text className="text-slate-700 font-bold mb-2 text-sm">Campaign Name</Text>
            <TextInput
              placeholder="e.g. October Domain Updates"
              placeholderTextColor="#94a3b8"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-purple-500 transition-colors text-slate-800 text-sm"
            />
          </View>
          
          <View className="mb-4">
            <Text className="text-slate-700 font-bold mb-2 text-sm">Target Audience</Text>
            <View className="flex-row gap-2">
              <Pressable className="bg-purple-100 border border-purple-200 px-4 py-2.5 rounded-lg flex-1 items-center">
                <Text className="text-purple-800 font-bold text-xs">All Staff</Text>
              </Pressable>
              <Pressable className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg flex-1 items-center hover:bg-slate-100">
                <Text className="text-slate-600 font-bold text-xs">Students</Text>
              </Pressable>
              <Pressable className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg flex-1 items-center hover:bg-slate-100">
                <Text className="text-slate-600 font-bold text-xs">Parents</Text>
              </Pressable>
            </View>
          </View>

          <View className="mb-6 relative">
            <Text className="text-slate-700 font-bold mb-2 text-sm">Content Body</Text>
            <TextInput
              multiline
              textAlignVertical="top"
              numberOfLines={5}
              placeholder="Type your newsletter content..."
              placeholderTextColor="#94a3b8"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-sm text-slate-800 outline-none min-h-[120px] focus:border-purple-500 focus:bg-white transition-colors"
            />
          </View>
          
          <View className="flex-row gap-3">
            <Pressable
              onPress={() => setComposeNewsletter(false)}
              className="flex-1 bg-slate-100 py-4 rounded-xl items-center border border-slate-200 active:bg-slate-200 transition-colors"
            >
              <Text className="text-slate-600 font-bold text-sm">Save Draft</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setComposeNewsletter(false);
                alert("Campaign Sent!");
              }}
              className="flex-1 bg-purple-600 py-4 rounded-xl items-center shadow-md shadow-purple-500/30 active:bg-purple-700 transition-colors"
            >
              <Text className="text-white font-bold text-sm">Launch Campaign</Text>
            </Pressable>
          </View>
        </GlobalModal>
      </View>
    </View>
  );
};