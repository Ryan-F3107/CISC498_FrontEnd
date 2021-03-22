import React from 'react';
import { Text, View, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../styling/styles';
import { showMessage } from 'react-native-flash-message';

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

    // Verify that all the required fields are filled in
    checkForm() {
        let decision = false;

        if (this.state.errorEmail == "Invalid" || this.state.email == "" || this.state.password.length < 8
            || this.state.confirmPassword != this.state.password) {
            decision = false
        }
        else {
            decision = true
        }
        return decision

    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <View style={styles.container}>
                    <Text style={styles.title}> Create an Account </Text>

                    <ScrollView showsVerticalScrollIndicator={false}>

                        {/*Email Address*/}
                        <TextInput
                            style={styles.textInput}
                            label="EMAIL"
                            mode="outlined"
                            autoCapitalize='none'
                            placeholder="myemail@domain.com"
                            theme={{ colors: { primary: '#0a0540' } }}
                            onChangeText={email => this.setState(() => ({ email: email }))}
                            value={this.state.email}
                            onBlur={() => { // If the field is left blank, or has an invalid email address, show an error message
                                if (this.state.email == "") {
                                    this.setState(() => ({ errorEmail: "Required" }));
                                } else if (this.state.email.length <= 5 || /@\w+\.\w+/.test(this.state.email) == false) {
                                    this.setState(() => ({ errorEmail: "Invalid" }));
                                }
                            }}
                            onFocus={() => { // When the field is tapped, remove the error message
                                this.setState(() => ({ errorEmail: "" }));
                            }}
                        />
                        <Text style={styles.errorMessage}>{this.state.errorEmail}</Text>

                        <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: 'grey' }}></View>

                        {/*Password*/}
                        <TextInput
                            style={styles.textInputPassword}
                            label="PASSWORD"
                            mode="outlined"
                            autoCapitalize='none'
                            secureTextEntry={true}
                            theme={{ colors: { primary: '#0a0540' } }}
                            onChangeText={password => this.setState(() => ({ password: password }))}
                            value={this.state.password}
                            onBlur={() => { // If the field is left blank, or has an invalid password, show an error message 
                                if (this.state.password == "") {
                                    this.setState(() => ({ errorPassword: "Required" }));
                                    this.setState(() => ({ confirmPassword: '' }));
                                } else if (this.state.password.length < 8) {
                                    this.setState(() => ({ errorPassword: "Must be at least 8 characters long" }));
                                }
                            }}
                            onFocus={() => { // When the field is tapped, remove the error message
                                this.setState(() => ({ errorPassword: "", confirmPassword: "" }));
                            }}
                        />
                        <Text style={styles.errorMessage}>{this.state.errorPassword}</Text>

                        {/*Re-enter Password*/}
                        <TextInput
                            style={styles.textInputConfirmPassword}
                            label="CONFIRM PASSWORD"
                            mode="outlined"
                            autoCapitalize='none'
                            secureTextEntry={true}
                            theme={{ colors: { primary: '#0a0540' } }}
                            disabled={this.state.password.length < 8}
                            onChangeText={confirmPassword => this.setState(() => ({ confirmPassword: confirmPassword }))}
                            value={this.state.confirmPassword}
                            onBlur={() => { // If the field is left blank or if the password and re-entered password don't match, show an error message 
                                if (this.state.confirmPassword == "") {
                                    this.setState(() => ({ errorConfirmPassword: "Required" }));
                                } else if (this.state.password != this.state.confirmPassword) {
                                    this.setState(() => ({ errorConfirmPassword: "Paswords do not match" }));
                                }
                            }}
                            onFocus={() => { // When the field is tapped, remove the error message
                                this.setState(() => ({ errorConfirmPassword: "" }));
                            }}
                        />
                        <Text style={styles.errorMessage}>{this.state.errorConfirmPassword}</Text>

                        {/*Button - send all the entered info*/}
                        <View style={{
                            marginBottom: 130

                        }} />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                if (this.checkForm()) {
                                    if (this.props.route.params.accountType == "customer") {
                                        this.props.navigation.navigate('Terms_Conditions',
                                            {
                                                accountType: this.props.route.params.accountType,
                                                firstName: this.props.route.params.firstName,
                                                lastName: this.props.route.params.lastName,
                                                phoneNum: this.props.route.params.phoneNum,
                                                email: this.state.email,
                                                password: this.state.password
                                            });

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
                                            });
                                    }
                                } else {
                                    showMessage({
                                        message: "Error: Incomplete/Invalid Form. Please fill in all the fields.",
                                        type: "danger",
                                        autoHide: true,
                                        duration: 2000,
                                        backgroundColor: "#ff504a",
                                        color: "#fafafa",
                                        icon: "danger"
                                    });
                                }

                            }}
                        >
                            <Text style={{ color: '#fafafa', alignSelf: 'center' }}>Sign Up</Text>
                        </TouchableOpacity>

                    </ScrollView>

                </View>
            </KeyboardAvoidingView>
        )
    }
}

export default CreateAccountInfo;