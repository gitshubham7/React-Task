import React, { Component } from 'react';

export default class Table extends Component {
    state = {
        isLoading: true,
        users: [],
        error: null,
        page: 1,

    };

    fetchUsers() {
        fetch(`https://reqres.in/api/users?page=${this.state.page}`)
            .then(response => response.json())
            .then(data =>
                this.setState({
                    users: data.data,
                    totals: data.total,
                    isLoading: false,
                })
            )
            .catch(error => this.setState({ error, isLoading: false }));
    }

    componentDidMount() {
        this.fetchUsers();
    }

    handleNext = async () => {
        fetch(`https://reqres.in/api/users?page=${this.state.page + 1}`)
            .then(response => response.json())
            .then(data =>
                this.setState({
                    users: data.data,
                    isLoading: false,
                    page: this.state.page + 1
                })
            )
            .catch(error => this.setState({ error, isLoading: false }));

    }

    handlePrevious = async () => {
        fetch(`https://reqres.in/api/users?page=${this.state.page - 1}`)
            .then(response => response.json())
            .then(data =>
                this.setState({
                    users: data.data,
                    isLoading: false,
                    page: this.state.page - 1
                })
            )
            .catch(error => this.setState({ error, isLoading: false }));

    }

    render() {
        const { isLoading, error } = this.state;
        return (
            <React.Fragment>

                <h1 className='my-3' >Click on next button to View more data</h1>
                <table className="table">
                    <thead className="table-primary">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Avatar</th>

                        </tr>
                    </thead>
                    <tbody>


                        {!isLoading ? (
                            this.state.users.map(user => {
                                const { id, first_name, email, last_name, avatar } = user;
                                return (
                                    <tr key={id}>
                                        <th scope="row">{id}</th>
                                        <td>{first_name}</td>
                                        <td> {last_name}</td>
                                        <td >{email}</td>
                                        <td> <img src={avatar} alt="" border='3' height={80} width={175}></img></td>
                                    </tr>
                                );
                            }
                            )
                        ) : (
                            <tr>
                                <td>Loading...</td>
                            </tr>

                        )}



                    </tbody>
                </table>

                {error ? <p>{error.message}</p> : null}

                <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlePrevious}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > 2} type="button" className="btn btn-primary" onClick={this.handleNext}>Next &rarr;</button>

                </div>

            </React.Fragment>
        );
    }
}
