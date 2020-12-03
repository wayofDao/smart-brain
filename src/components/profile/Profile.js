import React from 'react';
import './Profile.css'

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      age: this.props.user.age,
      pet: this.props.user.pet,
    }
  }

  onFormChange = (event) => {
    switch (event.target.name) {
      case 'user-name':
        this.setState({ name: event.target.value })
        break;
      case 'user-age':
        this.setState({ age: event.target.value })
        break;
      case 'user-pet':
        this.setState({ pet: event.target.value })
        break;
      default:
        return;
    }
  }

  onProfileUpdate = (data) => {
    fetch(`http://localhost:3000/profile/${this.props.user.id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('token')
      },
      body: JSON.stringify({ formInput: data })
    }).then(resp => {
      if (resp.status === 200 || resp.status === 304) {
        this.props.toggleModal();
        this.props.loadUser({ ...this.props.user, ...data })
      }
    }).catch(err => console.error('problem updating profile', err));
  }


  render() {
    const { user, toggleModal } = this.props;
    return (
      <div className='profile__wrapper'>
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
          <main className="pa4 black-80 w-80">
            <img
              src="http://tachyons.io/img/logo.jpg"
              className="h3 w3 dib" alt="avatar" />
            <h1>{this.state.name}</h1>
            <h4>Images submitter: {user.entries}</h4>
            <p>Member since: {new Date(user.joined).toLocaleDateString()}</p>
            <hr />
            <label className="mt2 fw6" htmlFor="user-name">Name</label>
            <input
              placeholder={user.name}
              className="pa2 ba w-100"
              type="text"
              name="user-name"
              id="user-name"
              onChange={(e) => this.onFormChange(e)}
            />
            <label className="mt2 fw6" htmlFor="user-age">Age</label>
            <input
              placeholder='22'
              className="pa2 ba w-100"
              type="text"
              name="user-age"
              id="user-age"
            />
            <label className="mt2 fw6" htmlFor="user-pet">Pet</label>
            <input
              placeholder='ninja snail'
              className="pa2 ba w-100"
              type="text"
              name="user-pet"
              id="user-pet"
            />

            <div className='mt4' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <button className="w-40 bg-info" onClick={() => this.onProfileUpdate({ ...this.state })}>save</button>
              <button className="w-40 bg-danger" onClick={toggleModal}>cancel</button>
            </div>
          </main>
          <div className="modal-close" onClick={toggleModal}>&times;</div>
        </article>
      </div>
    )
  }
}
export default Profile;