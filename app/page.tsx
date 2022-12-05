import BottomSheetUI from "@/components/BottomSheetUI";
import EditorUI from "@/components/EditorUI";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="grid max-sm:mx-4 max-w-2xl mx-auto p-4 mt-4 border-2 rounded-lg bg-white shadow-2 dark:bg-gray-500">
          <EditorUI />
        </section>
      </main>
      <BottomSheetUI />
    </>
  );
}
