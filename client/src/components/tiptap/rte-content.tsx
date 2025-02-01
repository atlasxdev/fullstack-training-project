import "reactjs-tiptap-editor/style.css";
import RichTextEditor, {
    BaseKit,
    Bold,
    BulletList,
    OrderedList,
    Heading,
    Italic,
    TextAlign,
    Underline,
    Highlight,
    Color,
} from "reactjs-tiptap-editor";
import { ControllerRenderProps } from "react-hook-form";

const extensions = [
    BaseKit,
    Heading,
    Italic,
    Bold,
    BulletList,
    OrderedList,
    TextAlign.configure({ types: ["heading", "paragraph"], spacer: true }),
    Color.configure({ spacer: true }),
    Underline,
    Highlight,
];

function RTEContent({
    value,
    onChange,
    ...props
}: ControllerRenderProps<
    {
        title: string;
        content: string;
    },
    "content"
>) {
    return (
        <div className="max-w-[420px] mx-auto md:max-w-[500px]">
            <RichTextEditor
                output="html"
                content={value}
                onChangeContent={onChange}
                extensions={extensions}
                {...props}
            />
        </div>
    );
}

export default RTEContent;
