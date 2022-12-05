"use client";

import type { SheetRef } from "react-modal-sheet";
import Sheet from "react-modal-sheet";
import { useTypeedContext } from "@/lib/context";
import { useRef } from "react";

export default function BottomSheetUI() {
  const ref = useRef<SheetRef>(null);
  const { bottomSheet, dispatch } = useTypeedContext();
  const onClose = () => dispatch({ type: "CLOSE_BOTTOM_SHEET" });
  const snapPoints = window.screen.width > 768 ? [400, 200] : [1, 0.9];

  return (
    <>
      <Sheet
        ref={ref}
        isOpen={bottomSheet.visible}
        onClose={onClose}
        snapPoints={snapPoints}
        initialSnap={1}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content style={{ paddingBottom: ref?.current?.y || 0 }}>
            <div className="h-full flex flex-col p-4 pt-0 overflow-scroll text-slate-700">
              {bottomSheet.content}
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={onClose} />
      </Sheet>
    </>
  );
}
