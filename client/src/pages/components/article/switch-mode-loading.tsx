import { hourglass } from "ldrs";

hourglass.register();

function SwitchModeLoading() {
    return (
        <section className="py-8">
            <div className="max-h-[768px] h-screen flex flex-col items-center justify-center space-y-6">
                <p className="animate-pulse -tracking-tighter text-xs">
                    Switching mode...
                </p>
                <l-hourglass
                    size="40"
                    bg-opacity="0.1"
                    speed="1.75"
                    color="#CE1C43"
                ></l-hourglass>
            </div>
        </section>
    );
}

export default SwitchModeLoading;
