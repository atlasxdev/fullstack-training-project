import Welcome from "@/pages/components/index/Welcome";
import Footer from "@/pages/components/index/Footer";

function Index() {
    return (
        <section className="flex flex-col h-screen">
            <Welcome />
            <Footer />
        </section>
    );
}

export default Index;
