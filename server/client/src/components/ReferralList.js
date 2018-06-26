import React, {Component} from 'react';
import ReactTable from 'react-table';
import {fetchReferrals} from '../actions'
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import { bindActionCreators } from 'redux';
const moment = require('moment');
const RECEIVED = 'received';
const SENT = 'sent';



class ReferralList extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount = async() => {
        await this.props.fetchReferrals(RECEIVED);
        console.log(this.props.referrals);
    }
    renderTable = () => {
        if(!this.props.referrals) {
            return (<div>Loading... </div>)
        }
        let columns = [{Header: 'Organization', accessor: 'referring_organization.organizationName'},{Header: 'Name', accessor: 'referring_user.firstName'},{Header: 'Client', accessor: 'client_name'}, {Header: 'Date', accessor: 'dateCreated', Cell: props => <span> {moment(props.value).format('MMMM Do YYYY, h:mm:ss a')} </span>}, {Header: 'Status', accessor: 'status'}]
        let data;
        if(this.props.status !== null){
            data = this.props.referrals.filter((referral) => {
                return referral.status == this.props.status;
            })
        } else {
            data = this.props.referrals;
        }
        return <ReactTable
                    getTrProps={(state, rowInfo, column) => {
                        return {
                            onClick: (e) => {
                                this.props.history.push(`/referral/${rowInfo.original._id}`)
                            }
                        }
                    }}
                    data={data}
                    columns={columns}
        />
    }

    render() {

      return this.renderTable()
    }
}

const mapStateToProps = ({referrals}) => {
    return {referrals}
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({fetchReferrals}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReferralList));
