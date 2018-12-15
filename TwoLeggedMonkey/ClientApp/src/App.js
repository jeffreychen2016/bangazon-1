import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { Layout } from './components/Layout';
// import { Home } from './components/Home';
// import { FetchData } from './components/FetchData';
// import { Counter } from './components/Counter';
import { Computer } from './components/Computer';
import { Customer } from './components/Customer';
import { Department } from './components/Department';
import { Employee } from './components/Employee';
import { PaymentType } from './components/PaymentType';
import { Product } from './components/Product';
import { ProductType } from './components/ProductType';
import { TrainingProgram } from './components/TrainingProgram';
import { SingleOrder } from './components/SingleOrder';
import { Order } from './components/Order';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        {/* <Route exact path='/' component={Home} /> */}
        <Switch>
          <Route path='/computer' component={Computer} />
          <Route path='/customer' component={Customer} />
          <Route path='/department' component={Department} />
          <Route path='/employee' component={Employee} />
          <Route path='/order/:id' component={SingleOrder} />
          <Route path='/order' component={Order} />
          <Route path='/paymenttype' component={PaymentType} />
          <Route path='/product' component={Product} />
          <Route path='/producttype' component={ProductType} />
          <Route path='/trainingprogram' component={TrainingProgram} />
        </Switch>
      </Layout>
    );
  }
}
