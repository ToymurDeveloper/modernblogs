"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link2,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Highlighter,
} from "lucide-react";
import { useCallback, useEffect } from "react";

const MenuBar = ({ editor }) => {
  const addImage = useCallback(() => {
    if (!editor) return;

    const url = window.prompt("Enter image URL:");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border-b border-gray-300 p-2 flex flex-wrap gap-1 bg-gray-50">
      {/* Text Formatting */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("bold") ? "bg-gray-300" : ""
        }`}
        title="Bold"
      >
        <Bold size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("italic") ? "bg-gray-300" : ""
        }`}
        title="Italic"
      >
        <Italic size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("underline") ? "bg-gray-300" : ""
        }`}
        title="Underline"
      >
        <UnderlineIcon size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("strike") ? "bg-gray-300" : ""
        }`}
        title="Strikethrough"
      >
        <Strikethrough size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("highlight") ? "bg-gray-300" : ""
        }`}
        title="Highlight"
      >
        <Highlighter size={18} />
      </button>

      <div className="w-px h-8 bg-gray-300 mx-1"></div>

      {/* Headings */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("heading", { level: 1 }) ? "bg-gray-300" : ""
        }`}
        title="Heading 1"
      >
        <Heading1 size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("heading", { level: 2 }) ? "bg-gray-300" : ""
        }`}
        title="Heading 2"
      >
        <Heading2 size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("heading", { level: 3 }) ? "bg-gray-300" : ""
        }`}
        title="Heading 3"
      >
        <Heading3 size={18} />
      </button>

      <div className="w-px h-8 bg-gray-300 mx-1"></div>

      {/* Lists */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("bulletList") ? "bg-gray-300" : ""
        }`}
        title="Bullet List"
      >
        <List size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("orderedList") ? "bg-gray-300" : ""
        }`}
        title="Ordered List"
      >
        <ListOrdered size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("blockquote") ? "bg-gray-300" : ""
        }`}
        title="Blockquote"
      >
        <Quote size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("code") ? "bg-gray-300" : ""
        }`}
        title="Inline Code"
      >
        <Code size={18} />
      </button>

      <div className="w-px h-8 bg-gray-300 mx-1"></div>

      {/* Alignment */}
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: "left" }) ? "bg-gray-300" : ""
        }`}
        title="Align Left"
      >
        <AlignLeft size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: "center" }) ? "bg-gray-300" : ""
        }`}
        title="Align Center"
      >
        <AlignCenter size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: "right" }) ? "bg-gray-300" : ""
        }`}
        title="Align Right"
      >
        <AlignRight size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: "justify" }) ? "bg-gray-300" : ""
        }`}
        title="Justify"
      >
        <AlignJustify size={18} />
      </button>

      <div className="w-px h-8 bg-gray-300 mx-1"></div>

      {/* Media */}
      <button
        type="button"
        onClick={setLink}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("link") ? "bg-gray-300" : ""
        }`}
        title="Add Link"
      >
        <Link2 size={18} />
      </button>

      <button
        type="button"
        onClick={addImage}
        className="p-2 rounded hover:bg-gray-200"
        title="Add Image"
      >
        <ImageIcon size={18} />
      </button>

      <div className="w-px h-8 bg-gray-300 mx-1"></div>

      {/* Undo/Redo */}
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
        title="Undo"
      >
        <Undo size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
        title="Redo"
      >
        <Redo size={18} />
      </button>
    </div>
  );
};

const TiptapEditor = ({ content, onChange, disabled = false }) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        underline: false,
        link: false,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-indigo-600 underline",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      TextStyle,
      Color,
      Placeholder.configure({
        placeholder: "Enter your content here...",
      }),
    ],
    content: content,
    editable: !disabled,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none min-h-[300px] p-4",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  useEffect(() => {
    if (editor && !disabled) {
      editor.setEditable(true);
    } else if (editor && disabled) {
      editor.setEditable(false);
    }
  }, [disabled, editor]);

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
