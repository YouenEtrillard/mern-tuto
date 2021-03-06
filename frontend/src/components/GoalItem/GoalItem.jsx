import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteGoal, editGoal } from '../../features/goals/goalSlice';
import { FaEdit, FaCheck, FaUndoAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';

function GoalItem({ goal }) {
  const dispatch = useDispatch();
  const [text, setText] = useState(goal.text);
  const [prevText, setPrevText] = useState(goal.text);
  const [isBeingEdited, setEdit] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(editGoal({ id: goal._id, text }));
    setPrevText(text);
    setEdit(false);
  };

  return (
    <li className="goal">
      <p>
        {new Date(goal.createdAt).toLocaleString('fr-FR', {
          dateStyle: 'long',
        })}
      </p>
      {isBeingEdited ? (
        <form onSubmit={onSubmit} action="">
          <label htmlFor="text">
            Goal description
            <input
              type="text"
              name="text"
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </label>
          <button className="confirm-edit" type="submit">
            <FaCheck />
            <span className="visually-hidden">Confirm</span>
          </button>
          <button
            className="undo-edit"
            onClick={() => {
              setText(prevText);
              setEdit(false);
            }}
          >
            <FaUndoAlt />
            <span className="visually-hidden">Undo and close edit</span>
          </button>
        </form>
      ) : (
        <h2>{text}</h2>
      )}
      <button className="delete" onClick={() => dispatch(deleteGoal(goal._id))}>
        X
        <span className="visually-hidden">Delete goal</span>
      </button>
      <button className="edit" onClick={() => setEdit(true)}>
        <FaEdit />
        <span className="visually-hidden">Edit goal</span>
      </button>
    </li>
  );
}

GoalItem.propTypes = {
  goal: PropTypes.object.isRequired,
};

export default GoalItem;
