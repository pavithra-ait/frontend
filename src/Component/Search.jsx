import React, { Component } from 'react';
import axios from 'axios';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            search: '',  // Add search term state
            view: [],    // Store fetched products
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.search !== this.state.search) {
            this.fetchProducts();
        }
    }

    // Fetch products based on the search term
    fetchProducts = async () => {
        const search = this.state.search
        this.setState({ loading: true });
        try {
            const response = await axios.get('http://localhost:5000/product', {
                params: { title: search },
            });
            this.setState({ view: response.data });
        } catch (err) {
            console.error('Error fetching products:', err);
        }
        this.setState({ loading: false });
    };


    handleSearchChange = (event) => {
        this.setState({ search: event.target.value });
    };

    render() {
        const { loading, view, search } = this.state;

        return (
            <div>
                <input
                    type="text"
                    value={search}
                    onChange={this.handleSearchChange}
                    placeholder="Search products..."
                />
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ul>
                        {view.map((product) => {
                            return (
                                <ol key={product.id}>
                                    <li >{product.Product_Title}</li>
                                    <li >{product.Product_Price}</li>
                                </ol>
                            )
                        }


                        )}
                    </ul>
                )}
            </div>
        );
    }
}

export default Search;
