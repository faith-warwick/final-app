import React, { Component } from 'react';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';


export default class Profile extends Component {
    componentWillMount() {
        this.setState({profile: {}});
        const {userProfile, getProfile} = this.props.auth;
        if (!userProfile) {
            getProfile((err, profile) => {
                this.setState({profile});
            });
        } else {
            this.setState({profile: userProfile});
        }
    }
    render() {
        const { profile } = this.state;
        return (
            <div className="container">
                <div className="profile-area">
                    <h1>Hello,</h1>
                    <h1>{profile.name}</h1>
                    <Panel header="Profile">
                        <img src={profile.picture} alt="profilepic" />
                        <div>
                            <ControlLabel><Glyphicon glyph="user" /> Nickname</ControlLabel>
                            <h3>{profile.name}</h3>
                        </div>
                        <pre>{JSON.stringify(profile, null, 2)}</pre>
                    </Panel>
                </div>
            </div>
        );
    }
};