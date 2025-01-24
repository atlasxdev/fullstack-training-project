import { ReactNode } from "react";
import { Button } from "./button";

type Props = {
    isSubmitting: boolean;
    icon?: ReactNode;
    isValid: boolean;
    label: string;
    submittingLabel: string;
    size: "sm" | "lg" | "default";
};

function FormButton({
    icon,
    isSubmitting,
    isValid,
    label,
    size = "default",
    submittingLabel,
}: Props) {
    return (
        <Button
            type="submit"
            className="w-full gap-2"
            size={size}
            disabled={isSubmitting || !isValid}
        >
            {isSubmitting ? (
                <>
                    {submittingLabel}
                    {
                        <l-dot-pulse
                            size="15"
                            speed="2"
                            color="#FFF"
                        ></l-dot-pulse>
                    }
                </>
            ) : (
                <>
                    {label}
                    {icon}
                </>
            )}
        </Button>
    );
}

export default FormButton;
