import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { IconButton, Divider } from 'react-native-paper';
import ChangePassword from '../ChangePassword';
import Help from '../Help';
import styles from '../../styling/styles';

import BusinessEditProfile from './BusinessEditProfile';

const ReactDrawer = createDrawerNavigator();
var userInformation = '';

// Display the main screen
function MainScreen({ navigation }) {

    return (
        <View style={styles.homeContainer}>

            {/*Click the menu button, three horiztonal bars*/}
            <IconButton
                style={styles.menuButton}
                icon="menu"
                size={50}
                color='black'
                onPress={() => { navigation.openDrawer() }}
            ></IconButton>

            {/*Go to Check In Customer*/}
            <View style={styles.BusinessViewbutton}>
                <TouchableOpacity
                    style={styles.BusinessCheckInBtn}
                    onPress={() => navigation.navigate("CheckInCustomer", { receivedUserInfo: userInformation })} >
                    <IconButton
                        size={30}
                        icon="account-check"
                    />
                    <Text style={styles.BusinessButtonText}>Check In</Text>
                </TouchableOpacity>
            </View>

            {/*Go to view View QR code info*/}
            <View style={styles.BusinessViewQR}>

                {/*recievedUserInfo contains business info from backend. This is used to make a QR code for the business.*/}
                <TouchableOpacity
                    style={styles.BusinessButton}
                    onPress={() => navigation.navigate("MyQRcode", { receivedUserInfo: userInformation })}
                >
                    <IconButton
                        size={30}
                        icon="qrcode" />
                    <Text style={styles.BusinessButtonText}>View QR Code Information</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

// Log out & Delete Account in the drawer
function CustomDrawerItemList(props) {
    return (

        <DrawerContentScrollView {...props}>

            {/*Log out*/}
            <DrawerItemList {...props} />
            <Divider style={{ borderBottomWidth: 1, borderColor: 'lightgrey', width: 250, alignSelf: 'center' }} />
            <DrawerItem
                style={styles.deleteAccount}
                icon={() => (<IconButton
                    icon="logout" />)}
                label="Log Out"
                onPress={() =>
                    props.navigation.replace('Start')}>
            </DrawerItem >

            <Divider style={{ borderBottomWidth: 1, borderColor: 'lightgrey', width: 250, alignSelf: 'center' }} />

            {/*Delete Account*/}
            <DrawerItem

                icon={() => (<IconButton
                    icon="account-remove-outline"
                    color="red" />)}
                label="Delete Account"
                onPress={() => { props.navigation.navigate("DeleteAccount", { receivedUserInfo: userInformation, accountType: 'business' }) }}
            >

            </DrawerItem >
        </DrawerContentScrollView >
    );
}

// My Profile (editing contact information), Change Password, and Help in the drawer
function HomeBusiness({ route }) {
    const { userInfo } = route.params;
    userInformation = userInfo;
    return (
        <ReactDrawer.Navigator //The drawer can be closed by sliding it to the right or by clicking the top of the drawer
            drawerPosition="right"
            drawerContentOptions={{
                activeBackgroundColor: 'transparent',
            }}
            drawerType="slide"
            drawerContent={props => <CustomDrawerItemList {...props} />} >
            <ReactDrawer.Screen name="HomeBusiness" component={MainScreen}
                options={{
                    title: ""
                }} />


            {/*Edit Profile on Business Side*/}
            <ReactDrawer.Screen name="Profile" component={BusinessEditProfile}
                initialParams={{ accountType: 'business', receivedUserInfo: userInfo }}
                options={{
                    title: "My Profile",
                    drawerIcon: (() => (
                        <IconButton
                            icon="account" />
                    )),
                    unmountOnBlur: true
                }} />

            {/*Change Password*/}
            <ReactDrawer.Screen name="ChangePassword" component={ChangePassword}
                initialParams={{ accountType: 'business', receivedUserInfo: userInfo }}
                options={{
                    title: "Change Password",
                    drawerIcon: (() => (
                        <IconButton
                            icon="lock-open" />
                    )),
                    unmountOnBlur: true
                }} />

            {/*Help*/}
            <ReactDrawer.Screen name="Help" component={Help}
                initialParams={{ accountType: 'business' }}
                options={{
                    title: "Help",
                    drawerIcon: (() => (
                        <IconButton
                            icon="help" />
                    )),
                    unmountOnBlur: true
                }} />
        </ReactDrawer.Navigator>
    );
}

export default HomeBusiness;