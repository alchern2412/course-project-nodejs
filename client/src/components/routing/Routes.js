import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Register from '../auth/Register'
import Login from '../auth/Login'
import Alert from '../layout/Alert'
import Dashboard from '../dashboard/Dashboard'
import CreateProfile from '../profile-forms/CreateProfile'
import PrivateRoute from '../routing/PrivateRoute'

import EditProfile from '../profile-forms/EditProfile'
import AddExperience from '../profile-forms/AddExperience'
import AddEducation from '../profile-forms/AddEducation'
import Profiles from '../profiles/Profiles'


// Redux
import Profile from '../profile/Profile'
import Posts from '../posts/Posts'
import Post from '../post/Post'
import EditPost from '../post/EditPost'
import { NotFound } from '../layout/NotFound'
import Toast from '../layout/Toast'



export const Routes = () => {
    return (
        <section className="container">
            <Alert />
            <Toast />
            <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                <PrivateRoute exact path="/add-experience" component={AddExperience} />
                <PrivateRoute exact path="/add-education" component={AddEducation} />
                <PrivateRoute exact path="/posts" component={Posts} />
                <PrivateRoute exact path="/posts/:id" component={Post} />
                <PrivateRoute exact path="/edit-post/:id" component={EditPost} />
                <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/profile/:id" component={Profile} />
                <Route component={NotFound} />
            </Switch>
        </section>

    )
}
