import { useEffect, useState } from "react"
import styles from "./fooddetails.module.css"
import ItemList from "./ItemList"

export default function FoodDetail({ foodId }) {
    const [food, setFood] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const URL = `https://api.spoonacular.com/recipes/${ foodId }/information`
    const API_KEY  = "3fbb8d08d1aa4e009b8e4f2a74ff9583"

    useEffect(() => {
        async function fetchFood(){
            const res = await fetch(`${URL}?apiKey=${API_KEY}`)
            const data = await res.json()
            console.log(data)
            setFood(data)
            setIsLoading(false)
        }
        fetchFood()
    }, [foodId])

    if (!food.analyzedInstructions || food.analyzedInstructions.length === 0) {
        return <p>No instructions available.</p>;
    }

    const steps = food.analyzedInstructions[0].steps;
    const ingredients = food.extendedIngredients;
    
    return (
        <div>
            <div className={styles.recipeCard}>
                <h1 className={styles.recipeName}>{food.title}</h1>

                <img className={styles.recipeImage} src={food.image} alt="" />

                <div className={styles.recipeDetails}>
                    <span>
                        <strong>⏰{food.readyInMinutes} Minutes</strong>
                    </span>
                    <span>👪 <strong>Serves {food.servings}</strong></span>
                    <span><strong>{food.vegetarian ? "🥕 Vegetarian": "🍗 Non-Vegetarian"}</strong></span>
                    <span><strong>{food.vegan ? "🐮 Vegan": ""}</strong></span>
                </div>
                <div>
                    $ <span><strong>{food.pricePerServing / 100} Per Serving</strong></span>
                </div>

                <h2>Ingredients</h2>
                <ItemList ingredients={ingredients} isLoading={isLoading} />

                <h2>Instructions</h2>
                <div className={styles.recipeInsturctions}>
                    <ol>
                        {(isLoading) ? <p>Loading...</p> :
                        (steps.map((step, index) => (
                            <li key={index}>{step.step}</li>
                        )))}
                    </ol>
                </div>
            </div>
        </div>
    )
}