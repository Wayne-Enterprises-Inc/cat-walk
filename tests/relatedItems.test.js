const RelatedItems = require('./components/relatedItems');

test('makes sure product category is there', () => {
  expect(RelatedItems.(1, 2)).toBe(3);
});