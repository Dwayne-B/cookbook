import {BsFillBookmarkPlusFill} from 'react-icons/Bs'
import './Card.css'
import {useState ,useContext} from 'react'
import {motion} from 'framer-motion'
import RecipeContext from '../../Context/RecipeContext';

function Card({card}) {
   
const {setMyRecipes,myRecipes,url} = useContext(RecipeContext)
const [isScaled, setIsScaled] = useState(false);

	const handleClick = ()=>{
        setIsScaled(prevState => !prevState);
        setTimeout(()=>{
            setIsScaled(prevState => !prevState);
        },400)
    }
    const handleSaveRecipe = (e)=>{
      
        const create = async () => {
            
                await fetch(url, {
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
<motion.div className=' cnt-plus '
  initial={{ scale: 1}} // Animation on tap/click
  transition={{ duration: 0.5 }} // Animation duration
  animate={{ scale: isScaled ? 1.5 : 1 }} // Animate scale based on state
  onClick={handleClick}   // Click handler
>

<BsFillBookmarkPlusFill  onClick={(e)=>{
            handleSaveRecipe(e);
    }} className='plus m-[0px]' size={60} color={' #FBBF24'}/>

</motion.div>
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
                                        className='py-2 px-3 bg-blue-700 rounded-md text-white'>{null?'flipping...':'Go to back'}</motion.button>

    
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