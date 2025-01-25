// cypress/support/mocks.ts
export const mockSupabase = {
    auth: {
        onAuthStateChange: cy.stub().returns({
            data: {
                subscription: {
                    unsubscribe: cy.stub(),
                },
            },
        }),
    },
};
