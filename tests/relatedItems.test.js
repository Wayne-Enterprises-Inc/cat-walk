import React from 'react';
import ReactDom from 'react-dom';

const RelatedItems = require('./components/relatedItems.jsx');

test('makes sure product category is there', () => {
  expect(RelatedItems(1, 2)).toBe(3);
});