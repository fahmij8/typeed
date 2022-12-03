import { useEffect, useRef } from "react";
import { Editor, Range } from "slate";
import { useSlate, ReactEditor } from "slate-react";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
} from "react-icons/md";

const HoveringToolbar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const editor = useSlate();
  const { selection } = editor;
  useEffect(() => {
    const el = ref.current;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ""
    ) {
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection?.getRangeAt(0);
    const rect = domRange?.getBoundingClientRect();
    el.style.opacity = "1";
    el.style.top = `${
      (rect?.top || 0) + window.pageYOffset - el.offsetHeight
    }px`;
    el.style.left = `${
      (rect?.left || 0) +
      window.pageXOffset -
      el.offsetWidth / 2 +
      (rect?.width || 0) / 2
    }px`;
  });

  return (
    <div
      className="flex m-2 absolute z-10 top-[-10000px] left-[-10000px] -mt-2 opacity-0 transition-opacity"
      ref={ref}
    >
      <button className="text-base rounded-r-none focus:outline-none flex justify-center px-3 py-2 rounded font-bold cursor-pointer hover:bg-slate-600 bg-slate-800 text-gray-100 border duration-200 ease-in-out border-slate-700 transition">
        <div className="flex leading-5">
          <MdFormatBold />
        </div>
      </button>
      <button className="text-base focus:outline-none flex justify-center px-3 py-2 font-bold cursor-pointer hover:bg-slate-600 bg-slate-800 text-gray-100 border duration-200 ease-in-out border-slate-700 transition">
        <div className="flex leading-5">
          <MdFormatItalic />
        </div>
      </button>
      <button className="text-base rounded-l-none focus:outline-none flex justify-center px-3 py-2 rounded font-bold cursor-pointer hover:bg-slate-600 bg-slate-800 text-gray-100 border duration-200 ease-in-out border-slate-700 transition">
        <div className="flex leading-5">
          <MdFormatUnderlined />
        </div>
      </button>
    </div>
  );
};

export default HoveringToolbar;
