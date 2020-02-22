import React from 'react';
import ReactDOM from 'react-dom';
import { MoviesContainer, mapStateToProps, mapDispatchToProps } from './MoviesContainer';
import { shallow } from 'enzyme';
import { addMoviesToStore } from '../../actions'
import { addSelectedMovieToStore } from '../../actions'

describe('MoviesContainer', () => {
  describe('MoviesContainer container/component', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<MoviesContainer movies={[{title: 'Frozen II', id: 30}]} user={{name:'Robbie', id: 7}}/>);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('mapStateToProps', () => {

  });

  describe('mapDispatchToProps', () => {

  })
});
