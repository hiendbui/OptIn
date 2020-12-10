import { connect } from 'react-redux';
import { signup, login, clearSessionErrors } from '../../actions/user_auth_actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = state => ({
    errors: state.errors.session,
    formType: 'Sign up',
    header: ['Make the most of your professional life', 'OptIn to your network now.'],
    message: ['Already on OptIn?', 'login', 'Sign in']
})

const mapDispatchToProps = dispatch => ({
    processForm: (user) => dispatch(signup(user)),
    loginDemoUser: () => dispatch(login({ email: 'demo_user@gmail.com', password: 'password' })),
    clearErrors: () => dispatch(clearSessionErrors())
})
const SignUpFormContainer = connect(mapStateToProps, mapDispatchToProps)(SessionForm);
export default SignUpFormContainer;