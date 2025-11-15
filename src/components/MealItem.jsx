import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button.jsx";

function MealItem({ meal }) {
  return (
    <li key={meal.id} className="meal-item">
      <article>
        <img src={`../backend/public/${meal.image}`} alt={meal.name}></img>
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}

export default MealItem;
