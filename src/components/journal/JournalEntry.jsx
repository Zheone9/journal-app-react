import React from "react";

const JournalEntry = () => {
  return (
    <div className="journal__entry">
      <div
        className="journal__entry-picture "
        style={{
          backgroundColor: "cover",
          backgroundImage:
            "url(https://as1.ftcdn.net/v2/jpg/03/79/97/34/1000_F_379973463_gJgF0IC4RikGizVILFrF0lwXBaAxh56E.jpg)",
        }}
      ></div>
      <div className="journal__entry-body">
        <p className="journal__entry-title">Nuevo dia</p>

        <p className="journal__entry-content">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis cum
          suscipit
        </p>
      </div>
      <div className="journal__entry-date-box">
        <span>Monday</span>
        <h4>28</h4>
      </div>
    </div>
  );
};

export default JournalEntry;
