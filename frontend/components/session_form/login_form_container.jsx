import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = state => ({
    errors: state.errors.session,
    formType: 'login',
    header: 'Welcome Back'
})

const mapDispatchToProps = dispatch => ({
    processForm: (user) => login(user)
})
const LoginFormContainer = connect(mapStateToProps,mapDispatchToProps)(SessionForm);
export default LoginFormContainer;
