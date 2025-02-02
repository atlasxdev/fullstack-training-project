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
    SlashCommand,
} from "reactjs-tiptap-editor";
import { ControllerRenderProps } from "react-hook-form";
import MaxWidthWrapper from "../max-width-wrapper";
import { useTheme } from "../theme-provider";

const extensions = [
    BaseKit.configure({
        characterCount: false,
    }),
    Heading,
    Italic,
    Bold,
    BulletList,
    OrderedList,
    TextAlign.configure({ types: ["heading", "paragraph"], spacer: true }),
    Color.configure({ spacer: true }),
    Underline,
    Highlight,
    SlashCommand,
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
    const { theme } = useTheme();

    return (
        <MaxWidthWrapper className="max-w-6xl !px-0 md:!px-0">
            <RichTextEditor
                output="html"
                content={value}
                onChangeContent={onChange}
                extensions={extensions}
                dark={theme == "dark" || theme == "system"}
                {...props}
            />
        </MaxWidthWrapper>
    );
}

export default RTEContent;
