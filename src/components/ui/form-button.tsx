import { ReactNode } from "react";
import { Button } from "./button";

type Props = {
    isLoading: boolean;
    icon: ReactNode;
    isValid: boolean;
    label: string;
    submittingLabel: string;
    onClick: () => void;
};

function FormButton({
    icon,
    isLoading,
    isValid,
    label,
    submittingLabel,
    onClick,
}: Props) {
    return (
        <Button
            onClick={onClick}
            className="w-full gap-2"
            size={"sm"}
            disabled={isLoading || !isValid}
        >
            {isLoading ? (
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
