import React from 'react';
import PropTypes from 'prop-types';
import {
	createBottomTabNavigator,
	createStackNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomerListContainer from '../containers/CustomerListContainer';
import colors from '../styles/colors';

const CustomTabBarIcon = (name, size) => {
	const icon = ({tintColor}) => (
		<Icon
			name={name}
			size={size}
			color={tintColor}
		/>
	);

	icon.propTypes = {
		tintColor: PropTypes.string.isRequired,
	};

	return icon;
};

const LoggedInTabNavigator = createBottomTabNavigator({

	CustomerList: {
		screen: CustomerListContainer,
		navigationOptions: {
			tabBarLabel: 'SUBSCRIBERS',
			tabBarIcon: CustomTabBarIcon('ios-archive', 22),
		},
	},
}, {
	tabBarOptions: {
		labelStyle: {
			fontWeight: '600',
			marginBottom: 5,
		},
		activeTintColor: colors.blue,
	},
	tabBarPosition: 'bottom',
});

export default LoggedInTabNavigator;
