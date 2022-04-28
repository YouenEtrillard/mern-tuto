/* eslint-disable no-undef */
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import GoalItem from './GoalItem';

const goal = {
  createdAt: '2022-04-26',
  _id: 123,
  text: 'Goal description',
};

describe('GoalItem', () => {
  describe('on mounted', () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <GoalItem goal={goal} />
        </Provider>
      );
    });

    it('should render date formatted to fr', () => {
      expect(screen.getByText('26 avril 2022')).toBeInTheDocument();
    });

    it('should render description', () => {
      expect(screen.getByText('Goal description')).toBeInTheDocument();
    });

    it('should render form when edit button is clicked', () => {
      expect(screen.getByText('Goal description')).toBeTruthy();

      fireEvent.click(screen.getByText('edit goal'));

      expect(
        screen.getByRole('textbox', { name: 'Goal description' })
      ).toBeTruthy();
      expect(screen.getByRole('button', { name: 'Confirm' })).toBeTruthy();
      expect(
        screen.getByRole('button', { name: 'Undo and close edit' })
      ).toBeTruthy();
    });

    it('should hide form when cancel button is clicked', () => {
      fireEvent.click(screen.getByText('edit goal'));

      expect(
        screen.getByRole('button', { name: 'Undo and close edit' })
      ).toBeTruthy();

      fireEvent.click(
        screen.getByRole('button', { name: 'Undo and close edit' })
      );

      expect(screen.getByText('Goal description')).toBeTruthy();
    });
  });
});
