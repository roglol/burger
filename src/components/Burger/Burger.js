 import React from 'react';
 import {withRouter} from 'react-router-dom';
 
 import './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

 const burger = (props) =>{
      let transformedIngredients = Object.keys(props.ingredients).map(bKey =>{
         return [...Array(props.ingredients[bKey])].map((el,i)=>{
                return <BurgerIngredient type={bKey} key={bKey+i} />
         })
      }).reduce((acc,curr) =>{
          return acc.concat(curr)
      },[])
      if(transformedIngredients.length == 0){
          transformedIngredients = <p>Please start adding ingredients</p>
      }
     return (
         <div className='Burger'>
         <BurgerIngredient type="bread-top"/>
        {transformedIngredients}
        <BurgerIngredient type="bread-bottom"/>
         </div>
     );
 }

 export default withRouter(burger);