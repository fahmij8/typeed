"use client";

import { useEffect, useRef } from "react";
import { Editor, Range } from "slate";
import { useSlate, ReactEditor } from "slate-react";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdCode,
  MdMoreHoriz,
} from "react-icons/md";
import { useTypeedContext } from "@/lib/context";

const HoveringToolbar = () => {
  const { dispatch } = useTypeedContext();
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
    const calculateLeftPosition =
      (rect?.left || 0) +
      window.pageXOffset -
      el.offsetWidth / 2 +
      (rect?.width || 0) / 2;
    const finalLeftPosition =
      calculateLeftPosition < 0
        ? 0
        : el.getBoundingClientRect().right > window.screen.width
        ? calculateLeftPosition -
          (el.getBoundingClientRect().right - window.screen.width) -
          20
        : calculateLeftPosition;
    el.style.opacity = "1";
    el.style.top = `${
      (rect?.top || 0) + window.pageYOffset - el.offsetHeight
    }px`;
    el.style.left = `${finalLeftPosition}px`;
  }, [editor, selection]);

  const baseClass =
    "text-base focus:outline-none flex justify-center px-3 py-2 font-bold cursor-pointer hover:bg-slate-600 bg-slate-800 text-gray-100 border duration-200 ease-in-out border-slate-700 transition";
  const leftMostClass = "rounded-l rounded-r-none";
  const rightMostClass = "rounded-r rounded-l-none";
  const middleClass = "rounded-none";

  return (
    <>
      <div
        className="flex m-2 absolute z-10 top-[-10000px] left-[-10000px] -mt-2 opacity-0 transition-opacity"
        ref={ref}
      >
        <button className={`${baseClass} ${leftMostClass}`}>
          <div className="flex leading-5">
            <MdFormatBold />
          </div>
        </button>
        <button className={`${baseClass} ${middleClass}`}>
          <div className="flex leading-5">
            <MdFormatItalic />
          </div>
        </button>
        <button className={`${baseClass} ${middleClass}`}>
          <div className="flex leading-5">
            <MdFormatUnderlined />
          </div>
        </button>
        <button className={`${baseClass} ${middleClass}`}>
          <div className="flex leading-5">
            <MdCode />
          </div>
        </button>
        <button
          className={`${baseClass} ${rightMostClass}`}
          onClick={() =>
            dispatch({
              type: "OPEN_BOTTOM_SHEET",
              payload: (
                <div onClick={() => dispatch({ type: "CLOSE_BOTTOM_SHEET" })}>
                  Test
                </div>
              ),
            })
          }
        >
          <div className="flex leading-5">
            <MdMoreHoriz />
          </div>
        </button>
      </div>
    </>
  );
};

export default HoveringToolbar;
