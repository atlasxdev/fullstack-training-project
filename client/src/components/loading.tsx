import { dotPulse } from "ldrs";

dotPulse.register();

function Loading() {
    return (
        <div className="h-screen flex items-center justify-center">
            <l-dot-pulse size="65" speed="2" color="#E11D48"></l-dot-pulse>
        </div>
    );
}

export default Loading;
