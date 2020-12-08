import { connect } from 'react-redux';
import { login, clearSessionErrors } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = state => ({
    errors: state.errors.session,
    formType: 'Sign in',
    header: [
        'Welcome Back', 
        `Don't miss your next opportunity. Sign in to stay updated on your professional world.`
    ],
    message: ['New to OptIn?', 'signup', 'Join now']
})

const mapDispatchToProps = dispatch => ({
    processForm: (user) => dispatch(login(user)),
    loginDemoUser: () => dispatch(login({email: 'demo_user@gmail.com', password: 'password'})),
    clearErrors: () => dispatch(clearSessionErrors())
})

const LoginFormContainer = connect(mapStateToProps,mapDispatchToProps)(SessionForm);
export default LoginFormContainer;
