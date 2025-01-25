describe("Render 404 page", () => {
    it("should render the 404 when the user searches a random URL", () => {
        cy.visit("http://localhost:5173/123");
        cy.get("h1").should("contain", "404");
    });
});

describe("Render the entry page", () => {
    it("should render the 404 first then render the entry page when Go back is clicked", () => {
        cy.visit("http://localhost:5173/123");
        cy.get("h1").should("contain", "404");

        cy.contains("Go back").click();

        cy.contains("Manage");
    });
});
