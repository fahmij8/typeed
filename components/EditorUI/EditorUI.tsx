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
import { useState } from "react";
import type { CustomElement } from "@/lib/types";
import { useEffect } from "react";

const EditorUI = () => {
  const [notes, setNotes] = useState(initialValue);
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

  useEffect(() => {
    const storeNotesDebounced = setTimeout(() => {
      const isAstChange = editor.operations.some(
        (op) => "set_selection" !== op.type
      );
      if (isAstChange) {
        const content = JSON.stringify(notes);
        localStorage.setItem("content", content);
      }
    }, 1000);

    return () => clearTimeout(storeNotesDebounced);
  }, [editor.operations, notes]);

  return (
    <Slate
      editor={editor}
      value={notes}
      onChange={(value) => {
        setNotes(value as CustomElement[]);
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
              if (hotkey.type === "mark" && typeof hotkey.mark === "string") {
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
  );
};

export default EditorUI;
