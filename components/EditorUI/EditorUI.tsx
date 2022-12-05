"use client";

import HoveringToolbar from "./HoveringToolbar";
import isHotkey from "is-hotkey";
import withLayout from "./withLayout";
import RenderLeaf from "./RenderLeaf";
import RenderElement from "./RenderElement";
import { useMemo, useCallback } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { toggleMark, initialValue } from "./utilities";
import { HOTKEYS } from "./keyboardEvents";
import type { CustomElement } from "@/lib/types";
import { useEffect, useState } from "react";
import { useTypeedContext } from "@/lib/context";

const EditorUI = () => {
  const [initialNotes, setInitialNotes] = useState<CustomElement[] | null>(
    null
  );
  const { dispatch, savingStatus } = useTypeedContext();
  useEffect(() => {
    const content = localStorage.getItem("content");
    if (content) {
      const contentToCheck = JSON.parse(content);
      if (
        contentToCheck[0].children[0].text !== "" &&
        contentToCheck[1].children[0].text !== ""
      ) {
        setInitialNotes(contentToCheck);
      } else {
        setInitialNotes(initialValue);
      }
    } else {
      setInitialNotes(initialValue);
    }
  }, []);
  const editor = useMemo(
    () => withLayout(withHistory(withReact(createEditor()))),
    []
  );

  const EditorLeaf = useCallback(
    (props: Parameters<typeof RenderLeaf>[0]) => <RenderLeaf {...props} />,
    []
  );

  const EditorElement = useCallback(
    (props: Parameters<typeof RenderElement>[0]) => (
      <RenderElement {...props} />
    ),
    []
  );

  return (
    <section className="p-4 mt-4 border-2 rounded-lg bg-white shadow-2 dark:bg-gray-500">
      {!initialNotes && (
        <div className="flex items-center justify-center p-5">
          <div className="flex space-x-2 animate-pulse">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          </div>
        </div>
      )}
      {initialNotes && (
        <Slate
          editor={editor}
          value={initialNotes}
          onChange={(value) => {
            const isAstChange = editor.operations.some(
              (op) => "set_selection" !== op.type
            );
            if (isAstChange) {
              const content = JSON.stringify(value);
              localStorage.setItem("content", content);
              dispatch({
                type: "SET_VALUE",
                payload: {
                  savingStatus: "Your changes is saved",
                },
              });
              setTimeout(() => {
                dispatch({
                  type: "SET_VALUE",
                  payload: {
                    savingStatus: "",
                  },
                });
              }, 3500);
            }
          }}
        >
          <HoveringToolbar />
          <Editable
            spellCheck
            placeholder="Enter your notes here..."
            renderLeaf={EditorLeaf}
            renderElement={EditorElement}
            onKeyDown={(event) => {
              for (const pressedKey in HOTKEYS) {
                if (isHotkey(pressedKey, event)) {
                  const hotkey = HOTKEYS[pressedKey as keyof typeof HOTKEYS];
                  if (
                    hotkey.type === "mark" &&
                    typeof hotkey.mark === "string"
                  ) {
                    event.preventDefault();
                    toggleMark(editor, hotkey.mark as CustomElement["type"]);
                  } else if (
                    hotkey.type === "special" &&
                    typeof hotkey.mark === "function"
                  ) {
                    hotkey.mark(editor, event);
                  }
                }
              }
            }}
          />
          {savingStatus && (
            <p className="text-xs text-slate-700/50 dark:text-white text-right mt-3 animate-fade-in-up">
              {savingStatus}
            </p>
          )}
        </Slate>
      )}
    </section>
  );
};

export default EditorUI;
