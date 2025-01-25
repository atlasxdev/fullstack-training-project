describe("404 Page", () => {
    it("renders 404 page when the user searches a random URL", () => {
        cy.visit("http://localhost:5173/123");
        cy.get("h1").should("contain", "404");
    });
});

describe("404 and Entry Page Navigation", () => {
    it("renders 404 page and navigates back to the entry page", () => {
        cy.visit("http://localhost:5173/123");
        cy.get("h1").should("contain", "404");

        cy.contains("Go back").click();

        cy.contains("Manage");
    });
});
