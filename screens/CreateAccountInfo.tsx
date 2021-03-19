import React from 'react';
import { Text, View, TouchableOpacity, Platform, RefreshControlBase } from 'react-native';
import { TextInput } from 'react-native-paper';
import styles from '../styling/styles';

class CreateAccountInfo extends React.Component {

    constructor(props) {
        super(props);
        const initalState = {
            email: '',
            password: '',
            confirmPassword: '',
            errorEmail: '',
            errorPassword: '',
            errorConfirmPassword: '',
        }
        this.state = initalState;
    }

    // verify that all the required fields are filled in
    checkForm() {
        let decision = false;

        if (this.state.errorEmail == "Invalid" || this.state.email == "" || this.state.password.length < 8
            || this.state.confirmPassword != this.state.password) {
            decision = true
        }
        else {
            decision = false
        }
        return decision

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}> Create an Account </Text>
                <TextInput
                    style={styles.textInput}
                    label="EMAIL"
                    mode="outlined"
                    autoCapitalize='none'
                    placeholder="myemail@domain.com"
                    theme={{ colors: { primary: '#04074d' } }}
                    onChangeText={email => this.setState(() => ({ email: email }))}
                    value={this.state.email}
                    onBlur={() => {

                        if (this.state.email == "") {
                            this.setState(() => ({ errorEmail: "Required" }))
                        } else if (this.state.email.length <= 5 || !this.state.email.includes('@') || !this.state.email.includes('.')) {
                            this.setState(() => ({ errorEmail: "Invalid" }))
                        }
                    }}
                    onFocus={() => {
                        this.setState(() => ({ errorEmail: "" }))
                    }}
                />
                <Text style={styles.errorMessage}>{this.state.errorEmail}</Text>

                <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: 'grey' }}></View>

                <TextInput
                    style={styles.textInputPassword}
                    label="PASSWORD"
                    mode="outlined"
                    autoCapitalize='none'
                    secureTextEntry={true}
                    theme={{ colors: { primary: '#04074d' } }}
                    onChangeText={password => this.setState(() => ({ password: password }))}
                    value={this.state.password}
                    onBlur={() => {

                        if (this.state.password == "") {
                            this.setState(() => ({ errorPassword: "Required" }))
                        } else if (this.state.password.length < 8) {
                            this.setState(() => ({ errorPassword: "Must be at least 8 characters long" }))
                        }
                    }}
                    onFocus={() => {
                        this.setState(() => ({ errorPassword: "", confirmPassword: "" }))
                    }}
                />
                <Text style={styles.errorMessage}>{this.state.errorPassword}</Text>

                <TextInput
                    style={styles.textInputConfirmPassword}
                    label="CONFIRM PASSWORD"
                    mode="outlined"
                    autoCapitalize='none'
                    secureTextEntry={true}
                    theme={{ colors: { primary: '#04074d' } }}
                    disabled={this.state.password.length < 8}
                    onChangeText={confirmPassword => this.setState(() => ({ confirmPassword: confirmPassword }))}
                    value={this.state.confirmPassword}
                    onBlur={() => {

                        if (this.state.confirmPassword == "") {
                            this.setState(() => ({ errorConfirmPassword: "Required" }))
                        } else if (this.state.password != this.state.confirmPassword) {
                            this.setState(() => ({ errorConfirmPassword: "Paswords do not match" }))
                        }
                    }}
                    onFocus={() => {
                        this.setState(() => ({ errorConfirmPassword: "" }))
                    }}
                />
                <Text style={styles.errorMessage}>{this.state.errorConfirmPassword}</Text>

                {/*Button*/}
                <View style={{
                    position: (Platform.OS === 'ios') ? "absolute" : "relative",
                    bottom: (Platform.OS === 'ios') ? 210 : -80,
                    alignSelf: 'center'
                }}
                >
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {

                            if (this.props.route.params.accountType == "customer") {
                                this.props.navigation.navigate('Terms_Conditions',
                                    {
                                        accountType: this.props.route.params.accountType,
                                        firstName: this.props.route.params.firstName,
                                        lastName: this.props.route.params.lastName,
                                        phoneNum: this.props.route.params.phoneNum,
                                        email: this.state.email,
                                        password: this.state.password
                                    })

                            } else if (this.props.route.params.accountType == "business") {
                                this.props.navigation.navigate('Terms_Conditions',
                                    {
                                        accountType: this.props.route.params.accountType,
                                        businessName: this.props.route.params.businessName,
                                        phoneNum: this.props.route.params.phoneNum,
                                        street: this.props.route.params.street,
                                        city: this.props.route.params.city,
                                        province: this.props.route.params.province,
                                        postalCode: this.props.route.params.postalCode,
                                        capacity: this.props.route.params.capacity,
                                        email: this.state.email,
                                        password: this.state.password
                                    })
                            }
                        }}
                        disabled={this.checkForm()}
                    >
                        <Text style={{ color: '#fafafa', alignSelf: 'center' }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>


            </View>

        )
    }
}

export default CreateAccountInfo;