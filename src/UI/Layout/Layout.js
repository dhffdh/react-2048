
import React, { PureComponent } from 'react'

class Layout extends PureComponent {
    render() {
        const { children } = this.props;
        return (
            <div className="game-layout">
                <div>{children}</div>
            </div>
        )
    }
}



export default Layout