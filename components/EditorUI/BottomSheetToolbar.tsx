import { useTypeedContext } from "@/lib/context";
import type { EditorType } from "@/lib/types";
import type { MouseEvent } from "react";
import {
  MdFormatAlignCenter,
  MdFormatAlignLeft,
  MdFormatAlignRight,
  MdFormatQuote,
  MdFormatListNumbered,
  MdFormatListBulleted,
  MdLooksTwo,
  MdFormatClear,
} from "react-icons/md";
import { toggleBlock } from "./utilities";

export default function BottomSheetToolbar({ editor }: { editor: EditorType }) {
  const { dispatch } = useTypeedContext();

  const toolbarItems = [
    {
      icon: MdFormatAlignLeft,
      text: "Align Left",
      clickEvent: () => toggleBlock(editor, "left"),
    },
    {
      icon: MdFormatAlignCenter,
      text: "Align Center",
      clickEvent: () => toggleBlock(editor, "center"),
    },
    {
      icon: MdFormatAlignRight,
      text: "Align Right",
      clickEvent: () => toggleBlock(editor, "right"),
    },
    {
      icon: MdFormatQuote,
      text: "Quote",
      clickEvent: () => toggleBlock(editor, "block-quote"),
    },
    {
      icon: MdFormatListNumbered,
      text: "Numbered List",
      clickEvent: () => toggleBlock(editor, "numbered-list"),
    },
    {
      icon: MdFormatListBulleted,
      text: "Bulleted List",
      clickEvent: () => toggleBlock(editor, "bulleted-list"),
    },
    {
      icon: MdLooksTwo,
      text: "Heading 2",
      clickEvent: () => toggleBlock(editor, "heading-two"),
    },
    {
      icon: MdFormatClear,
      text: "Clear Formatting",
      clickEvent: () => toggleBlock(editor, "paragraph"),
    },
  ];

  return (
    <>
      <div className="grid">
        {toolbarItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.text}
              className="grid grid-flow-col gap-4 mb-3 pb-3 border-b-[1px] border-gray-100"
              onClick={(event: MouseEvent) => {
                event.preventDefault();
                item.clickEvent();
                dispatch({ type: "CLOSE_BOTTOM_SHEET" });
              }}
            >
              <div className="col-span-1 place-self-center">
                <Icon className="text-3xl" />
              </div>
              <div className="col-span-12 my-auto">
                <p className="text-md">{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
