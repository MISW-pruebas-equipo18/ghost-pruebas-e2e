import { registerCommands } from '../support/commands'

registerCommands()

let url = Cypress.env('base_url')

describe('Regression Test', () => {
    cy.on('uncaught:exception', (err, runnable) => {
        return false
    })
    it('Should compare screenshots using Resemble.js', () => {
      cy.visit(url); // Replace with your application URL
  
      // Take a screenshot
      cy.screenshot('baseline');
  
      // Add a delay if needed to una llamadaallow dynamic content to load
      // cy.wait(2000);
  
      // Take another screenshot
      cy.screenshot('actual');
  
      // Compare screenshots using Resemble.js
      cy.taskresemble('resemble', {
        baseline: 'screenshots/baseline.png',
        actual: 'screenshots/actual.png',
        diff: 'screenshots/diff.png',
      }).then((result) => {
        // Assert that the images are similar
        expect(result.isSameDimensions).to.be.true;
        expect(result.rawMisMatchPercentage).to.equal('0.00');
      });
    });
  });




  