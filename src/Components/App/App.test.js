import React from 'react';
import ReactDOM from 'react-dom';
import  { App, mapStateToProps } from './App';
import { shallow } from 'enzyme';

describe('App', () => {

  it('should match the snapshot', () => {
    const wrapper = shallow(<App user={{id:5}}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be able to map properties from state to props', () => {
   const state = {
     movies: [ { name: 'Jumanji' } ],
     user: { name: 'Robbie' }
   };

   const expected = {
     movies: [ { name: 'Jumanji' } ],
     user: { name: 'Robbie' }
   };

   expect(mapStateToProps(state)).toEqual(expected);
 })

});
