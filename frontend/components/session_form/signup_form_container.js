import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = state => ({
    errors: state.errors.session,
    formType: 'signup',
    header: ['Make the most of your professional life']
})

const mapDispatchToProps = dispatch => ({
    processForm: (user) => signup(user)
})
const SignupFormContainer = connect(mapStateToProps, mapDispatchToProps)(SessionForm);
export default SignUpFormContainer;