describe("Pizza Siparişi E2E Testleri", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/siparis");
  });

  it("İsim ve soyisim girme testi", () => {
    cy.get('input[name="isimSoyisim"]').type("Mehmet Yılmaz");
    cy.get('input[name="isimSoyisim"]').should("have.value", "Mehmet Yılmaz");
  });

  it("En az 4 malzeme seçme testi", () => {
    cy.get('input[name="malzemeler"]').eq(0).check();
    cy.get('input[name="malzemeler"]').eq(1).check();
    cy.get('input[name="malzemeler"]').eq(2).check();
    cy.get('input[name="malzemeler"]').eq(3).check();
    
    cy.get('input[name="malzemeler"]:checked').should("have.length.at.least", 4);
  });

  it("Boyut ve hamur seçme testi", () => {
    cy.get('input[name="boyut"][value="Orta"]').check();
    cy.get('select[name="hamur"]').select("Orta");

    cy.get('input[name="boyut"][value="Orta"]').should("be.checked");
    cy.get('select[name="hamur"]').should("have.value", "Orta");
  });

  it("Sipariş notu girme testi", () => {
    cy.get('input[name="siparisNotu"]').type("Ekstra peynir olsun.");
    cy.get('input[name="siparisNotu"]').should("have.value", "Ekstra peynir olsun.");
  });

  it("Sipariş gönderme testi", () => {
    cy.get('input[name="isimSoyisim"]').type("Mehmet Yılmaz");
    cy.get('input[name="boyut"][value="Büyük"]').check();
    cy.get('select[name="hamur"]').select("İnce");
    
    cy.get('input[name="malzemeler"]').eq(0).check();
    cy.get('input[name="malzemeler"]').eq(1).check();
    cy.get('input[name="malzemeler"]').eq(2).check();
    cy.get('input[name="malzemeler"]').eq(3).check();

    cy.get('input[name="siparisNotu"]').type("Ekstra acı olsun.");

    cy.get('.order-submit-button').click();
    
    cy.url().should("include", "/Onay");
  });
});
