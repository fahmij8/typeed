export * from "./context";

import type { BaseEditor } from "slate";
import type { ReactEditor } from "slate-react";

export type CustomElement = {
  type: "paragraph" | "title";
  children: CustomText[];
};
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
