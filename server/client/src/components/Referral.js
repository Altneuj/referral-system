import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchReferrals, submitNote, fetchDetail, emptyDetails} from '../actions'
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import PendingDetails from './PendingDetails';
import AcceptedDetails from './AcceptedDetails';
const moment = require('moment');

class Referral extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentWillMount = () => {
   this.props.fetchDetail(this.props.match.params.referralId)
    .then(()=>{

      switch(this.props.referralDetail.status){
        case 'accepted':
          this.setState({
            accepted: 'complete',
            contacted: 'active',
            completed: '',
          })
          break;
        case 'contacted':
          this.setState({
            accepted: 'complete',
            contacted: 'complete',
            completed: 'active',
          })
          break;
        case 'completed':
          this.setState({
            accepted: 'complete',
            contacted: 'complete',
            completed: 'complete',
          })
          break;
        default:
        this.setState({
          accepted: '',
          contacted: '',
          completed: '',
        })
      }
    })

  }

  componentWillUnmount(){
    this.props.emptyDetails()
  }

  handleState = (prop, value) =>{
    this.setState({[prop]:value})
  }


  renderStatus(referral){
    if(referral.status != 'pending' && referral.status != 'rejected'){

      return(
        <div className="grid-1-1 center-text">
          <div className="progress-container center-text">
            <ul className="progressbar">
                <li className="complete">Accepted</li>
                <li className={this.state.contacted}>Contacted</li>
                <li className={this.state.completed}>Completed</li>
            </ul>
          </div>
        </div>
      )
    }

  }

  render() {

    console.log(this.props)

    if(!this.props.referralDetail) {
      return (
      <div onClick={() => {this.props.history.push('/dashboard')}}> Loading...</div>
      )
    } else {
    let referral = this.props.referralDetail;

    return (
      <div>
        <div className="wrapper">

          <div className="back-button">
            <a onClick={() => {this.props.history.push('/dashboard')}}>Back</a>
          </div>

          {this.renderStatus(referral)}

          <PendingDetails status={this.state.accepted} referral={referral} handleState = {this.handleState}/>

          <AcceptedDetails status={this.state.accepted} referral={referral} handleState = {this.handleState}/>

        </div>



        <div className="referral-header">

        </div>


        <div className="referral-details">

          <div className="referral-notes">
            <h2>tasks</h2>
            <div className="referral-notes-content">
            {referral.tasks.map((note) => {
              return (
                <div>
              <div> {note.text} <span className='text-muted'> posted by: {note.posting_user} at {moment(note.date).format("LLLL")}</span> </div>
                <hr/>
                </div>
                )

            })}</div>
            <div className="referral-notes-input"><input onChange={(event) => {this.setState({text: event.target.value})}}/></div>
            <div className="referral-notes-save"><button onClick={() => {this.props.submitNote(referral._id, this.state)}}>Save</button></div>

          </div>

        </div>


      </div>
    )}
  }
}



function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchReferrals, submitNote, fetchDetail, emptyDetails}, dispatch);
}
function mapStateToProps({referrals, referralDetail, auth, myOrg, allOrgs}) {
  return {referrals, referralDetail, auth, myOrg, allOrgs}
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Referral));
