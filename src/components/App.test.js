//import { TestScheduler } from '@jest/core';
//import { hasUncaughtExceptionCaptureCallback } from 'node:process';
import React from 'react';
import ReactDom from 'react-dom';
import 'babel-polyfill';

import { getQueriesForElement } from '@testing-library/dom';
import { render, fireEvent, cleanup, wait } from '@testing-library/react';

import mockAxios from 'Axios';

import renderer from 'react-test-renderer'

import App from './App.jsx';

afterEach(cleanup);

test("renders the App", () => {
  //renders component to Dom
  //This will be done for almost every test.
  const root = document.createElement('div');
  const { getByText, getByLabelText, getById } = render(<App />)

  // const { getByText, getByLabelText } = getQueriesForElement(root);

  expect(getByText('Clothing Inc.')).not.toBeNull();
  //these two are equivalent test
  getByText('Clothing Inc.')
  getByText('Related Items')
  getByText('RATINGS & REVIEWS')


  //expect(getByText('$')).not.toBeNull();

  // this method is improved upon by the getQueriesForElement
  //expect(root.querySelector('p').textContent).toBe('Clothing Inc.')
})

it('matches snapshot', () => {
  const tree = renderer.create(<App />).toJSON();

  expect(tree).toMatchSnapshot();
})

test("should print product name", async () => {

mockAxios.get(() => {
  Promise.resolve({
    data: {
      campus: "hr-rfe",
      category: "Jackets",
      created_at: "2021-02-23T19:24:34.450Z",
      default_price: "140.00",
      description: "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
      id: 19089,
      name: "Camo Onesie",
      slogan: "Blend in to your crowd"
    }
  })
})


  const { getByText, getByLabelText } = render(<App />)

  // const arrow = document.querySelector('#arrow')
  // console.log('arrow: ', arrow)

  await wait(()=> getByText('Camo Onesie'))

  //expect(getByText('Camo Onesie')).not.toBeNull();
  //getById('arrow');

})