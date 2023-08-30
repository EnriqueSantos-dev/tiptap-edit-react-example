import { EditorContent, EditorOptions, useEditor } from "@tiptap/react";
import { TipTapProvider } from "./provider";
import React from "react";

type TipTapProps = Partial<EditorOptions> & {
  limitCharacters?: number;
  placeholder?: string;
  children: React.ReactNode;
};

export function TipTapV2({ children, limitCharacters, ...props }: TipTapProps) {
  const editor = useEditor({
    ...props,
    editorProps: {
      attributes: {
        class: "prose-sm prose-neutral md:prose-base",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="max-w-xl w-full rounded-lg border shadow-md border-zinc-300 text-zinc-900">
      <TipTapProvider value={{ editor }}>{children && children}</TipTapProvider>

      <div className="px-2 py-4 grid min-h-[150px]">
        <EditorContent
          editor={editor!}
          className="rounded border border-zinc-300 py-2 px-4"
        />

        {limitCharacters && (
          <div className="text-zinc-500 text-xs pt-2">
            {editor.storage.characterCount.characters()}/{limitCharacters}{" "}
            carácteres
            <br />
            {editor.storage.characterCount.words()} palavras
          </div>
        )}
      </div>
    </div>
  );
}
