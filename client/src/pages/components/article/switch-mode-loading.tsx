import { hourglass } from "ldrs";

hourglass.register();

function SwitchModeLoading() {
    return (
        <div className="max-h-[768px] h-screen flex flex-col items-center justify-center space-y-6">
            <p className="animate-pulse font-medium -tracking-tighter text-sm">
                Switching mode...
            </p>
            <l-hourglass
                size="50"
                bg-opacity="0.1"
                speed="1.75"
                color="#CE1C43"
            ></l-hourglass>
        </div>
    );
}

export default SwitchModeLoading;
