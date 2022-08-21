/// <reference types="cypress" />

describe("Navigation", () => {
  it("should go to a page and go back", () => {
    cy.visit("http://localhost:3000");
    cy.get(".details-wrapper").first().find("a").click();
    cy.wait(1000);
    cy.url().should("include", "countries/");

    cy.get(".navigation-button").click();
    cy.url().should("eq", "http://localhost:3000/");
  });
  it("should go to Home when click on logo", () => {
    cy.visit("http://localhost:3000/countries/fra");
    cy.get(".navbar-brand").click();
    cy.url().should("eq", "http://localhost:3000/");
  });
  it("should navigate from one country page to border country", () => {
    cy.visit("http://localhost:3000/countries/fra");
    cy.contains("Belgium").click();
    cy.url().should("eq", "http://localhost:3000/countries/bel");
  });
});
