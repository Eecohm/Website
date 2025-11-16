import React from "react";
import TeamLeadCard from "./TeamLeadCard";
import styles from "./MeetTheTeamLeads.module.css";

const TeamLeadsGrid = ({ teamLeads, selectedLead, handleSelectLead }) => (
  <div className={styles.teamLeadsGridContainer}>
    <div className={styles.teamLeadsGrid}>
      {teamLeads.map((lead, index) => (
        <TeamLeadCard
          key={index}
          {...lead}
          isSelected={selectedLead && lead.name === selectedLead.name}
          onSelect={() => handleSelectLead(lead)}
        />
      ))}
    </div>
  </div>
);

export default TeamLeadsGrid;
