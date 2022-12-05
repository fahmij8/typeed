import { TIPS } from "@/lib/constant";

export default function EditorFooter() {
  return (
    <section className="text-xs text-slate-700/50 dark:text-white">
      <p className="text-center mt-3">
        {" "}
        Tip of the day : {TIPS[Math.floor(Math.random() * TIPS.length)]}
      </p>
    </section>
  );
}
