describe('일기장 앱의 기본 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5174')
  })
  it('타이틀 유효성 테스트',() => {
    cy.title().should('eq','나의 일기장')
  })

  it('월 변경 작동 확인', () => {
    cy.get('.title').invoke('text').then(initialContent => {
      cy.get('[data-test=이전-달').click();
      cy.get('.title').should('not.have.text', initialContent)
    })
  })
  it('월 변경 작동 확인', () => {
    cy.get('.title').invoke('text').then(initialContent => {
      cy.get('[data-test=다음-달').click();
      cy.get('.title').should('not.have.text', initialContent)
    })
  })
  it('월 변경 작동 확인', () => {
    cy.get('.title').invoke('text').then(initialContent => {
      cy.get('[data-test=Today').click();
      cy.get('.title').should('have.text', initialContent)
    })
  })

})
