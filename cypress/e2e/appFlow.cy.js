describe("Basic Shopping Flow", () => {
  it("Opens home page, adds product to cart, adjusts quantity", () => {
    cy.visit("/");

    cy.get('[aria-label="Product grid"] article')
      .first()
      .within(() => {
        cy.get("a").first().click();
      });

    cy.url().should("include", "/product/");
    cy.get("button").contains("Add to Cart").click();

    cy.visit("/cart");

    cy.get('[aria-label^="Increase quantity"]').first().click();

    cy.get('[aria-label^="Decrease quantity"]').first().click();

    cy.get('[aria-label^="Cart item:"] span').first().should("contain", "1");
  });
});
