import Greeting from './greeting';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id]
})

const GreetingContainer = connect(mapStateToProps)(Greeting);
export default GreetingContainer;