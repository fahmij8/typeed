"use client";

import React, { useState, useMemo } from "react";
import { createEditor, Editor, Transforms, Range } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import type { KeyboardEvent } from "react";
import type { Descendant } from "slate";
import isHotkey from "is-hotkey";

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "Example great note" }],
  },
];

const EditorUI = () => {
  const [value, setValue] = useState(initialValue);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const onBackspace = (event: KeyboardEvent<HTMLDivElement>) => {
    const editor_selection = editor.selection;
    if (!editor_selection) {
      return;
    }

    const [, first_element_path] = Editor.first(editor, [0]);
    const [, last_element_path] = Editor.last(editor, [
      editor.children.length - 1,
    ]);

    const full_range = Editor.range(
      editor,
      first_element_path,
      last_element_path
    );

    const is_everything_selected = Range.equals(editor_selection, full_range);

    if (is_everything_selected) {
      event.preventDefault();

      Transforms.removeNodes(editor, { mode: "highest", hanging: true });

      if (editor.children.length === 0) {
        Transforms.insertNodes(editor, {
          type: "paragraph",
          children: [{ text: "" }],
        });
      }

      return;
    }
  };

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => {
        setValue(value);
      }}
    >
      <Editable
        placeholder="Enter some plain text..."
        onKeyDown={(event) => {
          if (isHotkey("mod?+backspace", event)) {
            onBackspace(event);
          }
        }}
      />
    </Slate>
  );
};

export default EditorUI;
