/// <reference types="cypress" />

describe("Filters for countries", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("should display 12 countries onload", () => {
    cy.get(".country-card").should("have.lengthOf", 12);
  });
  it("should display France when type fran", () => {
    cy.get("#input-filter-country").type("fran");
    cy.get(".country-card").should("have.lengthOf", 1);
    cy.get(".country-card").find("a").should("have.text", "France");
  });
  it("should display France when type france", () => {
    cy.get("#input-filter-country").type("france");
    cy.get(".country-card").should("have.lengthOf", 1);
    cy.get(".country-card").find("a").should("have.text", "France");
  });
  it("should display France when type FRANCE", () => {
    cy.get("#input-filter-country").type("FRANCE");
    cy.get(".country-card").should("have.lengthOf", 1);
    cy.get(".country-card").find("a").should("have.text", "France");
  });
  it("should display 7 cards when type fr", () => {
    cy.get("#input-filter-country").type("fr");
    cy.get(".country-card").should("have.lengthOf", 7);
  });
  it("should display special message when type wrong string", () => {
    cy.get("#input-filter-country").type("aefafar");
    cy.get(".country-card").should("have.lengthOf", 0);
    cy.get("#no-country-div").should("exist")
  });
  it("should display all countries when clear input search",()=>{
    cy.get("#input-filter-country").type("aefafar");
    cy.wait(1000)
    cy.get("#input-filter-country").clear();
    cy.get(".country-card").should("have.length", 12);
  })
  it("should filter by region",()=>{
    cy.get("select").select("Europe",{force:true});
    cy.wait(1000)
    cy.contains("Austria").should("exist");
  })
});
