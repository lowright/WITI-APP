import React from "react"
import {
  Switch,
  Route,
} from "react-router-dom"

//Import Layouts
import AuthScreen from '../layouts/AuthScreen'
import CheckCodeScreen from '../layouts/CheckCodeScreen'
import ActivityScreen from '../layouts/ActivityScreen'
import Login from '../layouts/Login'
import GroupScreen from "../layouts/GroupScreen"
import EventsScreen from "../layouts/EventsScreen"
import ChatScreen from "../layouts/ChatScreen"
import SettingsScreen from "../layouts/SettingsScreen"
import MembersScreen from "../layouts/MembersScreen"
import CreateGroupScreen from "../layouts/CreateGroupScreen"
import EventDetailsScreen from '../layouts/EventDetailsScreen'
import CreateEventScreen from "../layouts/CreateEventScreen"
import ConfidentialityScreen from "../layouts/Confidentiality"
import ChangeProfileScreen from "../layouts/ChangeProfileScreen"

const Root = () => {
  return (
    <>
		<Switch>
			<Route component={AuthScreen} exact path="/" />
			<Route component={CheckCodeScreen} exact path="/check-сode" />
			<Route component={ActivityScreen} path="/activity" />
			<Route component={Login} path="/login/:otl" />
			<Route component={GroupScreen} path="/groups" />
			<Route component={EventsScreen} path="/events" />
			<Route component={EventDetailsScreen} path="/detail" />
			<Route component={SettingsScreen} path="/settings" />
			<Route component={MembersScreen} path="/members" />
			<Route component={CreateGroupScreen} path="/create-group" />
			<Route render={(props) => ( <ChatScreen {...props}  /> )} path="/chat" />
			<Route component={EventDetailsScreen} path="/detail" />
			<Route component={CreateEventScreen} path="/create-event" />
			<Route component={ConfidentialityScreen} path="/confidentiality" />
			<Route component={ChangeProfileScreen} path="/change-profile" />
		</Switch>
	</>
  );
}

export default Root
