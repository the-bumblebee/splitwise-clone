import React from "react";

function UserRow(props) {
  const { user } = props;
  return (
    <div className="w-25 m-1 border border-secondary">
      <input
        className="m-2"
        type="checkbox"
        checked={user.isChecked}
        onChange={(e) =>
          props.handleCheckboxChange(e.target.checked, props.userId)
        }
      />
      <span className="m-2">{user.name}</span>
      <input className="m-2" type="number" disabled={!user.isChecked} />
      {user.isChecked ? (
        <span className="p-2 m1 border border-secondary">
          {parseFloat(user.amount).toFixed(2)}
        </span>
      ) : (
        ""
      )}
    </div>
  );
}

export default UserRow;
