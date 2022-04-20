
import React, {useState, useEffect} from 'react';

export function UserForm() {
    const [contactInfo, setContactInfo] = useState({
        username: "",
        password: "",
        state: "",
      });

    return (
        <div className="form-container">
        <form>
          <div>
            <h3>Contact Form</h3>
          </div>
          <div>
            <input
              type="text"
              usernamename="username"
              placeholder="Name"
              value={contactInfo.username}
            />
          </div>
          <div>
            <input
              type="text"
              name="password"
              placeholder="password"
              value={contactInfo.password}
            />
          </div>
          <div>
            <input
              type="text"
              name="state"
              placeholder="State"
              value={contactInfo.state}
            />
          </div>
          <div>
            <button>Submit Form</button>
          </div>
        </form>
      </div>
    )
}

export default UserForm;