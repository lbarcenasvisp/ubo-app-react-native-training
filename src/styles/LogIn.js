import { StyleSheet } from 'react-native';
import colors from './colors';

let headingTextSize = 30;
const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
  },
  scrollViewWrapper: {
    marginTop: '25%',
    flex: 4,
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
    paddingTop: '0%',
    flex: 8
  },
  loginHeader: {
    fontSize: headingTextSize,
    color: colors.white,
    fontWeight: '300',
    marginBottom: 40,
    marginTop: '20%'
  },
  notificationWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
  signInFormRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  signInFormRowLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  signInFormRowCenter: {
    flex: 1,
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

export default styles;
