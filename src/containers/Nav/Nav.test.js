import React from 'react';
import ReactDOM from 'react-dom';
import { Nav, mapStateToProps, mapDispatchToProps } from './Nav';
import { shallow } from 'enzyme';
import { logoutUser } from '../../actions'
import { removeRatings } from '../../actions'

describe('Nav', () => {
  describe('Nav container/component', () => {
    it('should match the snapshot', () => {
      const wrapper = shallow(<Nav user={{id: 5}}/>);
      expect(wrapper).toMatchSnapshot();
    });

    // it('should fire off logoutUser and removeRatings when logout button is clicked ', () => {
    //   wrapper.instance().verifyInputs = jest.fn();
    //   wrapper.instance().forceUpdate()
    //   const mockEvent = {
    //     preventDefault: jest.fn()
    //   }
    //   wrapper.find('.login-btn').simulate('click', mockEvent)
    //   expect(wrapper.instance().verifyInputs).toHaveBeenCalled()
    // })


  });

  describe('mapStateToProps', () => {
    it('should return an object with a user', () => {
      const mockState = {
        movies: [ { name: 'Jumanji' } ],
        user: { name: 'Robbie', id: 5 },
        ratings: [{rating: 5}, {rating: 4}],
      };
      const expected = {
        user: { name: 'Robbie', id: 5 },
      }
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected)
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with the logoutUser action when the logout button is clicked', () => {
      const mockDispatch = jest.fn();
      const mockUser = { user: { name: 'Robbie', id: 5 } };
      const actionToDispatch = logoutUser(mockUser);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.logoutUser(mockUser)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('should call dispatch with the removeRatings action when the logout button is clicked', () => {
      const mockDispatch = jest.fn();
      const mockRatings = { ratings: [{rating: 5}, {rating: 4}] };
      const actionToDispatch = removeRatings(mockRatings);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.removeRatings(mockRatings)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
});
