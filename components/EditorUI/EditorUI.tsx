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

const EditorUI = () => {
  const [initialNotes, setInitialNotes] = useState<CustomElement[] | null>(
    null
  );
  useEffect(() => {
    const content = localStorage.getItem("content");
    if (content) {
      setInitialNotes(JSON.parse(content));
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
    <>
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
        </Slate>
      )}
    </>
  );
};

export default EditorUI;
