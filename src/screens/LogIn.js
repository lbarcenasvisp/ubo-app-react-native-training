import { StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Image,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionCreators from '../redux/actions';
import colors from '../styles/colors';
import transparentHeaderStyle from '../styles/navigation';
import InputField from '../components/form/InputField';
import RoundedButton from "../components/buttons/RoundedButton";
import NavBarButton from '../components/buttons/NavBarButton';
import stylesLogin from '../styles/LogIn';
import { NavigationActions } from 'react-navigation';

const vispLogo = require('../../assets/splash.png');

class LogIn extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <NavBarButton
      handleButtonPress={() => navigation.goBack()}
      location="left"
      icon={<Icon name="angle-left" color={colors.white} size={30} />}
    />,
    headerStyle: transparentHeaderStyle,
    headerTransparent: true,
    headerTintColor: colors.white,
  });

  constructor(props) {
    super(props);
    this.state = {
      formValid: true,
      validEmail: false,
      emailAddress: '',
      password: '',
      validPassword: false,
      loadingVisible: false,
    };

    this.handleCloseNotification = this.handleCloseNotification.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleNextButtonState = this.toggleNextButtonState.bind(this);

    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
  }
  
  async handleNextButton() {
    this.setState({ loadingVisible: true });
    const { logIn, navigation } = this.props;
    const { navigate } = navigation;

    setTimeout( async() => {
      const { emailAddress, password } = this.state;
      if (await logIn(emailAddress, password)) {
        this.setState({ formValid: true, loadingVisible: false });
        navigate('LoggedIn');
      } else {
        this.setState({ formValid: false, loadingVisible: false });
      }
    }, 2000);
  }

  navigateToScreen = (route) => () => {
    this.setState({ loadingVisible: true });
    const { email, password } = this.state;
    const { logIn } = this.props;
    setTimeout( async() => {
      if (await logIn(email, password)) {
        const navigateAction = NavigationActions.navigate({
          routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
      } else {
        this.setState({ formValid: false, loadingVisible: false });
      }
    }, 10000);
  }

  handleForgotPassword() {
    const { navigation } = this.props;
    const { navigate } = navigation;
    navigate('ForgotPassword')
  }

  handleCloseNotification() {
    this.setState({ formValid: true });
  }

  handleEmailChange(email) {
    // eslint-disable-next-line
    const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validEmail } = this.state;
    this.setState({ emailAddress: email });

    if (!validEmail) {
      if (emailCheckRegex.test(email)) {
        this.setState({ validEmail: true });
      }
    } else if (!emailCheckRegex.test(email)) {
      this.setState({ validEmail: false });
    }
  }

  handlePasswordChange(password) {
    const { validPassword } = this.state;

    this.setState({ password });

    if (!validPassword) {
      if (password.length > 4) {
        // Password has to be at least 4 characters long
        this.setState({ validPassword: true });
      }
    } else if (password <= 4) {
      this.setState({ validPassword: false });
    }
  }

  handleEmailInput(text) {
    this.setState({ email: text });
  }

  handlePasswordInput(text) {
    this.setState({ password: text });
  }

  toggleNextButtonState() {
    const { validEmail, validPassword } = this.state;
    if (validEmail && validPassword) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <View style={styles.container}>
          <ScrollView style={styles.scrollView}>
              <View style={styles.centerize}>
                <Image
                    
                    source={vispLogo}
                  />
                <Text style={styles.centerize}>Login to VISP</Text>
              </View>
              <InputField
                    labelText="USERNAME"
                    labelTextSize={14}
                    labelColor={colors.white}
                    textColor={colors.white}
                    borderBottomColor={colors.white}
                    inputType="text"
                    customStyle={{ marginBottom: 30 }}
                    onChangeText={this.handleEmailInput}
                    showCheckmark={false}
                  />
              <InputField
                     labelText="PASSWORD"
                     labelTextSize={14}
                     labelColor={colors.white}
                     textColor={colors.white}
                     borderBottomColor={colors.white}
                     inputType="password"
                     customStyle={{ marginBottom: 30 }}
                     onChangeText={this.handlePasswordInput}
                     showCheckmark={false}
                  />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={this.navigateToScreen('LoggedIn')} >
                    <Text style={styles.buttonText}>Sign In</Text>
                  </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
    justifyContent: 'center',
    marginTop: 0,
    paddingTop: "15%",
    padding: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scrollView: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    flex: 1,
  },
  centerize: {
    alignItems : 'center',
    color: 'white'
  },
  buttonContainer: {
    flex: 1
  },
  buttonStyle: {
    backgroundColor: colors.blue,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10
  },
  buttonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold'
  },
});

const mapStateToProps = state => ({
  loggedInStatus: state.loggedInStatus,
});

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

LogIn.propTypes = {
  logIn: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);