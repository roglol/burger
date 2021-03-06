import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input';
import './ContactData.css'

class ContactData extends Component {
    state = {
        orderForm: {
             name: {
                 elementType: 'input',
                 elementConfig: {
                     type: 'text',
                     placeholder: 'Your Name'
                 },
                 value: '',
                 validation: {
                     required:true,
                     minLength:1,
                     maxLength:100
                 },
                 valid:false
             },
             street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required:true,
                    minLength:1,
                    maxLength:100
                },
                valid:false
            },
             zipCode:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required:true,
                     minLength:1,
                     maxLength:100
                },
                valid:false
            },
             country:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required:true,
                    minLength:1,
                    maxLength:100
                },
                valid:false
            },
            email:  {
                elementType: 'input',
                elementConfig: {
                    type:'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required:true,
                    minLength:1,
                    maxLength:100

                },
                valid:false
            },
            deliveryMethod:{
                elementType: 'select',
                elementConfig: {
                   options:[
                       {value: 'fast', displayValue: 'Fast'},
                       {value: 'fastest', displayValue: 'Fastest'},
                    ]
                },
                value: 'fastest',
                validation:{

                },
                valid:false
            }
        },
        loading:false
    }
    checkValidity(value,rules){
        let isValid = true;
          if(rules.required){
            isValid = value.trim() !== '' && isValid;
          }
          if(rules.minLength){
              isValid = value.length >= rules.minLength && isValid;
          }
          if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
          return isValid;
    }
    orderHandler = (e) =>{
        e.preventDefault()
         this.setState({loading:true})
         const formData = {};
         for (let formElementIdentifier in this.state.orderForm){
             formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
         }
        const order={
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
            }
        axios.post('/orders.json', order)
            .then(response =>{
                   this.setState({loading:false})
                   this.props.history.push('/')
            })
            .catch(error =>{
                this.setState({loading:false})
            })
    }
    inputChangeHandler = (e, inputIdentifier) =>{
      const updatedOrderForm = {
           ...this.state.orderForm
      }
      const updatedFormElement = { 
          ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = e.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedOrderForm[inputIdentifier] = updatedFormElement
        this.setState({orderForm: updatedOrderForm})
    }


    render(){
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form>
                   {formElementsArray.map(formElement =>(
                       <Input 
                       key={formElement.id}
                       elementType={formElement.config.elementType}
                       elementConfig={formElement.config.elementConfig}
                       value={formElement.config.value}
                       invalid={!formElement.config.valid}
                    //    shouldValidate={formElement.config.validation}
                       changed={(e) => this.inputChangeHandler(e,formElement.id)}
                       />
                   ))}
                   <Button btnType="Success" clicked = {this.orderHandler}>ORDER</Button>
                </form>
        );
        if(this.state.loading){
        form = <Spinner/>
        }
        return(
            <div className="ContactData">
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);
