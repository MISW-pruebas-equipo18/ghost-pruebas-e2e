


describe('Image Comparison', () => {
    it('should compare images and save the difference', () => {
      // Load your images
      const image1Path = './cypress/e2e/screenshots/actual.png'
      console.log(image1Path)
      const image2Path = './cypress/e2e/screenshots/baseline.png'
  
      // Perform the image comparison using resemble.js
      cy.task('compareImages', { image1Path, image2Path }).then(diffImageDataURL => {
        // Save the difference image using cy.writeFile
        cy.writeFile('./cypress/e2e/screenshots/diff_image.png', diffImageDataURL, 'base64');
      });
    });
  });