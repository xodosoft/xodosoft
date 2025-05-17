"use client"

import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Superscript from "@tiptap/extension-superscript"
import SubScript from "@tiptap/extension-subscript"
import TextAlign from "@tiptap/extension-text-align"
import Heading from "@tiptap/extension-heading"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedList from "@tiptap/extension-ordered-list"
import ListItem from "@tiptap/extension-list-item"
import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"
import {
    Bold,
    Italic,
    UnderlineIcon,
    Strikethrough,
    List,
    ListOrdered,
    Heading2,
    Heading3,
    Undo,
    Redo,
    SuperscriptIcon,
    Subscript,
    AlignLeft,
    AlignCenter,
    AlignRight,
} from "lucide-react"

interface TipTapEditorProps {
    content: string
    onChange: (content: string) => void
}

const TipTapEditor = ({ content, onChange }: TipTapEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: false,
                bulletList: false,
                orderedList: false,
                listItem: false,
            }),
            Heading.configure({
                levels: [1, 2, 3, 4, 5, 6],
            }),
            BulletList.configure({
                HTMLAttributes: {
                    class: "list-disc pl-4",
                },
            }),
            OrderedList.configure({
                HTMLAttributes: {
                    class: "list-decimal pl-4",
                },
            }),
            ListItem,
            Underline,
            Superscript,
            SubScript,
            TextAlign.configure({
                types: ["heading", "paragraph"],
                alignments: ["left", "center", "right"],
                defaultAlignment: "left",
            }),
        ],
        editorProps: {
            attributes: {
                class: "prose prose-sm max-w-none focus:outline-none",
            },
        },
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    if (!editor) {
        return null
    }

    return (
        <div className="rounded-lg border bg-card">
            <div className="flex flex-wrap gap-1 border-b bg-white p-1">
                <div className="flex gap-1">
                    <Toggle
                        size="sm"
                        pressed={editor.isActive("bold")}
                        onPressedChange={() => editor.chain().focus().toggleBold().run()}
                    >
                        <Bold className="h-4 w-4" />
                    </Toggle>
                    <Toggle
                        size="sm"
                        pressed={editor.isActive("italic")}
                        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                    >
                        <Italic className="h-4 w-4" />
                    </Toggle>
                    <Toggle
                        size="sm"
                        pressed={editor.isActive("underline")}
                        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
                    >
                        <UnderlineIcon className="h-4 w-4" />
                    </Toggle>
                    <Toggle
                        size="sm"
                        pressed={editor.isActive("strike")}
                        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
                    >
                        <Strikethrough className="h-4 w-4" />
                    </Toggle>
                </div>

                <div className="flex gap-1">
                    <Toggle
                        size="sm"
                        pressed={editor.isActive("heading", { level: 2 })}
                        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    >
                        <Heading2 className="h-4 w-4" />
                    </Toggle>
                    <Toggle
                        size="sm"
                        pressed={editor.isActive("heading", { level: 3 })}
                        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    >
                        <Heading3 className="h-4 w-4" />
                    </Toggle>
                </div>

                <div className="flex gap-1">
                    <Toggle
                        size="sm"
                        pressed={editor.isActive("bulletList")}
                        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                    >
                        <List className="h-4 w-4" />
                    </Toggle>
                    <Toggle
                        size="sm"
                        pressed={editor.isActive("orderedList")}
                        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                    >
                        <ListOrdered className="h-4 w-4" />
                    </Toggle>
                </div>

                <div className="flex gap-1">
                    <Toggle
                        size="sm"
                        pressed={editor.isActive("superscript")}
                        onPressedChange={() => editor.chain().focus().toggleSuperscript().run()}
                    >
                        <SuperscriptIcon className="h-4 w-4" />
                    </Toggle>
                    <Toggle
                        size="sm"
                        pressed={editor.isActive("subscript")}
                        onPressedChange={() => editor.chain().focus().toggleSubscript().run()}
                    >
                        <Subscript className="h-4 w-4" />
                    </Toggle>
                </div>

                <div className="flex gap-1">
                    <Toggle
                        size="sm"
                        pressed={editor.isActive({ textAlign: "left" })}
                        onPressedChange={() => editor.chain().focus().setTextAlign("left").run()}
                    >
                        <AlignLeft className="h-4 w-4" />
                    </Toggle>
                    <Toggle
                        size="sm"
                        pressed={editor.isActive({ textAlign: "center" })}
                        onPressedChange={() => editor.chain().focus().setTextAlign("center").run()}
                    >
                        <AlignCenter className="h-4 w-4" />
                    </Toggle>
                    <Toggle
                        size="sm"
                        pressed={editor.isActive({ textAlign: "right" })}
                        onPressedChange={() => editor.chain().focus().setTextAlign("right").run()}
                    >
                        <AlignRight className="h-4 w-4" />
                    </Toggle>
                </div>

                <div className="flex gap-1">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                    >
                        <Undo className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                    >
                        <Redo className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="min-h-[150px] p-3">
                <EditorContent editor={editor} className="prose prose-sm w-full" />
            </div>
        </div>
    )
}

export default TipTapEditor

