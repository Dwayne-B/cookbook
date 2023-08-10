import {BsFillBookmarkPlusFill} from 'react-icons/Bs'
import './Card.css'
import {useState ,useContext} from 'react'
import {motion} from 'framer-motion'
import RecipeContext from '../../Context/RecipeContext';

function Card({card}) {
   
const {setMyRecipes,myRecipes} = useContext(RecipeContext)
    
    const [isFlipped, setIsFlipped] = useState(false)
	const handleClick = ()=>{
        setIsFlipped(prev=>!prev);
    }
    const handleSaveRecipe = (e)=>{
        console.log("E>TARGET",card.recipe.label)
        const create = async () => {
            
                await fetch(`http://localhost:5000/api/`, {
                    mode: 'cors',
                    method: 'POST',
                    body: JSON.stringify({
                        label: card.recipe.label,
                        cusineType:card.recipe.cusineType,
                        ingredients: card.recipe.ingredientLines,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Methods': ' POST',
                    },
                })
                    .then((res) => res.json())
                    .then((updatedata) => {
                        console.log(updatedata);
                        setMyRecipes([...myRecipes, updatedata]);
                    });
         
        };
        create();
    }

    
return(
    
  

<div key="front" className='m-auto bg-slate-200  min-w-[250px] max-w-[30%] my-5 p-5 relative text-gray-900 break-words rounded-xl '>
    <BsFillBookmarkPlusFill onClick={(e)=>{
            handleSaveRecipe(e);
    }} className='plus m-[0px]' size={60} color={' #FBBF24'}/>
    <img className='min-w-full rounded-lg ' src={card.recipe.images["REGULAR"].url} alt="placeholder"  />
    
    <small>{card.recipe.dishType} : {card.recipe.cuisineType.map((type,i)=><span key={i}>{type } </span>)}</small>
    <br />
    <small> By:  <a href={card.recipe.url}>
    {card.recipe.source}


</a> </small>
<h2>{card.recipe.label}</h2>
<p> Feeds: {card.recipe.yield}</p>

   
  
    <motion.button onClick={handleClick} whileHover={{
											backgroundColor: '#1b2683',
											color: '#fff',
										}}
                                        className='py-2 px-3 bg-blue-700 rounded-md text-white'>{isFlipped?'flipping...':'Go to back'}</motion.button>

    
</div>

)
                                    }



export default Card


// back content
/*
*<div key="back" className=' m-auto  bg-slate-200   relative max-w-[30%] min-w-[250px] min-h-[210px] my-5 p-5 text-gray-900 break-words rounded-xl'>
<BsFillBookmarkPlusFill className='plus m-[0px]' size={60} color={' #FBBF24'}/>
<h2 >{card.recipe.label}</h2>

   
    <a href={card.recipe.url}>
    <p>{card.recipe.source}</p>



</a>
       <ul>
        {
        card.recipe.ingredientLines.map((step,i)=>{
            const ing = <li key={i}>`${step}`</li>
            return ing
       })
    
        }
        </ul>
        <p>{card.recipe.mealType[0]}</p>
        <p> Feeds: {card.recipe.yield}</p>
        <button onClick={handleClick}className='py-2 px-3 bg-green-700 rounded-md'>{isFlipped?'Go to front':'Flipping...'}</button>

</div>
*
*/   