import { Editor } from "@tiptap/react";
import { ReactNode, createContext, useContext, useState } from "react";

type TipTapContextType = {
  editor: Editor | null;
  forceMount: () => void;
};

const TipTapContext = createContext<TipTapContextType | undefined>(undefined);

export function TipTapProvider({
  children,
  value,
}: {
  value: { editor: Editor | null };
  children: ReactNode;
}) {
  const [editor, setEditor] = useState<Editor | null>(value.editor);

  const forceMount = () => {
    // This function should force a re-render when called.
    setEditor((prevEditor) => prevEditor); // You can use any valid update here.
  };

  return (
    <TipTapContext.Provider value={{ editor, forceMount }}>
      {children}
    </TipTapContext.Provider>
  );
}

export const useTipTap = () => {
  const context = useContext(TipTapContext);

  if (context === undefined) {
    throw new Error("useTipTap must be used within a TipTapProvider");
  }

  return context;
};
