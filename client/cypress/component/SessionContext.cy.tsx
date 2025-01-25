import "../../src/output.css";
import App from "@/App";
import { SessionProvider } from "@/context/SessionContext";
import { Session } from "@supabase/supabase-js";

const session: Session = {
    access_token: "",
    expires_in: 0,
    refresh_token: "",
    token_type: "",
    user: {
        app_metadata: {},
        aud: "",
        created_at: "",
        id: "",
        user_metadata: {},
    },
};

describe("SessionProvider with no Session (User)", () => {
    beforeEach(() => {
        cy.mount(
            <SessionProvider initialSession={null}>
                <App />
            </SessionProvider>
        );
        cy.contains("Go back").click();
    });

    it("should render the entry page", () => {
        cy.contains("Manage");
    });
});

describe("SessionProvider with Session (User)", () => {
    beforeEach(() => {
        cy.mount(
            <SessionProvider
                initialSession={{
                    ...session,
                }}
            >
                <App />
            </SessionProvider>
        );
    });

    it("should render the home page", () => {
        cy.contains("Logout");
    });
});
