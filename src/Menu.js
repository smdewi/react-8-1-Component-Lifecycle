import React from 'react';
import axios from 'axios';

export default class Menu extends React.Component {
    state = {
        searchMenu: "",
        menuItems: [],
    }

    async componentDidMount() {
        const menuResponse = await axios.get("menu.json");
        const menuData = menuResponse.data;

        this.setState({
            menuItems: menuData
        });
    }

    renderMenu() {
        let jsx = [];
        for (let item of this.state.menuItems) {
            if (
                this.state.searchMenu === "" ||
                item.name.toLowerCase().includes(this.state.searchMenu.toLowerCase())
            ) {
                jsx.push(
                    <div key={item._id}>
                        <h3>{item.name}</h3>
                        <p>{item.price}</p>
                    </div>
                );
            }
        }
        return jsx;
    }

    render() {
        return (
            <div className="menu-container">
                <h1>Menu</h1>

                <input 
                    type="text"
                    value={this.state.searchMenu}
                    placeholder="Enter search menu here"
                    onChange={(e) => {
                        this.setState({
                            searchMenu: e.target.value
                        });
                    }} />
                
                {this.renderMenu()}
            </div>
        );
    }
}