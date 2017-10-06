import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goalRef } from '../firebase';
import { setGoals, loadGoals } from "../actions/index";
import GoalItem from './GoalItem';
import { browserHistory } from 'react-router';
class GoalList extends Component {

    componentDidMount(){
        fetch("http://localhost:3001/goals.json", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('access_token')
            },
            mode: 'cors',
            cache: 'default',
            body: undefined
        }).catch((error) => {
            console.log("Fail zone", error);
        }).then((res) => {
            if (res.ok) {
                res.json().then((json) => {
                    console.log('goals', json);
                    this.props.loadGoals(json);
                });
                console.log('res', res);

            } else {
                console.log("error", res);
                browserHistory.replace('/signin');
            }
        });
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        <div className="panel panel-default panel-table">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col col-xs-6">
                                        <h3 className="panel-title">Goals</h3>
                                    </div>
                                    <div className="col col-xs-6 text-right">
                                        <div className="pull-right">
                                            <div className="btn-group" data-toggle="buttons">
                                                <label className="btn btn-success btn-filter active" data-target="completed">
                                                    <input type="radio" name="options" id="option1" autoComplete="off" checked />
                                                        Completed
                                                </label>
                                                <label className="btn btn-warning btn-filter" data-target="pending">
                                                    <input type="radio" name="options" id="option2" autoComplete="off" /> Pending
                                                </label>
                                                <label className="btn btn-default btn-filter" data-target="all">
                                                    <input type="radio" name="options" id="option3" autoComplete="off" /> All
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-body">
                                <table id="mytable" className="table table-striped table-bordered table-list">
                                    <thead>
                                    <tr>
                                        <th className="col-check"><input type="checkbox" id="checkall" onclick="test()"/></th>
                                        <th className="col-tools"><span className="glyphicon glyphicon-wrench" aria-hidden="true"></span>
                                        </th>
                                        <th className="col-text">Title</th>
                                        <th className="col-text">Submitted By</th>
                                    </tr>
                                    </thead>
                                    {
                                        this.props.goals.map((goal, index) => {
                                            return (
                                                <GoalItem key={index} goal={goal} user={this.props.user} />
                                            )
                                        })
                                    }
                                </table>

                            </div>
                            <div className="panel-footer">
                                <div className="row">
                                    <div className="col col-xs-offset-3 col-xs-6">
                                        <nav aria-label="Page navigation" className="text-center">
                                            <ul className="pagination">
                                                <li>
                                                    <a href="#" aria-label="Previous">
                                                        <span aria-hidden="true">«</span>
                                                    </a>
                                                </li>
                                                <li className="active"><a href="#">1</a></li>
                                                <li><a href="#">2</a></li>
                                                <li><a href="#">3</a></li>
                                                <li><a href="#">4</a></li>
                                                <li><a href="#">5</a></li>
                                                <li>
                                                    <a href="#" aria-label="Next">
                                                        <span aria-hidden="true">»</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                    <div className="col col-xs-3">
                                        <div className="pull-right">
                                            <button type="button" className="btn btn-primary">
                                    <span className="glyphicon glyphicon-plus"
                                          aria-hidden="true"></span>
                                                Add row
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <p className="navbar-text">
                                Copy Rights 2017
                            </p>
                            <i className="fa fa-copyright" aria-hidden="true"></i>
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { goals } = state;
    const { user } = state;
    const { email } = user;
    return {
        user,
        email,
        goals
    }
}

export default connect(mapStateToProps, { setGoals, loadGoals })(GoalList);
