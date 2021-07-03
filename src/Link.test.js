// Link.test.js
import React from 'react';
import TestRenderer from 'react-test-renderer';
import Link from './Link';

//test('Link changes the class when hovered', () => {
  const component = TestRenderer.create(
    <Link page="http://www.facebook.com">Facebook</Link>,
  );
  //console.log(component.toJSON());
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
//});