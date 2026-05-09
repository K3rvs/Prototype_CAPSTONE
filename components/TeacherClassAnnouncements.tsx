/// <reference types="nativewind/types" />
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Animated, { FadeIn, FadeInDown, Layout } from "react-native-reanimated";
import { GlobalModal } from "./AdminUI";

const AVATAR_URL = "https://api.dicebear.com/9.x/notionists/png?seed=TeacherJane&backgroundColor=b6e3f4";

const INITIAL_ANNOUNCEMENTS = [
  { id: 8, title: "Reminder: Chapter 4 Quiz Tomorrow", body: "Don't forget to review the RAG sandbox for limits and continuity. The quiz will start strictly at 8:00 AM. Ensure your devices are fully charged and you have a stable internet connection. Good luck!", date: "Oct 26, 2026 • 04:00 PM", author: "Teacher Jane", views: 42, isPinned: true, attachments: ["Quiz_Coverage.pdf"] },
  { id: 7, title: "Uploaded New Reading Materials", body: "I have added the latest DepEd memorandums and reading resources to our classroom directory. Please check them out before our next session to keep up with the discussions.", date: "Oct 25, 2026 • 09:15 AM", author: "Teacher Jane", views: 38, isPinned: false, attachments: ["DepEd_Memo_44.pdf", "Reading_List.docx"] },
  { id: 6, title: "Science Fair Registration Extended", body: "Good news! The deadline for the Science Fair registration has been extended until the end of the month. See me during consultation hours if you need help with your proposals.", date: "Oct 23, 2026 • 01:30 PM", author: "Teacher Jane", views: 45, isPinned: false, attachments: [] },
  { id: 5, title: "Parent-Teacher Meeting Schedule", body: "Please remind your parents about the upcoming PTA meeting this Friday at the main hall. Attendance is highly encouraged as we will discuss the upcoming domain events.", date: "Oct 20, 2026 • 10:00 AM", author: "Teacher Jane", views: 40, isPinned: false, attachments: ["PTA_Agenda.pdf"] },
  { id: 4, title: "Adjusted Consultation Hours", body: "My consultation hours for this week will be moved to Thursday afternoon due to a sudden faculty meeting. Plan your inquiries accordingly.", date: "Oct 18, 2026 • 03:45 PM", author: "Teacher Jane", views: 35, isPinned: false, attachments: [] },
  { id: 3, title: "Group Project Guidelines", body: "The rubric for your mid-term group project is now available. Ensure all members contribute equally. Peer evaluations will be a significant part of the final grade calculation.", date: "Oct 15, 2026 • 11:20 AM", author: "Teacher Jane", views: 44, isPinned: false, attachments: ["Project_Rubric.pdf"] },
  { id: 2, title: "Welcome to the New Semester!", body: "Welcome back, 12-STEM1! I am looking forward to a productive and engaging semester with all of you. Let's make this year count and aim for excellence.", date: "Oct 10, 2026 • 08:00 AM", author: "Teacher Jane", views: 45, isPinned: false, attachments: [] },
  { id: 1, title: "Syllabus and Course Outline Available", body: "Please review the syllabus to understand our learning objectives and the grading system for this academic year. Feel free to ask questions if anything is unclear.", date: "Oct 05, 2026 • 09:00 AM", author: "Teacher Jane", views: 45, isPinned: false, attachments: ["Course_Syllabus_2026.pdf"] },
];

export const TeacherClassAnnouncements = () => {
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);

  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");

  const handleCreate = () => {
    if (!newTitle.trim() || !newBody.trim()) {
      alert("Please provide both title and content.");
      return;
    }
    const newAnnouncement = {
      id: Date.now(),
      title: newTitle,
      body: newBody,
      date: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute:'2-digit' }).replace(',', ' •'),
      author: "Teacher Jane",
      views: 0,
      isPinned: false,
      attachments: []
    };
    setAnnouncements([newAnnouncement, ...announcements]);
    setNewTitle("");
    setNewBody("");
    setIsCreateModalOpen(false);
  };

  const confirmDelete = (id: number) => {
    setTargetId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (targetId) {
      setAnnouncements(announcements.filter((a) => a.id !== targetId));
    }
    setIsDeleteModalOpen(false);
    setTargetId(null);
  };

  return (
    <Animated.View entering={FadeIn} className="w-full mt-2 flex-col min-h-[500px]">
      {/* Header */}
      <View className="flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4 border-b border-slate-200 pb-6 bg-white p-6 rounded-[2rem] shadow-sm z-10">
        <View className="flex-1">
          <Text className="text-3xl font-black text-slate-900 tracking-tight">Class Announcements</Text>
          <Text className="text-slate-500 text-sm mt-1 leading-relaxed">
            Broadcast updates directly to your students' dashboard.
          </Text>
        </View>
        <Pressable
          onPress={() => setIsCreateModalOpen(true)}
          className="bg-teal-600 px-8 py-4 rounded-2xl shadow-lg shadow-teal-500/30 active:bg-teal-700 flex-row items-center justify-center gap-2 transition-transform active:scale-95"
        >
          <MaterialCommunityIcons name="plus-circle" size={22} color="white" />
          <Text className="text-white font-black uppercase tracking-widest text-sm">Create Post</Text>
        </Pressable>
      </View>

      {/* Announcements List */}
      <View className="px-2 pb-10 pt-2 gap-6">
          {announcements.map((announcement, index) => (
            <Animated.View
              key={announcement.id}
              entering={FadeInDown.delay(50 * index)}
              className={`bg-white border rounded-[2rem] p-6 sm:p-8 shadow-sm flex-col relative overflow-hidden ${announcement.isPinned ? "border-teal-400 shadow-teal-500/10" : "border-slate-200"}`}
            >
              {announcement.isPinned && (
                <View className="absolute top-0 right-0 bg-teal-500 px-6 py-1.5 rounded-bl-2xl z-10 shadow-sm">
                  <Text className="text-white text-[10px] font-black uppercase tracking-widest flex-row items-center">
                    <MaterialCommunityIcons name="pin" size={12} /> Pinned
                  </Text>
                </View>
              )}

              <View className="flex-row items-center justify-between mb-5 gap-4">
                <View className="flex-row items-center gap-4 flex-1">
                  <View className="w-14 h-14 rounded-full border-4 border-teal-50 bg-teal-100 overflow-hidden shadow-sm items-center justify-center">
                    <Image 
                      source={{ uri: AVATAR_URL }}
                      style={{ width: '100%', height: '100%' }}
                      contentFit="cover"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="font-black text-slate-900 text-lg">{announcement.author}</Text>
                    <Text className="text-slate-500 text-xs font-medium mt-0.5 flex-row items-center">
                      <MaterialCommunityIcons name="calendar-clock" size={14} color="#94a3b8" /> {announcement.date}
                    </Text>
                  </View>
                </View>
                <Pressable
                  onPress={() => confirmDelete(announcement.id)}
                  className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center border border-slate-200 z-20"
                >
                  <MaterialCommunityIcons name="trash-can-outline" size={20} color="#64748b" />
                </Pressable>
              </View>

              <Text className="text-xl sm:text-2xl font-black text-slate-900 mb-3 leading-tight tracking-tight">
                {announcement.title}
              </Text>
              <Text className="text-slate-600 text-base leading-relaxed mb-6">
                {announcement.body}
              </Text>

              <View className="flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-slate-100">
                <View className="flex-row flex-wrap gap-2 flex-1">
                  {announcement.attachments && announcement.attachments.map((file, i) => (
                     <View key={i} className="flex-row items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                        <MaterialCommunityIcons name="paperclip" size={16} color="#0f766e" />
                        <Text className="text-slate-700 text-xs font-bold">{file}</Text>
                     </View>
                  ))}
                </View>
                
                <View className="flex-row items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-200 self-start sm:self-auto shadow-sm">
                  <MaterialCommunityIcons name="eye-outline" size={16} color="#64748b" />
                  <Text className="text-slate-600 text-xs font-bold">Seen by {announcement.views}</Text>
                </View>
              </View>
            </Animated.View>
          ))}

          {announcements.length === 0 && (
             <View className="items-center justify-center py-24 opacity-60 bg-white rounded-[2rem] border-2 border-dashed border-slate-300">
               <MaterialCommunityIcons name="bullhorn-variant-outline" size={80} color="#cbd5e1" />
               <Text className="text-2xl font-black text-slate-500 mt-4">No Announcements Yet</Text>
               <Text className="text-base text-slate-400 mt-2 text-center max-w-sm">Your broadcast history will appear here. Create a post to notify your students.</Text>
             </View>
          )}
      </View>

      {/* Create Modal */}
      <GlobalModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Post an Announcement"
      >
        <View className="gap-5 mb-8 mt-2">
          <View>
            <Text className="text-slate-700 font-bold mb-2 text-sm">Subject / Title</Text>
            <TextInput
              placeholder="e.g. Tomorrow's Examination Scope"
              placeholderTextColor="#94a3b8"
              value={newTitle}
              onChangeText={setNewTitle}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 outline-none text-slate-800 text-base focus:border-teal-500 focus:bg-white transition-colors shadow-sm"
            />
          </View>

          <View>
            <Text className="text-slate-700 font-bold mb-2 text-sm">Message Content</Text>
            <TextInput
              multiline
              textAlignVertical="top"
              numberOfLines={5}
              placeholder="Write your announcement details here..."
              placeholderTextColor="#94a3b8"
              value={newBody}
              onChangeText={setNewBody}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 outline-none text-slate-800 text-base min-h-[140px] focus:border-teal-500 focus:bg-white transition-colors shadow-sm"
            />
          </View>

          <View>
             <Text className="text-slate-700 font-bold mb-2 text-sm">Attachments (Optional)</Text>
             <Pressable className="w-full border-2 border-dashed border-teal-200 bg-teal-50/50 rounded-2xl p-6 items-center justify-center hover:bg-teal-50 transition-colors active:scale-[0.98]">
                <View className="w-12 h-12 bg-teal-100 rounded-full items-center justify-center mb-3 shadow-sm">
                   <MaterialCommunityIcons name="cloud-upload" size={24} color="#0f766e" />
                </View>
                <Text className="text-teal-900 font-bold text-sm">Upload File or Image</Text>
                <Text className="text-teal-600 text-xs mt-1">PDF, DOCX, JPG, PNG up to 10MB</Text>
             </Pressable>
          </View>
        </View>

        <View className="flex-row gap-3">
          <Pressable
            onPress={() => setIsCreateModalOpen(false)}
            className="flex-1 bg-slate-100 py-4 rounded-2xl items-center border border-slate-200 active:bg-slate-200 transition-colors"
          >
            <Text className="text-slate-700 font-bold text-base">Cancel</Text>
          </Pressable>
          <Pressable
            onPress={handleCreate}
            className="flex-[2] bg-teal-600 py-4 rounded-2xl items-center shadow-lg shadow-teal-500/30 active:bg-teal-700 transition-colors"
          >
            <Text className="text-white font-bold text-base">Broadcast to Class</Text>
          </Pressable>
        </View>
      </GlobalModal>

      {/* Delete Confirmation Modal */}
      <GlobalModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Announcement"
      >
        <View className="items-center mb-10 mt-4">
          <View className="w-24 h-24 bg-red-50 rounded-full border-[6px] border-red-100 items-center justify-center mb-5 shadow-sm">
            <MaterialCommunityIcons name="alert-outline" size={48} color="#ef4444" />
          </View>
          <Text className="text-2xl font-black text-slate-900 text-center mb-2 tracking-tight">Delete Announcement?</Text>
          <Text className="text-slate-600 text-center text-base px-4 leading-relaxed">
            This action is permanent and cannot be undone. The post will be instantly removed from all student dashboards.
          </Text>
        </View>
        
        <View className="flex-row gap-3">
          <Pressable
            onPress={() => setIsDeleteModalOpen(false)}
            className="flex-1 bg-slate-100 py-4 rounded-2xl items-center border border-slate-200 active:bg-slate-200 transition-colors"
          >
            <Text className="text-slate-700 font-bold text-base">Keep Post</Text>
          </Pressable>
          <Pressable
            onPress={handleDelete}
            className="flex-1 bg-red-600 py-4 rounded-2xl items-center shadow-lg shadow-red-500/30 active:bg-red-700 transition-transform active:scale-95"
          >
            <Text className="text-white font-bold text-base">Yes, Delete</Text>
          </Pressable>
        </View>
      </GlobalModal>
    </Animated.View>
  );
};