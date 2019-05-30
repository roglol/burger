import React, {Component} from 'react';
import {connect} from 'react-redux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component{
    state={
        loading: false,
        purchasable: false,
        purchasing:false,
    }
        
    
    
    purchaseHandler = () =>{
        this.setState({purchasing: true})
    }
    purchaseCancelHandler = () =>{
        this.setState({purchasing:false})
    }
    purchaseContinueHandler =() =>{
        this.props.history.push('/checkout'  );
    }
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        }).reduce((sum,el) =>{
           return sum + el;
        }, 0)
        return sum > 0;
    }
 
    
    render(){
    
        const disabledInfo = {
            ...this.props.ings
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
         let orderSummary =  <OrderSummary 
         price={this.props.totalPrice}
         ingredients={this.props.ings}
         continue={this.purchaseContinueHandler}
         cancel={this.purchaseCancelHandler}
         />

        if(this.state.loading){
           orderSummary = <Spinner />
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing}
                 modalClosed={this.purchaseCancelHandler}
                >
               {orderSummary}
                </Modal>
                <Burger ingredients={this.props.ings} />
                <BuildControls 
                purchasable={this.updatePurchaseState(this.props.ings)}
                price={this.props.totalPrice }
                ingredientAdded = {this.props.onIngredientAdded}
                ingredientRemoved = {this.props.onIngredientRemoved}
                disabled={disabledInfo}
                ordered={this.purchaseHandler}
                />
            </Aux>
        );
    }
}

const mapStateToProps = state =>{
    return {
       ings: state.ingredients,
       totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
       onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
       onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder));