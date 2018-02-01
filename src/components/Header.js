import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class Header extends Component {
    render() {
        return (
            <MuiThemeProvider>
                    <AppBar
                        title='RecipeRecommender'
                        showMenuIconButton={false}
                    />
            </MuiThemeProvider>
        )
    }
}

export default Header;