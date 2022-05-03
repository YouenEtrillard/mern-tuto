/* eslint-disable no-undef */
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import GoalItem from './GoalItem';

const goals = [
  {
    createdAt: '2022-04-26',
    _id: 123,
    text: 'Goal description',
  },
  {
    createdAt: '2022-05-12',
    _id: 456,
    text: 'Second goal',
  },
];

describe('GoalItem', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <GoalItem goal={goals[0]} />
      </Provider>
    );
  });

  describe('on mounted', () => {
    it('should render date formatted to fr', () => {
      expect(screen.getByText('26 avril 2022')).toBeInTheDocument();
    });

    it('should render description', () => {
      expect(screen.getByText(goals[0].text)).toBeInTheDocument();
    });
  });

  it('should render form when edit button is clicked', () => {
    expect(screen.getByText(goals[0].text)).toBeTruthy();

    fireEvent.click(screen.getByText('Edit goal'));

    expect(screen.getByRole('textbox', { name: goals[0].text })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeTruthy();
    expect(
      screen.getByRole('button', { name: 'Undo and close edit' })
    ).toBeTruthy();
  });

  describe('when submitting changes', () => {
    beforeEach(() => {
      fireEvent.click(screen.getByText('Edit goal'));
      fireEvent.change(screen.getByRole('textbox', { name: goals[0].text }), {
        target: { value: 'Changed goal description' },
      });
      fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));
    });

    it('should update goal description', () => {
      expect(screen.getByText('Changed goal description')).toBeTruthy();
    });
  });

  describe('when cancel button is clicked', () => {
    beforeEach(() => {
      fireEvent.click(screen.getByText('Edit goal'));
      fireEvent.change(screen.getByRole('textbox', { name: goals[0].text }), {
        target: { value: 'Changed goal description' },
      });
      fireEvent.click(
        screen.getByRole('button', { name: 'Undo and close edit' })
      );
    });

    it('should hide form', () => {
      expect(screen.getByText(goals[0].text)).toBeTruthy();
    });

    it('should keep the initial goal description', () => {
      expect(screen.getByText(goals[0].text)).toBeTruthy();
    });
  });

  it('should delete goal when clicking on delete button', () => {
    fireEvent.click(screen.getByText(/Delete goal/i));
    console.log(goals);
    expect(screen.getByText(goals[0].text)).toBeFalsy();
  });
});
