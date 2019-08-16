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
    paddingHorizontal: 50,
    justifyContent: 'center',
    backgroundColor: '#99f0e1',
  },
  welcome: {
    fontSize: 34,
    color: "#306680",
    marginVertical: 30,
    textAlign: 'center',
    fontFamily: 'Avenir-Heavy',
  },
  input: {
    height: 40,
    fontSize: 16,
    color: '#306680',
    marginVertical: 15,
    borderBottomWidth: 1,
    fontFamily: 'Avenir-Book',
    borderBottomColor: '#306680',
  },
  btnEnter: {
    borderRadius: 5,
    marginVertical: 20,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#306680',
  },
  btnEnterText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '700',
    fontFamily: 'Avenir-Black',
  }
})

const mapStateToProps = state => ({
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { signIn })(Login);