import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Animated, { FadeIn, FadeInDown, FadeInUp } from "react-native-reanimated";
import { GlobalModal, SubTabBar } from "./AdminUI";

const MOCK_MATERIALS = [
  { id: 1, name: "PR2_Course_Syllabus.pdf", type: "pdf", size: "2.4 MB", date: "Oct 05, 2026", published: true },
  { id: 2, name: "Chapter_1_Introduction.pptx", type: "presentation", size: "14.1 MB", date: "Oct 10, 2026", published: true },
  { id: 3, name: "Reading_Assignment_1.docx", type: "document", size: "856 KB", date: "Oct 14, 2026", published: false },
  { id: 4, name: "Midterm_Reviewer_Answers.pdf", type: "pdf", size: "1.2 MB", date: "Oct 18, 2026", published: false },
];

export const TeacherClassMaterials = () => {
  const [subTab, setSubTab] = useState("materials");
  const [uploadModal, setUploadModal] = useState(false);
  const [materials, setMaterials] = useState(MOCK_MATERIALS);

  const [contextSearch, setContextSearch] = useState("");
  const [contextUploadModal, setContextUploadModal] = useState(false);
  const [driveSyncModal, setDriveSyncModal] = useState(false);
  const [urlSyncModal, setUrlSyncModal] = useState(false);
  const [deleteContextModal, setDeleteContextModal] = useState(false);
  const [contextToDelete, setContextToDelete] = useState<number | null>(null);
  const [urlInput, setUrlInput] = useState("");

  const [indexedFiles, setIndexedFiles] = useState([
    { id: 1, name: "PR2_Course_Syllabus.pdf", type: "pdf", size: "2.4 MB", chunks: 142, status: "Active" },
    { id: 2, name: "Chapter_1_Introduction.pptx", type: "ppt", size: "14.1 MB", chunks: 320, status: "Active" },
    { id: 3, name: "Midterm_Reviewer_Answers.pdf", type: "pdf", size: "1.2 MB", chunks: 85, status: "Active" },
    { id: 4, name: "Project_Rubric_Template.pdf", type: "pdf", size: "450 KB", chunks: 22, status: "Active" }
  ]);

  const filteredIndexedFiles = indexedFiles.filter(f => f.name.toLowerCase().includes(contextSearch.toLowerCase()));

  const FAQS = [
    { id: 1, icon: "pencil-ruler", title: "What can I generate?", desc: "Draft lesson plans, 10-item multiple choice quizzes, detailed rubrics, or summary study guides based entirely on your uploaded syllabus or presentations." },
    { id: 2, icon: "shield-lock", title: "Is my data private?", desc: "Yes. Your files are vectorized locally within the school's domain. The AI does not train on your materials for public models." },
    { id: 3, icon: "alert-circle", title: "Handling Errors", desc: "Always review generated content. If the AI hallucinates or gives a wrong answer, double-check that the correct material is selected in the Active Context subpage." },
    { id: 4, icon: "database-search", title: "How does it work?", desc: "It uses Retrieval-Augmented Generation (RAG). The AI parses only the documents you upload, generating answers strictly bounded to your curriculum." }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return { icon: 'file-pdf-box', color: '#ef4444', bg: 'bg-red-100' };
      case 'presentation': return { icon: 'file-powerpoint-box', color: '#f97316', bg: 'bg-orange-100' };
      case 'document': return { icon: 'file-word-box', color: '#3b82f6', bg: 'bg-blue-100' };
      default: return { icon: 'file-document-outline', color: '#64748b', bg: 'bg-slate-100' };
    }
  };

  const togglePublish = (id: number) => {
    setMaterials(materials.map(m => m.id === id ? { ...m, published: !m.published } : m));
  };

  return (
    <View className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden w-full mt-2 flex-col min-h-[600px] lg:min-h-[750px]">
      <SubTabBar
        tabs={[
          { id: "materials", label: "Course Materials" },
          { id: "context", label: "Active Context" },
          { id: "faq", label: "Help & FAQ" },
        ]}
        activeTab={subTab}
        setActiveTab={setSubTab}
        color="teal"
      />
      <View className="flex-1 bg-slate-50/50 flex-col">
        {subTab === "materials" && (
          <Animated.View entering={FadeIn} className="flex-1 w-full bg-white">
            <ScrollView showsVerticalScrollIndicator={true} className="flex-1 w-full" contentContainerClassName="flex-grow p-4 sm:p-6 lg:p-8 flex-col max-w-5xl mx-auto w-full gap-6 pb-12">
      {/* Header */}
              <View className="flex-col sm:flex-row justify-between sm:items-center mb-2 gap-4 bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm z-10">
        <View className="flex-1">
          <Text className="text-3xl font-black text-slate-900 tracking-tight">Course Materials</Text>
          <Text className="text-slate-600 text-sm mt-1 leading-relaxed font-medium">
            Upload documents for your students to read. These files also act as the ground-truth for the Classroom AI.
          </Text>
        </View>
        <Pressable
          onPress={() => setUploadModal(true)}
          className="bg-teal-600 px-6 py-3.5 rounded-2xl shadow-lg shadow-teal-500/30 active:bg-teal-700 flex-row items-center justify-center gap-2 transition-transform active:scale-95"
        >
          <MaterialCommunityIcons name="cloud-upload" size={20} color="white" />
          <Text className="text-white font-black uppercase tracking-widest text-xs">Upload Material</Text>
        </Pressable>
      </View>

              <View className="pb-4 pt-2 gap-4">
        {materials.map((file, idx) => {
          const ui = getFileIcon(file.type);
          return (
            <Animated.View key={file.id} entering={FadeInDown.delay(50 * idx)} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <View className="flex-row items-center gap-4 flex-1">
                <View className={`w-12 h-12 rounded-xl items-center justify-center border border-white shadow-sm ${ui.bg}`}>
                  <MaterialCommunityIcons name={ui.icon as any} size={28} color={ui.color} />
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-slate-800 text-base">{file.name}</Text>
                  <Text className="text-slate-500 text-xs mt-1 font-medium">{file.size} • Uploaded {file.date}</Text>
                </View>
              </View>
              
              <View className="flex-row items-center gap-3 w-full sm:w-auto justify-between sm:justify-end mt-2 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <Pressable onPress={() => togglePublish(file.id)} className={`px-4 py-2 rounded-full border flex-row items-center gap-1.5 transition-colors ${file.published ? "bg-emerald-50 border-emerald-200" : "bg-slate-100 border-slate-300"}`}>
                  <MaterialCommunityIcons name={file.published ? "eye-outline" : "eye-off-outline"} size={16} color={file.published ? "#059669" : "#64748b"} />
                  <Text className={`text-xs font-bold ${file.published ? "text-emerald-700" : "text-slate-600"}`}>{file.published ? "Published" : "Hidden"}</Text>
                </Pressable>
                
                <View className="flex-row gap-1">
                  <Pressable className="w-10 h-10 rounded-full items-center justify-center bg-slate-50 border border-slate-200 hover:bg-slate-100 active:bg-slate-200 transition-colors">
                    <MaterialCommunityIcons name="download-outline" size={20} color="#475569" />
                  </Pressable>
                  <Pressable onPress={() => setMaterials(materials.filter(m => m.id !== file.id))} className="w-10 h-10 rounded-full items-center justify-center bg-slate-50 border border-slate-200 hover:bg-red-50 hover:border-red-200 active:bg-red-100 transition-colors group/del">
                    <MaterialCommunityIcons name="trash-can-outline" size={20} color="#64748b" className="group-hover/del:text-red-500" />
                  </Pressable>
                </View>
              </View>
            </Animated.View>
          );
        })}
      </View>
            </ScrollView>
          </Animated.View>
        )}

        {subTab === "context" && (
          <Animated.View entering={FadeIn} className="flex-1 w-full bg-white">
            <ScrollView showsVerticalScrollIndicator={true} className="flex-1 w-full" contentContainerClassName="flex-grow p-4 sm:p-6 lg:p-8 flex-col max-w-5xl mx-auto w-full gap-6 pb-12">
            {/* Header Overview */}
            <View className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-[2rem] shadow-xl flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
               <View className="absolute -right-10 -top-10 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
               <View className="flex-1">
                 <Text className="text-2xl font-black text-white tracking-tight mb-2">Knowledge Base Context</Text>
                 <Text className="text-slate-400 text-sm leading-relaxed max-w-xl font-medium">
                   These materials ground the AI to prevent hallucinations. The RAG system will only search within these approved documents when answering student questions.
                 </Text>
               </View>
              <View className="flex-row items-center justify-around md:justify-start gap-4 sm:gap-6 bg-slate-800/80 p-4 sm:p-5 rounded-2xl border border-slate-700/50 shadow-inner w-full md:w-auto">
                  <View className="items-center">
                    <Text className="text-teal-400 font-black text-3xl">{indexedFiles.length}</Text>
                    <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Sources</Text>
                  </View>
                  <View className="w-[1px] h-10 bg-slate-700" />
                  <View className="items-center">
                    <Text className="text-blue-400 font-black text-3xl">
                      {indexedFiles.reduce((acc, file) => acc + file.chunks, 0)}
                    </Text>
                    <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Chunks</Text>
                  </View>
               </View>
            </View>

            {/* Ingestion Methods */}
            <Text className="font-black text-slate-800 text-lg px-2 mt-2">Add New Context</Text>
            <View className="flex-col sm:flex-row flex-wrap gap-4 w-full">
               <Pressable onPress={() => setContextUploadModal(true)} className="w-full sm:flex-1 bg-white border border-slate-200 p-5 sm:p-6 rounded-2xl shadow-sm hover:border-teal-400 hover:shadow-md transition-all group items-start active:scale-[0.98]">
                  <View className="w-12 h-12 bg-teal-50 rounded-xl items-center justify-center mb-3 group-hover:bg-teal-500 transition-colors border border-teal-100 group-hover:border-teal-600">
                     <MaterialCommunityIcons name="file-upload-outline" size={24} color="#0f766e" className="group-hover:text-white" />
                  </View>
                  <Text className="font-bold text-slate-900 text-base mb-1">Upload Document</Text>
                  <Text className="text-slate-500 text-xs font-medium">PDF, DOCX, PPTX (Max 50MB)</Text>
               </Pressable>
               
               <Pressable onPress={() => setDriveSyncModal(true)} className="w-full sm:flex-1 bg-white border border-slate-200 p-5 sm:p-6 rounded-2xl shadow-sm hover:border-blue-400 hover:shadow-md transition-all group items-start active:scale-[0.98]">
                  <View className="w-12 h-12 bg-blue-50 rounded-xl items-center justify-center mb-3 group-hover:bg-blue-500 transition-colors border border-blue-100 group-hover:border-blue-600">
                     <MaterialCommunityIcons name="google-drive" size={24} color="#1d4ed8" className="group-hover:text-white" />
                  </View>
                  <Text className="font-bold text-slate-900 text-base mb-1">Google Drive Sync</Text>
                  <Text className="text-slate-500 text-xs font-medium">Link folders or specific files</Text>
               </Pressable>
               
               <Pressable onPress={() => setUrlSyncModal(true)} className="w-full sm:flex-1 bg-white border border-slate-200 p-5 sm:p-6 rounded-2xl shadow-sm hover:border-purple-400 hover:shadow-md transition-all group items-start active:scale-[0.98]">
                  <View className="w-12 h-12 bg-purple-50 rounded-xl items-center justify-center mb-3 group-hover:bg-purple-500 transition-colors border border-purple-100 group-hover:border-purple-600">
                     <MaterialCommunityIcons name="link-variant" size={24} color="#7e22ce" className="group-hover:text-white" />
                  </View>
                  <Text className="font-bold text-slate-900 text-base mb-1">Web URL Scraper</Text>
                  <Text className="text-slate-500 text-xs font-medium">Extract text from articles</Text>
               </Pressable>
            </View>

            {/* Search and List */}
            <View className="flex-col sm:flex-row items-start sm:items-center justify-between mt-4 mb-2 px-2 gap-4">
              <Text className="font-black text-slate-800 text-lg">Indexed Materials</Text>
              <View className="flex-row items-center bg-white border border-slate-300 rounded-xl px-4 py-2 shadow-sm focus-within:border-teal-500 transition-all w-full sm:w-72 h-11">
                 <MaterialCommunityIcons name="magnify" size={18} color="#64748b" />
                 <TextInput
                   placeholder="Search indexed materials..."
                   placeholderTextColor="#94a3b8"
                   value={contextSearch}
                   onChangeText={setContextSearch}
                   className="flex-1 ml-2 outline-none text-slate-900 text-sm font-medium h-full"
                 />
              </View>
            </View>

            {/* File List */}
            <View className="w-full bg-slate-50 border border-slate-200 rounded-[24px] p-2 mb-10 overflow-hidden shadow-inner h-[350px]">
              <ScrollView showsVerticalScrollIndicator={true} nestedScrollEnabled={true} className="flex-1 w-full" contentContainerClassName="gap-3 pb-4">
               {filteredIndexedFiles.map((file, idx) => (
                   <Animated.View entering={FadeInDown.delay(50 * idx)} key={file.id} className="bg-white border border-slate-200 p-4 sm:p-5 rounded-2xl flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm mx-1 mt-1">
                   <View className="flex-row items-center gap-4 flex-1">
                     <View className={`w-12 h-12 rounded-xl items-center justify-center shadow-sm flex-shrink-0 ${file.type === 'pdf' ? 'bg-red-50 border border-red-100' : file.type === 'ppt' ? 'bg-orange-50 border border-orange-100' : 'bg-blue-50 border border-blue-100'}`}>
                       <MaterialCommunityIcons name={file.type === 'pdf' ? 'file-pdf-box' : file.type === 'ppt' ? 'file-powerpoint-box' : 'link-variant'} size={28} color={file.type === 'pdf' ? '#ef4444' : file.type === 'ppt' ? '#f97316' : '#3b82f6'} />
                     </View>
                     <View className="flex-1">
                       <Text className="text-slate-900 font-black text-base mb-1 group-hover:text-teal-700 transition-colors" numberOfLines={1}>{file.name}</Text>
                       <View className="flex-row items-center gap-2 flex-wrap mt-0.5">
                         <View className="bg-slate-100 px-2 py-1 rounded border border-slate-200/50"><Text className="text-slate-600 text-[10px] font-bold uppercase tracking-wider">{file.size}</Text></View>
                         <View className="bg-slate-100 px-2 py-1 rounded border border-slate-200/50"><Text className="text-slate-600 text-[10px] font-bold uppercase tracking-wider">{file.chunks} Chunks</Text></View>
                       </View>
                     </View>
                   </View>
                   
                   <View className="flex-row items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-4 sm:pt-0 border-t border-slate-100 sm:border-0">
                     <View className="flex-row items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 shadow-sm">
                       <View className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                       <Text className="text-emerald-800 font-bold text-[10px] uppercase tracking-widest">{file.status}</Text>
                     </View>
                     <View className="flex-row gap-2">
                       <Pressable onPress={() => alert(`Re-syncing ${file.name}...`)} className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 items-center justify-center shadow-sm">
                         <MaterialCommunityIcons name="refresh" size={20} color="#475569" />
                       </Pressable>
                       <Pressable onPress={() => { setContextToDelete(file.id); setDeleteContextModal(true); }} className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 items-center justify-center shadow-sm">
                         <MaterialCommunityIcons name="trash-can-outline" size={20} color="#475569" />
                       </Pressable>
                     </View>
                   </View>
                 </Animated.View>
               ))}
               {filteredIndexedFiles.length === 0 && (
                 <View className="py-16 items-center justify-center border-2 border-dashed border-slate-300 rounded-[2rem] bg-slate-50 mt-2">
                    <MaterialCommunityIcons name="file-search-outline" size={64} color="#94a3b8" />
                    <Text className="text-xl font-black text-slate-700 mt-4">No context files found</Text>
                    <Text className="text-sm text-slate-500 mt-1 font-medium max-w-sm text-center">Try a different search term or add new materials to expand the AI's knowledge base.</Text>
                 </View>
               )}
              </ScrollView>
            </View>
            </ScrollView>
          </Animated.View>
        )}

        {subTab === "faq" && (
          <Animated.View entering={FadeIn} className="flex-1 w-full bg-white">
            <ScrollView showsVerticalScrollIndicator={true} className="flex-1 w-full" contentContainerClassName="flex-grow p-4 sm:p-6 lg:p-8 pb-12 w-full max-w-4xl mx-auto gap-6">
              <View className="mb-8">
                <View className="bg-teal-100 self-start px-3 py-1.5 rounded-lg border border-teal-200 mb-4">
                  <Text className="text-teal-800 font-bold uppercase tracking-widest text-[10px]">Knowledge Base</Text>
                </View>
                <Text className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">AI Support Center</Text>
                <Text className="text-slate-600 text-base leading-relaxed">
                  Learn how to maximize the potential of the Retrieval-Augmented Generation (RAG) assistant safely and effectively.
                </Text>
              </View>
              
              <View className="flex-row flex-wrap gap-6 mb-8">
                {FAQS.map((faq, idx) => (
                  <Animated.View key={faq.id} entering={FadeInUp.delay(100 * idx)} className="w-full md:w-[calc(50%-12px)] bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-200 shadow-sm flex-col gap-5">
                    <View className="w-16 h-16 bg-slate-50 rounded-2xl items-center justify-center border border-slate-200 shadow-sm">
                      <MaterialCommunityIcons name={faq.icon as any} size={32} color="#0f766e" />
                    </View>
                    <View className="flex-1">
                      <Text className="font-black text-slate-900 text-xl mb-3">{faq.title}</Text>
                      <Text className="text-slate-600 text-sm leading-relaxed font-medium">
                        {faq.desc}
                      </Text>
                    </View>
                  </Animated.View>
                ))}
              </View>
              
              <View className="bg-slate-900 p-6 sm:p-8 rounded-[2rem] flex-col sm:flex-row items-start sm:items-center justify-between shadow-xl border border-slate-800 gap-5">
                 <View className="flex-1 w-full">
                   <Text className="text-white font-black text-xl mb-1">Still need help?</Text>
                   <Text className="text-slate-400 text-sm">Contact the IT Administration team to report hallucinations or request higher token limits.</Text>
                 </View>
                 <Pressable className="bg-teal-500 px-6 py-4 rounded-xl active:bg-teal-600 shadow-md w-full sm:w-auto items-center">
                   <Text className="text-white font-bold text-base">Contact Support</Text>
                 </Pressable>
              </View>
            </ScrollView>
          </Animated.View>
        )}
      </View>

      <GlobalModal isOpen={uploadModal} onClose={() => setUploadModal(false)} title="Upload Learning Material">
        <View className="mb-6 mt-2">
          <Pressable className="w-full h-48 border-4 border-dashed border-teal-200 bg-teal-50/50 rounded-[2rem] items-center justify-center hover:bg-teal-50 hover:border-teal-400 transition-colors group active:scale-95 cursor-pointer">
            <View className="w-16 h-16 bg-white rounded-full items-center justify-center shadow-sm mb-4 group-hover:bg-teal-100 transition-colors">
              <MaterialCommunityIcons name="cloud-upload-outline" size={32} color="#0d9488" />
            </View>
            <Text className="text-teal-900 font-bold text-lg mb-1">Drag & Drop Files Here</Text>
            <Text className="text-teal-700 text-sm font-medium">Supports PDF, DOCX, PPTX (Max 50MB)</Text>
          </Pressable>
          <View className="bg-amber-50 border border-amber-200 p-4 rounded-xl mt-6 flex-row items-start gap-3">
             <MaterialCommunityIcons name="information" size={20} color="#d97706" className="mt-0.5" />
             <Text className="text-amber-800 text-xs flex-1 leading-relaxed">Files uploaded here are automatically vectorized and fed into the Classroom AI context. Ensure text is selectable (not image-scans) for best results.</Text>
          </View>
        </View>
        <Pressable onPress={() => setUploadModal(false)} className="w-full bg-slate-900 py-4 rounded-xl items-center shadow-md active:bg-slate-800">
          <Text className="text-white font-bold text-base">Close</Text>
        </Pressable>
      </GlobalModal>

      <GlobalModal isOpen={contextUploadModal} onClose={() => setContextUploadModal(false)} title="Inject Knowledge Base">
        <View className="mb-6 mt-2">
          <Pressable className="w-full h-48 border-4 border-dashed border-teal-200 bg-teal-50/50 rounded-[2rem] items-center justify-center hover:bg-teal-50 hover:border-teal-400 transition-colors group active:scale-95 cursor-pointer mb-6">
            <View className="w-16 h-16 bg-white rounded-full items-center justify-center shadow-sm mb-4 group-hover:bg-teal-100 transition-colors">
              <MaterialCommunityIcons name="cloud-upload-outline" size={32} color="#0d9488" />
            </View>
            <Text className="text-teal-900 font-bold text-lg mb-1">Drag & Drop Documents</Text>
            <Text className="text-teal-700 text-sm font-medium">PDF, DOCX, PPTX (Max 50MB)</Text>
          </Pressable>
          
          <View className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex-row items-start gap-3 shadow-sm">
             <MaterialCommunityIcons name="information" size={20} color="#d97706" className="mt-0.5" />
             <Text className="text-amber-900 text-xs flex-1 leading-relaxed font-medium">
               Injected files are vectorized immediately. Ensure the text inside documents is selectable for optimal RAG accuracy.
             </Text>
          </View>
        </View>
        
        <View className="flex-row gap-3">
          <Pressable onPress={() => setContextUploadModal(false)} className="flex-1 bg-slate-100 py-4.5 rounded-2xl items-center border border-slate-200 active:bg-slate-200 transition-colors">
            <Text className="text-slate-700 font-bold text-base">Cancel</Text>
          </Pressable>
          <Pressable onPress={() => { setContextUploadModal(false); alert("File Uploaded & Vectorizing."); }} className="flex-[2] bg-teal-600 py-4.5 rounded-2xl items-center shadow-lg shadow-teal-500/30 active:bg-teal-700 transition-transform active:scale-95">
            <Text className="text-white font-bold text-base flex-row items-center gap-2">
              <MaterialCommunityIcons name="upload" size={18} /> Confirm Upload
            </Text>
          </Pressable>
        </View>
      </GlobalModal>

      <GlobalModal isOpen={driveSyncModal} onClose={() => setDriveSyncModal(false)} title="Google Drive Sync">
        <View className="mb-6 mt-2">
          <View className="bg-blue-50 border border-blue-200 p-6 rounded-3xl items-center justify-center mb-6">
            <MaterialCommunityIcons name="google-drive" size={48} color="#2563eb" className="mb-4" />
            <Text className="text-blue-900 font-bold text-lg text-center">Connect your Google Workspace</Text>
            <Text className="text-blue-700 text-sm text-center mt-2 font-medium">
              Select specific folders to automatically sync files with the AI's knowledge base.
            </Text>
          </View>
          <Pressable onPress={() => { setDriveSyncModal(false); alert("Opening Google OAuth..."); }} className="w-full bg-blue-600 py-4.5 rounded-2xl items-center shadow-lg shadow-blue-500/30 active:bg-blue-700 transition-colors flex-row justify-center gap-3">
             <MaterialCommunityIcons name="login" size={20} color="white" />
             <Text className="text-white font-bold text-base">Sign in with Google</Text>
          </Pressable>
        </View>
      </GlobalModal>

      <GlobalModal isOpen={urlSyncModal} onClose={() => setUrlSyncModal(false)} title="Scrape Web Content">
        <View className="mb-6 mt-2">
          <Text className="text-slate-700 font-bold mb-2 text-sm">Target URL</Text>
          <TextInput
             placeholder="https://example.com/article"
             placeholderTextColor="#94a3b8"
             value={urlInput}
             onChangeText={setUrlInput}
             className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 outline-none text-slate-900 text-base font-medium focus:border-purple-500 focus:bg-white transition-colors shadow-sm mb-4"
          />
          <View className="bg-purple-50 border border-purple-200 p-4 rounded-xl flex-row items-start gap-3 shadow-sm">
             <MaterialCommunityIcons name="information" size={20} color="#9333ea" className="mt-0.5" />
             <Text className="text-purple-900 text-xs flex-1 leading-relaxed font-bold">
               The scraper will extract text content from the provided URL, ignoring navigation elements and ads. It will be chunked and embedded instantly.
             </Text>
          </View>
        </View>
        <View className="flex-row gap-3">
          <Pressable onPress={() => setUrlSyncModal(false)} className="flex-1 bg-slate-100 py-4.5 rounded-2xl items-center border border-slate-200 active:bg-slate-200 transition-colors">
            <Text className="text-slate-700 font-bold text-base">Cancel</Text>
          </Pressable>
          <Pressable onPress={() => { 
            if (urlInput) {
              setIndexedFiles([{ id: Date.now(), name: urlInput, type: "link", size: "Unknown", chunks: 45, status: "Active" }, ...indexedFiles]);
              setUrlInput("");
              setUrlSyncModal(false);
              alert("URL Content scraped and added!");
            } else {
              alert("Please enter a valid URL.");
            }
          }} className="flex-[2] bg-purple-600 py-4.5 rounded-2xl items-center shadow-lg shadow-purple-500/30 active:bg-purple-700 transition-colors">
            <Text className="text-white font-bold text-base flex-row items-center gap-2">
              <MaterialCommunityIcons name="spider-web" size={18} color="white" /> Extract & Embed
            </Text>
          </Pressable>
        </View>
      </GlobalModal>

      <GlobalModal isOpen={deleteContextModal} onClose={() => setDeleteContextModal(false)} title="Remove Context">
        <View className="items-center mb-8 mt-4">
          <View className="w-24 h-24 bg-red-50 rounded-full border-[6px] border-red-100 items-center justify-center mb-6 shadow-sm">
            <MaterialCommunityIcons name="trash-can-outline" size={40} color="#ef4444" />
          </View>
          <Text className="text-2xl font-black text-slate-900 text-center mb-2 tracking-tight">Remove from Vector DB?</Text>
          <Text className="text-slate-600 text-center text-base px-4 leading-relaxed font-bold">
            This will delete the file's embeddings from the active context. The AI will no longer use this document to answer queries.
          </Text>
        </View>
        <View className="flex-row gap-4">
          <Pressable onPress={() => setDeleteContextModal(false)} className="flex-1 bg-slate-100 py-4.5 rounded-2xl items-center border border-slate-200 active:bg-slate-200 transition-colors">
            <Text className="text-slate-700 font-bold text-base">Cancel</Text>
          </Pressable>
          <Pressable onPress={() => { 
            if (contextToDelete) {
              setIndexedFiles(indexedFiles.filter(f => f.id !== contextToDelete));
            }
            setDeleteContextModal(false);
            setContextToDelete(null);
          }} className="flex-1 bg-red-600 py-4.5 rounded-2xl items-center shadow-lg shadow-red-500/30 active:bg-red-700 transition-transform active:scale-95">
            <Text className="text-white font-bold text-base">Yes, Remove</Text>
          </Pressable>
        </View>
      </GlobalModal>
    </View>
  );
};