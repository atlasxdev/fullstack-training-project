import { ControllerRenderProps } from "react-hook-form";
import RichTextEditor, {
    BaseKit,
    Bold,
    BulletList,
    Color,
    FontSize,
    Heading,
    Highlight,
    History,
    Italic,
    Link,
    OrderedList,
    SearchAndReplace,
    SlashCommand,
    Strike,
    TextAlign,
    Underline,
} from "reactjs-tiptap-editor";
import "reactjs-tiptap-editor/style.css";
import MaxWidthWrapper from "../max-width-wrapper";
import { useTheme } from "../theme-provider";

const extensions = [
    BaseKit.configure({
        multiColumn: true,
        placeholder: {
            showOnlyCurrent: true,
        },
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
    Strike,
    Link,
    SearchAndReplace,
    History,
    FontSize,
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
        <MaxWidthWrapper className="max-w-[380px] sm:max-w-[500px] md:max-w-6xl !px-0 md:!px-0">
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
