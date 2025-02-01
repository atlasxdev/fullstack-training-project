import Welcome from "@/pages/Welcome";
import Footer from "@/components/footer";

function Index() {
    return (
        <section className="flex flex-col h-screen">
            <Welcome />
            <Footer />
        </section>
    );
}

export default Index;
