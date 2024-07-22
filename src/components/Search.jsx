import { useEffect, useState } from "react"
import styles from "./search.module.css";

const URL = "https://api.spoonacular.com/recipes/complexSearch"
const API_KEY  = "3fbb8d08d1aa4e009b8e4f2a74ff9583"

export default function Search({ foodData, setFoodData }){
    let [query, setQuery] = useState("pizza");
    // Syntax of useEffect hook
    useEffect(() => {
        async function fetchFood() {
            const res = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`)
            const data = await res.json()
            setFoodData(data.results)
        }
        fetchFood()
    }, [query]);

    return (
        <div className={styles.searchContainer}>
            <input className={styles.input} type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
    )
}