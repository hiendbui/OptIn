import { connect } from 'react-redux';
import Profile from './profile';

const mapStateToProps = (state,ownProps) => ({
    
})

const mapDispatchToProps = dispatch => ({
    processForm: (user) => dispatch(login(user)),
    loginDemoUser: () => dispatch(login({ email: 'demo_user@gmail.com', password: 'password' })),
    clearErrors: () => dispatch(clearSessionErrors())
})

const LoginFormContainer = connect(mapStateToProps, mapDispatchToProps)(SessionForm);
export default LoginFormContainer;