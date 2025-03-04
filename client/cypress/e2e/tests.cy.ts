describe("404 Page", () => {
    it("renders 404 page when the user searches a random URL", () => {
        cy.visit("/123");
        cy.get("h1").should("contain", "404");
    });
});

describe("404 and Entry Page Navigation", () => {
    it("renders 404 page and navigates back to the entry page", () => {
        cy.visit("/123");
        cy.get("h1").should("contain", "404");

        cy.contains("Go back").click();

        cy.url().should("eq", Cypress.config("baseUrl") + "/");
    });
});

describe("Signin page email validation", () => {
    it("renders Signin page and validate email", () => {
        cy.visit("/sign-in");
        cy.get("input").type("test@.com");

        cy.contains("Invalid email");
    });
});

describe("Signup page input validation", () => {
    it("renders Signup page and validate fields", () => {
        cy.visit("/sign-up");

        cy.get('[data-test="username"]').type("test");
        cy.contains("Username must contain at least 5 character(s)");

        cy.get('[data-test="email"]').type("test@.com");
        cy.contains("Invalid email");

        cy.get('[data-test="password"]').type("test");
        cy.contains("Password must contain at least 8 character(s)");
    });
});

describe("Signup page user email taken", () => {
    it("renders Signup page and checks if email is already taken", () => {
        cy.visit("/sign-up");
        cy.get('[data-test="username"]').type("test12");
        cy.get('[data-test="email"]').type("atlasxdev@gmail.com");
        cy.get('[data-test="password"]').type("test123123");

        cy.get("button").contains("Continue").click();
        cy.contains("Email is already taken!");
    });
});

describe("Signup page username taken", () => {
    it("renders Signup page and checks if username is already taken", () => {
        cy.visit("/sign-up");
        cy.get('[data-test="username"]').type("mor_23145");
        cy.get('[data-test="email"]').type("ace123@gmail.com");
        cy.get('[data-test="password"]').type("test123123");

        cy.get("button").contains("Continue").click();
        cy.contains("Username is already taken!");
    });
});
