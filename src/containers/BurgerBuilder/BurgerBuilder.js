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

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}
class BurgerBuilder extends Component{
    state={
        loading: false,
        totalPrice:4,
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
       
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search:'?' + queryString,
        });
    }
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        }).reduce((sum,el) =>{
           return sum + el;
        }, 0)
        this.setState({purchasable: sum > 0});
    }
    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients)
        
    }
    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCounted = (oldCount > 0) ? oldCount - 1 : oldCount
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = (oldPrice > 4) ? oldPrice - priceAddition : oldPrice
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients)
       
    }
    render(){
    
        const disabledInfo = {
            ...this.props.ings
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
         let orderSummary =  <OrderSummary 
         price={this.state.totalPrice}
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
                purchasable={this.state.purchasable}
                price={this.state.totalPrice }
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
       ings: state.ingredients
    }
}

const mapDispatchToProps = dispatch => {
    return {
       onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
       onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder));