import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux'
class Checkout extends Component {
 
    checkoutCancellHandler = () =>{
      this.props.history.goBack();
    }

    checkoutContinueHandler = () =>{
        this.props.history.replace('/checkout/contact-data');
    }
   render(){
      
       return (
           <div>
               <CheckoutSummary 
               ingredients={this.props.ings}
               checkoutCancell={this.checkoutCancellHandler}
               checkoutContinue={this.checkoutContinueHandler}
               />
               <Route path={this.props.match.path + '/contact-data'} 
               component={ContactData} />
               />
            </div>
       )
   }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);