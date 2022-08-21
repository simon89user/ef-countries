/// <reference types="cypress" />

describe("Countries List", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("display all countries on infinite scroll", () => {
    cy.scrollTo(0, 1000);
    cy.get(".country-card").should("have.length.at.least", 13);
  });
  it("display a country card", () => {
    cy.get(".details-wrapper").should("contain", "Population:");
    cy.get(".details-wrapper").should("contain", "Capital:");
    cy.get(".details-wrapper").should("contain", "Region:");
  });
});
