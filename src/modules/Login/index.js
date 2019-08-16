import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  View, 
  Text,
  TextInput, 
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet 
} from 'react-native';
import { signIn } from './actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  };

  singin = async () => {
    const { email, password } = this.state;

    const response = await this.props.signIn(email, password);

    if (response) {
      this.props.navigation.navigate("Dashboard");
    }
  }

  render() {
    const { loading } = this.props;

    return (
      <View style={styles.container}>

        <Text style={styles.welcome}>33 Care Dashboard</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#00af9d"
          autoCapitalize="none"
          onChangeText={(email) => this.setState({ email })}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#00af9d"
          secureTextEntry
          onChangeText={(password) => this.setState({ password })}
        />

        <TouchableOpacity
          style={styles.btnEnter}
          disabled={loading}
          onPress={() => this.singin()}
        >
          {
            loading
              ? <ActivityIndicator color="white" size="small" />
              : <Text style={styles.btnEnterText}>Entrar</Text>
          }
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFBFA',
  },
  welcome: {
    fontSize: 28,
    textAlign: 'center',
    marginVertical: 30,
    color: "#000"
  },
  input: {
    marginHorizontal: 50,
    height: 40,
    marginVertical: 15,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  btnEnter: {
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#00af9d',
    alignItems: 'center',
    marginHorizontal: 50,
    marginVertical: 20,
    paddingVertical: 10,
  },
  btnEnterText: {
    color: '#ffffff',
    fontWeight: '700'
  }
})

const mapStateToProps = state => ({
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { signIn })(Login);