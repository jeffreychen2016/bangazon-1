import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Computer } from './components/Computer/Computer';
import { Customer } from './components/Customer';
import { Department } from './components/Department';
import { Employee } from './components/Employee/Employee';
import { PaymentType } from './components/PaymentType';
import { Order } from './components/Order';
import { Product } from './components/Product';
import { ProductType } from './components/ProductType';
import { TrainingProgram } from './components/TrainingProgram';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route path='/computer' component={Computer} />
        <Route path='/customer' component={Customer} />
        <Route path='/department' component={Department} />
        <Route path='/employee' component={Employee} />
        <Route path='/order' component={Order} />
        <Route path='/paymenttype' component={PaymentType} />
        <Route path='/product' component={Product} />
        <Route path='/producttype' component={ProductType} />
        <Route path='/trainingprogram' component={TrainingProgram} />
      </Layout>
    );
  }
}
