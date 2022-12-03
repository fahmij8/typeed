"use client";

import React, { useMemo, useCallback } from "react";
import { createEditor, Editor } from "slate";
import type { Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import isHotkey from "is-hotkey";
import RenderLeaf from "./RenderLeaf";
import RenderElement from "./RenderElement";
import HoveringToolbar from "./HoveringToolbar";
import { onBackspace, HOTKEYS } from "./keyboardEvents";
import type { EditorType } from "@/lib/types";

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "Lets type something here" }],
  },
];

const EditorUI = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  /** Helper Function */
  const isMarkActive = (editor: EditorType, format: string): boolean => {
    const marks = Editor.marks(editor);
    return marks ? marks[format as keyof typeof marks] === true : false;
  };

  const toggleMark = (editor: EditorType, format: string) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

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
    <Slate editor={editor} value={initialValue}>
      <HoveringToolbar />
      <Editable
        spellCheck
        placeholder="Enter your notes here..."
        renderLeaf={EditorLeaf}
        renderElement={EditorElement}
        onKeyDown={(event) => {
          // Special Case
          if (isHotkey("mod?+backspace", event)) {
            onBackspace(editor, event);
          }
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS];
              toggleMark(editor, mark);
            }
          }
        }}
      />
    </Slate>
  );
};

export default EditorUI;
