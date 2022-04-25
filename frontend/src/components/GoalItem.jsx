import { useDispatch } from "react-redux";
import { deleteGoal } from '../features/goals/goalSlice'


function GoalItem({goal}) {
  const dispatch = useDispatch();

  return (
    <li className="goal">
      <p>
        {new Date(goal.createdAt).toLocaleString('fr-FR')}
      </p>
      <h2>{goal.text}</h2>
      <button
        className="close"
        onClick={() => dispatch(deleteGoal(goal._id))}
      >X</button>
    </li>
  )
}

export default GoalItem