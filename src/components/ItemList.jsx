export default function ItemList({ ingredients, isLoading }){
    return (
        <>
            {isLoading?
                <p>Loading...</p>:
                ingredients.map((item)=>
                    <div key={item.key}>
                        <img src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`} alt="" />
                        <h3>{item.name}</h3>
                        <h3>{item.amount} {item.unit}</h3>
                    </div>
                )
            }
        </>
    )
}