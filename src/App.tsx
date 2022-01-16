import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { store } from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {
	Header,
	AboutUs,
	Footer,
	Login,
	Thanks,
	ClientProfile,
	NotFoundPage,
	NoPermissions,
	TermsConditions,
	CookiesPolitics,
	PrivacityPolitics,
	FrequentTask,
	ProductDetail,
	Register,
	ClientList,
	ProducerList,
	ProductList,
	Product,
	Order,
	DashboardAdmin,
	DashboardProducer,
	Ship,
	Payment,
	ConfirmationOrder,
	EditClient,
	EditProducer,
	Producer,
	Cart,
	Invoice,
	ProducerOrder,
	ProducerRegister,
	CreateProduct,
	ProductListProducer,
	Favorites,
	Home,
	ProducerProfile,
} from 'ui';

export const App: React.FC = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div style={{ width: '100%', height: '100%' }}>
					<Header />
					<div style={{ height: '100%' }}>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/about" component={AboutUs} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/thanks" component={Thanks} />
							<Route exact path="/profile" component={ClientProfile} />
							<Route exact path="/noPermissions" component={NoPermissions} />
							<Route exact path="/termsConditions" component={TermsConditions} />
							<Route exact path="/cookiesPolitics" component={CookiesPolitics} />
							<Route exact path="/privacityPolitics" component={PrivacityPolitics} />
							<Route exact path="/frequentTask" component={FrequentTask} />
							<Route exact path="/productDetail" component={ProductDetail} />
							<Route exact path="/register" component={Register} />
							<Route exact path="/clientlist" component={ClientList} />
							<Route exact path="/producerlist" component={ProducerList} />
							<Route exact path="/productlist" component={ProductList} />
							<Route exact path="/product" component={Product} />
							<Route exact path="/order" component={Order} />
							<Route exact path="/dashboardadmin" component={DashboardAdmin} />
							<Route exact path="/dashboardproducer" component={DashboardProducer} />
							<Route exact path="/ship" component={Ship} />
							<Route exact path="/payment" component={Payment} />
							<Route exact path="/confirmationOrder" component={ConfirmationOrder} />
							<Route exact path="/editclient" component={EditClient} />
							<Route exact path="/editproducer" component={EditProducer} />
							<Route exact path="/producer" component={Producer} />
							<Route exact path="/cart" component={Cart} />
							<Route exact path="/invoice" component={Invoice} />
							<Route exact path="/producerorder" component={ProducerOrder} />
							<Route exact path="/producerRegister" component={ProducerRegister} />
							<Route exact path="/createproduct" component={CreateProduct} />
							<Route exact path="/productListProducer" component={ProductListProducer} />
							<Route exact path="/favorites" component={Favorites} />
							<Route exact path="/producerProfile" component={ProducerProfile} />
							<Route component={NotFoundPage} />
						</Switch>
					</div>
					<Footer />
				</div>
			</BrowserRouter>
		</Provider>
	);
};
