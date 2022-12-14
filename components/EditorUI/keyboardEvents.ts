import { Editor, Transforms, Range } from "slate";
import type { KeyboardEvent } from "react";
import type { EditorType } from "@/lib/types";

const onBackspace = (
  editor: EditorType,
  event: KeyboardEvent<HTMLDivElement>
) => {
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

const onEnter = (editor: EditorType, event: KeyboardEvent<HTMLDivElement>) => {
  event.preventDefault();
  editor.insertText("\n");
  Transforms.move(editor, { distance: 0, unit: "offset" });
};

export const HOTKEYS = {
  "mod+b": {
    type: "mark",
    mark: "bold",
  },
  "mod+i": {
    type: "mark",
    mark: "italic",
  },
  "mod+u": {
    type: "mark",
    mark: "underline",
  },
  "mod+shift?+`": {
    type: "mark",
    mark: "code",
  },
  "mod?+backspace": {
    type: "special",
    mark: onBackspace,
  },
  "shift+enter": {
    type: "special",
    mark: onEnter,
  },
};
