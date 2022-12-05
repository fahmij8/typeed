import BottomSheetUI from "@/components/BottomSheetUI";
import EditorUI from "@/components/EditorUI";
import EditorFooter from "@/components/EditorFooter";
import EditorHeader from "@/components/EditorHeader";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="grid max-sm:mx-4 max-w-2xl mx-auto">
        <EditorHeader />
        <EditorUI />
        <EditorFooter />
      </main>
      <BottomSheetUI />
    </>
  );
}
