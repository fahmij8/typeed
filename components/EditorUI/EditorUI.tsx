"use client";

import React, { useMemo, useCallback } from "react";
import { createEditor, Editor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import withLayout from "./withLayout";
import isHotkey from "is-hotkey";
import RenderLeaf from "./RenderLeaf";
import RenderElement from "./RenderElement";
import HoveringToolbar from "./HoveringToolbar";
import { onBackspace, HOTKEYS } from "./keyboardEvents";
import type { CustomElement, EditorType } from "@/lib/types";

const initialValue: CustomElement[] = [
  {
    type: "title",
    children: [
      {
        text: "Welcome to Typeed! 👋 ",
        bold: true,
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Typeed is your go to web app to save your quick notes without pulling up your native notepad app 🤣.",
      },
    ],
  },

  {
    type: "paragraph",
    children: [
      {
        text: "It comes with ",
      },
      {
        text: "a fancy formatting menu ",
        bold: true,
      },
      {
        text: "by selecting the text you want to format. You can also use the ",
      },
      {
        text: "keyboard shortcuts",
        italic: true,
        underline: true,
      },
      {
        text: " to format your text. Lastly, no need to worry about saving your notes, Typeed will automatically save your notes as you type. ",
      },
      {
        text: "Enjoy! and start with deleting all of this text 😂",
      },
    ],
  },
];

const EditorUI = () => {
  const editor = useMemo(
    () => withLayout(withHistory(withReact(createEditor()))),
    []
  );

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
    <Slate
      editor={editor}
      value={initialValue}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => "set_selection" !== op.type
        );
        if (isAstChange) {
          // Save the value to Local Storage.
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
