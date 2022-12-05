export * from "./context";

import type { HTMLAttributes } from "react";
import type { BaseEditor } from "slate";
import type { ReactEditor } from "slate-react";

export interface CustomElement {
  type:
    | "paragraph"
    | "heading"
    | "code"
    | "block-quote"
    | "list-item"
    | "bulleted-list"
    | "numbered-list"
    | "title"
    | "heading-two"
    | "align-left"
    | "align-center"
    | "align-right"
    | "align-justify";
  children: CustomText[];
  align?: HTMLAttributes<HTMLElement>[keyof HTMLAttributes<HTMLElement>];
}
export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
};
export type EditorType = BaseEditor & ReactEditor;

declare module "slate" {
  interface CustomTypes {
    Editor: EditorType;
    Element: CustomElement;
    Text: CustomText;
  }
}
