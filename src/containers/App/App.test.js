import React from 'react';
import ReactDOM from 'react-dom';
import  { App, mapStateToProps } from './App';
import { shallow } from 'enzyme';

describe('App', () => {
  describe('App container/component', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<App user={{id:5}}/>);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('mapStateToProps', () => {
    it('should return an object with a user and an array of movies', () => {
      const mockState = {
        movies: [ { name: 'Jumanji' } ],
        user: { name: 'Robbie' },
        ratings: [{rating: 5}, {rating: 4}],
      };
      const expected = {
        movies: [ { name: 'Jumanji' } ],
        user: { name: 'Robbie' },
      }
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected)
    });
  });
});
